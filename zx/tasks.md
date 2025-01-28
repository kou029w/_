## 実行方法

```
$ deno -A npm:zx tasks.md [task]
: or
$ npm i -g zx
$ zx tasks.md [task]
```

```js
const task = {
  build,
  test,
  cowsay,
}[argv._[0]];

await (task ?? help)();
```

## `build`

ビルド

```js
async function build() {
  console.log("building...");
}
```

## `test`

テスト

```js
async function test() {
  console.log("testing...");
}
```

## `cowsay`

```js
import { say } from "cowsay";

async function cowsay() {
  console.log(say({ text: argv._[1] ?? "Hello, World!" }));
}
```

## `help`

このテキストの表示

```js
async function help() {
  await $`cat ${__filename} >&2`;
}
```
