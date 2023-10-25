# Node.js Single Executable Application

```
$ node --experimental-sea-config sea-config.json
$ cp "$(which node)" hello
$ npx postject hello NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
$ ./hello
Hello, undefined!
(node:918684) ExperimentalWarning: Single executable application is an experimental feature and might change at any time
(Use `hello --trace-warnings ...` to show where the warning was created)
```

## Environment

```
$ npx envinfo --system --binaries

  System:
    OS: Linux 6.2 Ubuntu 22.04.3 LTS 22.04.3 LTS (Jammy Jellyfish)
    CPU: (12) x64 13th Gen Intel(R) Core(TM) i7-1365U
    Memory: 19.25 GB / 31.00 GB
    Container: Yes
    Shell: 5.1.16 - /bin/bash
  Binaries:
    Node: 20.5.1 - /usr/bin/node
    Yarn: 1.22.19 - ~/.local/bin/yarn
    npm: 9.8.0 - /usr/bin/npm
    pnpm: 8.6.2 - ~/.local/bin/pnpm
```
