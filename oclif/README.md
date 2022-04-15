# Hello World CLI

oclif example Hello World CLI

- [Usage](#usage)
- [Commands](#commands)

<!-- prettier-ignore-start -->
# Usage

<!-- usage -->
```sh-session
$ npm install -g @kou029w/hello-world
$ hello-world COMMAND
running command...
$ hello-world (--version)
@kou029w/hello-world/0.0.0 linux-x64 node-v16.14.2
$ hello-world --help [COMMAND]
USAGE
  $ hello-world COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`hello-world hello PERSON`](#hello-world-hello-person)
* [`hello-world hello:world`](#hello-world-helloworld)
* [`hello-world help [COMMAND]`](#hello-world-help-command)

## `hello-world hello PERSON`

Say hello

```
USAGE
  $ hello-world hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

## `hello-world hello:world`

Say hello world

```
USAGE
  $ hello-world hello:world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `hello-world help [COMMAND]`

Display help for hello-world.

```
USAGE
  $ hello-world help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for hello-world.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_
<!-- commandsstop -->
<!-- prettier-ignore-end -->
