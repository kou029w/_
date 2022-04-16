## 何をしたかったか

[lukeed/tsm](https://github.com/lukeed/tsm) と [antfu/esno](https://github.com/antfu/esno) の比較

環境:

- Node v17.9.0
- GitHub Codespaces 4-core/8GB RAM/32GB

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

```ts
// dummy
import "typescript";
const message: string = "hello world";
console.log(message);
```

```sh
time npx --call 'bash -c "for i in {1..10}; do ./hello-world.tsm.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do ./hello-world.esno.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do ./hello-world.esmo.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do node -r tsm hello-world.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do node --loader tsm hello-world.ts > /dev/null 2>&1; done"'
time npx --call 'bash -c "for i in {1..10}; do node -r esbuild-register hello-world.ts > /dev/null 2>&1; done"'
```

## 結果

サイズ: esno のほうが、依存関係が多いのでややサイズ大きいが esbuild 本体に比べれば誤差程度

パフォーマンス: tsm のほうがパフォーマンス高い

```console
$ time npx --call 'bash -c "for i in {1..10}; do ./hello-world.tsm.ts > /dev/null 2>&1; done"'

real    0m4.848s
user    0m4.608s
sys     0m0.695s

$ time npx --call 'bash -c "for i in {1..10}; do ./hello-world.esno.ts > /dev/null 2>&1; done"'

real    0m5.261s
user    0m4.765s
sys     0m0.856s

$ time npx --call 'bash -c "for i in {1..10}; do ./hello-world.esmo.ts > /dev/null 2>&1; done"'

real    0m6.468s
user    0m6.321s
sys     0m0.964s

$ time npx --call 'bash -c "for i in {1..10}; do node -r tsm hello-world.ts > /dev/null 2>&1; done"'

real    0m3.804s
user    0m3.430s
sys     0m0.513s

$ time npx --call 'bash -c "for i in {1..10}; do node --loader tsm hello-world.ts > /dev/null 2>&1; done"'

real    0m4.162s
user    0m3.971s
sys     0m0.683s

$ time npx --call 'bash -c "for i in {1..10}; do node -r esbuild-register hello-world.ts > /dev/null 2>&1; done"'

real    0m4.422s
user    0m4.113s
sys     0m0.694s
```

## 感想

ここまで見た範囲では tsm 優位か
