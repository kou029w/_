#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "streamlit",
# ]
# ///
import glob
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import streamlit as st

if os.environ.get("_IMAGE_WRITER_BOOTSTRAPPED") != "1":
    # streamlit アプリは `streamlit run` 経由でないと UI が起動しないため、
    # `./image-writer.py` / `uv run --script` から直接叩かれた場合は
    # streamlit CLI 経由で自分自身を再起動する。
    env = {**os.environ, "_IMAGE_WRITER_BOOTSTRAPPED": "1"}
    extra_args = list(sys.argv[1:])
    # デフォルトの 0.0.0.0 バインドだと同一ネットワーク上の任意のホストから
    # アクセスできてしまうため、明示指定がなければ localhost に限定する
    # （実行時のカレントディレクトリに依存しないよう .streamlit/config.toml と二重に指定）。
    if not any(a.startswith("--server.address") for a in extra_args):
        extra_args = ["--server.address=localhost", *extra_args]
    raise SystemExit(
        subprocess.run(
            [sys.executable, "-m", "streamlit", "run", os.path.abspath(__file__), *extra_args],
            env=env,
        ).returncode
    )

st.title("イメージ書き込みツール（bmap生成・並列・チェックサム付）")
st.warning(
    "⚠️ チェックを入れたブロックデバイスが完全に上書きされます。慎重に実行してください。"
)

image_files = sorted(glob.glob(f"{os.environ['HOME']}/Downloads/*.img"))
if not image_files:
    st.error("~/Downloads にイメージファイル（*.img）が見つかりません。")
    st.stop()
image_path = st.selectbox("使用するイメージを選択", image_files)
bmap_path = image_path.replace(".img", ".bmap")

# streamlit はウィジェット操作のたびにスクリプト全体を再実行するため、
# 変更のないイメージに対して毎回 bmap を再生成すると（フルスキャン＋
# チェックサム計算）非常に重い。既存の bmap がイメージより新しければ再利用する。
if os.path.exists(bmap_path) and os.path.getmtime(bmap_path) >= os.path.getmtime(image_path):
    st.info(f"既存の bmap を再利用します: {os.path.basename(bmap_path)}")
else:
    try:
        subprocess.run(
            ["bmaptool", "create", "-o", bmap_path, image_path],
            check=True,
            capture_output=True,
            text=True,
        )
        st.success(f"bmap生成完了: {os.path.basename(bmap_path)}")
    except subprocess.CalledProcessError as e:
        st.error(f"bmap生成失敗:\n{e.stderr}")
        st.stop()


def human_size(num_bytes: int) -> str:
    size = float(num_bytes)
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if size < 1024 or unit == "TB":
            return f"{size:.1f}{unit}"
        size /= 1024
    return f"{size:.1f}TB"


def device_info(dev: str) -> dict:
    sys_block = Path("/sys/block") / os.path.basename(dev)

    def read(path):
        try:
            return path.read_text().strip()
        except OSError:
            return ""

    sectors = read(sys_block / "size")
    return {
        "removable": read(sys_block / "removable") == "1",
        "size_bytes": int(sectors) * 512 if sectors.isdigit() else 0,
        "vendor": read(sys_block / "device" / "vendor"),
        "model": read(sys_block / "device" / "model"),
    }


devices = sorted(glob.glob("/dev/sd?"))
if not devices:
    st.error("書き込み対象のデバイスが見つかりません。")
    st.stop()

st.subheader("書き込み対象デバイスの選択")
st.caption("書き込みたいデバイスだけにチェックを入れてください（デフォルトは全て未選択）。")

selected = []
for d in devices:
    info = device_info(d)
    label = f"**{os.path.basename(d)}** — {human_size(info['size_bytes'])}"
    detail = " ".join(p for p in (info["vendor"], info["model"]) if p)
    if detail:
        label += f"（{detail}）"
    label += "  ✅リムーバブル" if info["removable"] else "  ⚠️非リムーバブル（書き込み時に拒否されます）"
    if st.checkbox(label, value=False, key=f"select_{d}"):
        selected.append(d)


def _run(cmd):
    try:
        res = subprocess.run(cmd, capture_output=True, text=True)
        return res.returncode == 0, (res.stderr or res.stdout).strip()
    except FileNotFoundError:
        return False, f"{cmd[0]}: コマンドが見つかりません"


def _partitions(dev: str) -> list:
    name = os.path.basename(dev)
    sys_block = Path("/sys/block") / name
    if not sys_block.is_dir():
        return []
    return sorted(
        f"/dev/{p.name}" for p in sys_block.iterdir() if (p / "partition").exists()
    )


def unmount_all(dev: str):
    # デスクトップ環境（udisks2 等）が USB 挿入時に自動でパーティションを
    # マウントするため、マウントしたまま書き込むと bmaptool が
    # "Device or resource busy" で失敗する。書き込み前に必ず外す。
    try:
        mounted = {line.split()[0] for line in Path("/proc/mounts").read_text().splitlines()}
    except OSError:
        mounted = set()

    failures = []
    for target in [dev, *_partitions(dev)]:
        if target not in mounted:
            continue
        ok, msg = _run(["udisksctl", "unmount", "-b", target])
        if not ok:
            ok, msg = _run(["sudo", "-n", "umount", target])
        if not ok:
            failures.append(f"{target}: アンマウント失敗 ({msg})")
    return failures


def burn(dev):
    unmount_failures = unmount_all(dev)
    if unmount_failures:
        return dev, False, "書き込み前のアンマウントに失敗しました:\n" + "\n".join(unmount_failures)
    try:
        # --no-verify を渡していないため、bmaptool はコピー中に常にチェックサムを
        # 検証する。検証に失敗すると bmaptool 自体が例外を投げて非0終了するため、
        # ここで例外が出ずに成功した時点で「検証済み」が保証される
        # （出力文字列を探す必要はない）。
        res = subprocess.run(
            # --removable-device: 実書き込み時にもリムーバブルデバイスかどうかを
            # カーネルの申告に基づき bmaptool 側で再検証させる（多層防御の二枚目）。
            # sudo -n: パスワード入力待ちで無音のままハングするのを避け、
            # 非対話 sudo が未設定なら即座に失敗させる。
            ["sudo", "-n", "bmaptool", "copy", "--removable-device", image_path, dev],
            capture_output=True,
            text=True,
            check=True,
        )
        return dev, True, res.stdout
    except subprocess.CalledProcessError as e:
        return dev, False, e.stderr


if not selected:
    st.info("書き込み対象のデバイスを選択してください。")
elif st.checkbox("⚠️ 危険性を理解し、選択したデバイスへの書き込みに同意します"):
    if st.button("書き込み開始"):
        with st.status("書き込み中...", expanded=True) as status:
            with ThreadPoolExecutor(max_workers=len(selected)) as ex:
                futures = {ex.submit(burn, d): d for d in selected}
                for f in as_completed(futures):
                    dev, ok, msg = f.result()
                    if ok:
                        st.success(f"{dev}: OK（チェックサム検証済）")
                    else:
                        st.error(f"{dev}: 書き込み失敗\n{msg}")
            status.update(label="完了", state="complete")
