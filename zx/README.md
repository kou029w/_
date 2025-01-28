```sh
echo info >&2
```

```js
import { say } from "cowsay";

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
