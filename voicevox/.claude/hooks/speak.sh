#!/usr/bin/env bash
# Stop フック: 回答を Haiku で読み上げ用の短い文に直して、VOICEVOX で再生するのだ
api=http://127.0.0.1:50021

jq -r .last_assistant_message |
  claude -p --model haiku --setting-sources "" --strict-mcp-config --tools "" --no-session-persistence \
    --system-prompt "渡された文を音声で読み上げる文に直してください。コード・URL・記号は除き、120字を超えるなら2〜3文に要約します。語尾は「のだ」にします。本文だけを出力してください。" |
  curl -sf -X POST -G --data-urlencode text@- "$api/audio_query?speaker=1" |
  jq '.speedScale = 1.25' |
  curl -sf -X POST -H 'Content-Type: application/json' --data-binary @- "$api/synthesis?speaker=1" |
  aplay -q
