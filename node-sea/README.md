# Node.js Single Executable Application

```
$ node --experimental-sea-config sea-config.json
$ cp "$(which node)" hello
$ npx postject hello NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
$ ./hello
Hello, undefined!
(node:83987) ExperimentalWarning: Single executable application is an experimental feature and might change at any time
(Use `hello --trace-warnings ...` to show where the warning was created)
```

https://nodejs.org/api/single-executable-applications.html#single-executable-applications

## Environment

```
$ npx envinfo --system --binaries

  System:
    OS: Linux 6.8 Ubuntu 24.04.3 LTS 24.04.3 LTS (Noble Numbat)
    CPU: (12) x64 13th Gen Intel(R) Core(TM) i7-1365U
    Memory: 22.30 GB / 31.00 GB
    Container: Yes
    Shell: 5.2.21 - /bin/bash
  Binaries:
    Node: 24.11.1 - /usr/bin/node
    Yarn: 1.22.22 - ~/.local/bin/yarn
    npm: 11.0.0 - ~/.local/bin/npm
```
