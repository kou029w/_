```sh
echo info >&2
```

```js
import { say } from "npm:cowsay";

console.log(say({ text: "hello world" }));
```

```
$ deno -A npm:zx README.md
info
 _____________
< hello world >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
