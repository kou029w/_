## 何をしたかったか

Fastify と @fastify/autoload を使って Vercel にデプロイできるかどうかチェック。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkou029w%2F_%2Ftree%2Fmaster%2Fvercel-fastify)

## 結果

とりあえず OK

## ネタ

- `api/_routes` に配置することで `api/**/*` includeFiles 不要
- top-level await NG
  - await する処理は必ず handler 内に完結させる必要ある
- `api/[...].ts` で `api/foo/bar` にもルーティングしてほしいのだが、うまく機能しないようだ
  - vercel.json 参照
