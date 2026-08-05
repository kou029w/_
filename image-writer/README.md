# Image Writer

`~/Downloads/*.img` から選択したディスクイメージを、`bmaptool` を使って
リムーバブルブロックデバイスへ並列・検証付きで書き込む Streamlit アプリ。

## Files

- `image-writer.py` - Main image processing script（uv の inline script metadata で `streamlit` 依存を同梱）

## Usage

```sh
./image-writer.py
```

## Requires

- uv
- bmaptool（対象デバイスへの書き込みに `sudo` が必要。パスワードなしで実行できる sudo 設定を推奨。未設定の場合は書き込み時に即座にエラー表示されます）

## 安全に関する注意

- `sda` を含め検出した全デバイスをチェックボックスで個別選択する方式です（オプトイン）。デフォルトでは何も選択されておらず、書き込み対象は明示的に選んだデバイスのみになります
- 実際の書き込み時にも `bmaptool copy --removable-device` によりリムーバブルデバイスであることを再検証します（UI側の判定に加えた多層防御）
- 書き込み後は `bmaptool` のチェックサム検証結果を必ず表示します（検証をスキップするオプションは使用していません）
- 書き込み前に対象デバイス本体および全パーティションを自動アンマウントします（`udisksctl unmount`、失敗時は `sudo umount` にフォールバック）。デスクトップ環境が USB 挿入時に自動マウントしていると `bmaptool` が "Device or resource busy" で失敗するため
- Streamlit サーバーは `localhost` のみに bind します（`.streamlit/config.toml` と起動時の `--server.address` で二重に指定）。デフォルトの `0.0.0.0` バインドのまま公開すると、同一ネットワーク上の任意のホストからこの書き込みツールにアクセスできてしまうため
