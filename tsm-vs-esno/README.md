## 何をしたかったか

[lukeed/tsm](https://github.com/lukeed/tsm) と [antfu/esno](https://github.com/antfu/esno) の比較

環境: node v17.9.0

サンプルコード:

```ts
#!/usr/bin/env tsm
// dummy
import "typescript";
const message: string = "hello world";
console.log(message);
```

```ts
#!/usr/bin/env esno
// dummy
import "typescript";
const message: string = "hello world";
console.log(message);
```

```ts
#!/usr/bin/env esmo
// dummy
import "typescript";
const message: string = "hello world";
console.log(message);
```

```sh
time npx --call 'bash -c "for i in {1..10}; do ./hello-world.tsm.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do ./hello-world.esno.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do ./hello-world.esmo.ts > /dev/null 2>&1; done"'
```

## 結果

サイズ: esno のほうが依存関係が多いので若干大きいが esbuild 本体に比べれば誤差程度

パフォーマンス:
