## 何をしたかったか

Fastify と fastify-autoload を使って Vercel にデプロイできるかどうかチェック。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkou029w%2F_%2Ftree%2Fmaster%2Fvercel-fastify)

## 結果

cjs かつ includeFiles に含めればとりあえず OK。
全部含めるなら `**` でよい。

```json
{
  "functions": { "api/index.js": { "includeFiles": "**" } }
}
```

TypeScript の場合は、`vercel-build` にビルドコマンドを指定する & ビルド後に生成されるファイルを指定する。(vercel.json を参照)
そういった設定をせず Vercel に任せると `vercel dev` では問題ないが、デプロイすると参照に失敗して 500 エラー。
