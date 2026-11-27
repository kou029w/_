# VOICEVOX

VOICEVOX Engine を Docker Compose で動かし、Claude Code の回答をずんだもんの声で読み上げる設定です。

## ファイル

- `compose.yml` - VOICEVOX Engine（`127.0.0.1:50021`）
- `AGENTS.md` - キャラクター設定
- `.claude/settings.json` / `.claude/hooks/speak.sh` - Stop フックで回答を読み上げる。`claude -p --model haiku` で読み上げ用の短い文に直してから再生する

## 使い方

```bash
docker compose up -d
```

必要なコマンド: `jq`、`curl`、`aplay`（Linux）、`claude`
