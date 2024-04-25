# bolt

## インストール

Step 1
: Slack アプリの作成

[Create New Slack App](https://api.slack.com/apps?new_app=1) → [Select a workspace] → [Create]

- ボットユーザーを有効化
- `app_mentions:read` `chat:write` スコープ必須

→ [Install to Workspace]

Step 2
: Deno Deploy

- `SLACK_BOT_TOKEN` ... [Slack Applications](https://api.slack.com/apps) → 作成した Slack アプリ → Permissions ページにある `xoxb-` から始まるボットトークン
- `SLACK_SIGNING_SECRET` ... [Slack Applications](https://api.slack.com/apps) → 作成した Slack アプリ → Basic Information ページにある Signing Secret
