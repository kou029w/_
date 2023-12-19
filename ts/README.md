# TypeScript で書いたサーバーをワンライナーで構築してみよう

tsx

```
npx tsx main.ts
```

tsx + watch

```
npx tsx --watch main.ts
```

esbuild (esbuild-register)

```
node -r esbuild-register main.ts
```

esbuild (esbuild-register) + watch

```
node -r esbuild-register --watch main.ts
```

tsup

```
npx tsup main.ts --clean --onSuccess 'node dist/main.js'
```

tsup + watch

```
npx tsup main.ts --clean --watch --onSuccess 'node dist/main.js'
```
