# TypeScript で書いたサーバーをワンライナーで構築してみよう

tsup

```
npx tsup main.ts --clean --onSuccess 'node dist/main.js'
```

tsup + watch

```
npx tsup main.ts --clean --watch --onSuccess 'node dist/main.js'
```

ts-node

```
npx ts-node-transpile-only main.ts
```

ts-node + watch

n/a

esbuild (esbuild-register)

```
node -r esbuild-register main.ts
```

esbuild (esbuild-register) + watch

n/a
