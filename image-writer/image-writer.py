import glob
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed

import streamlit as st

st.title("イメージ書き込みツール（bmap生成・並列・チェックサム付）")
st.warning(
    "⚠️ 全ての対象ブロックデバイスが完全に上書きされます。慎重に実行してください。"
)

image_files = glob.glob(f"{os.environ['HOME']}/Downloads/*.img")
image_path = st.selectbox("使用するイメージを選択", image_files)
bmap_path = image_path.replace(".img", ".bmap")

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

devices = [d for d in glob.glob("/dev/sd?") if os.path.basename(d) != "sda"]
if not devices:
    st.error("書き込み対象のデバイスが見つかりません。")
    st.stop()
st.write(f"検出デバイス: {devices}")


def burn(dev):
    try:
        res = subprocess.run(
            ["sudo", "bmaptool", "copy", image_path, dev],
            capture_output=True,
            text=True,
            check=True,
        )
        verified = "Checksum verified" in res.stdout
        return dev, True, verified, res.stdout
    except subprocess.CalledProcessError as e:
        return dev, False, False, e.stderr


if st.checkbox("⚠️ 危険性を理解し、すべてのデバイスに書き込むことに同意します"):
    if st.button("書き込み開始"):
        with st.status("書き込み中...", expanded=True) as status:
            with ThreadPoolExecutor() as ex:
                futures = {ex.submit(burn, d): d for d in devices}
                for f in as_completed(futures):
                    dev, ok, verified, msg = f.result()
                    if ok:
                        if verified:
                            st.success(f"{dev}: OK（チェックサム検証済）")
                        else:
                            st.warning(f"{dev}: 書き込み成功（検証出力なし）")
                    else:
                        st.error(f"{dev}: 書き込み失敗\n{msg}")
            status.update(label="完了", state="complete")
