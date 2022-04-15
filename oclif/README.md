oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hello-world
$ hello-world COMMAND
running command...
$ hello-world (--version)
hello-world/0.0.0 linux-x64 node-v16.14.2
$ hello-world --help [COMMAND]
USAGE
  $ hello-world COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hello-world hello PERSON`](#hello-world-hello-person)
* [`hello-world hello world`](#hello-world-hello-world)
* [`hello-world help [COMMAND]`](#hello-world-help-command)
* [`hello-world plugins`](#hello-world-plugins)
* [`hello-world plugins:install PLUGIN...`](#hello-world-pluginsinstall-plugin)
* [`hello-world plugins:inspect PLUGIN...`](#hello-world-pluginsinspect-plugin)
* [`hello-world plugins:install PLUGIN...`](#hello-world-pluginsinstall-plugin-1)
* [`hello-world plugins:link PLUGIN`](#hello-world-pluginslink-plugin)
* [`hello-world plugins:uninstall PLUGIN...`](#hello-world-pluginsuninstall-plugin)
* [`hello-world plugins:uninstall PLUGIN...`](#hello-world-pluginsuninstall-plugin-1)
* [`hello-world plugins:uninstall PLUGIN...`](#hello-world-pluginsuninstall-plugin-2)
* [`hello-world plugins update`](#hello-world-plugins-update)

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

_See code: [dist/commands/hello/index.ts](https://github.com/kou029w/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `hello-world hello world`

Say hello world

```
USAGE
  $ hello-world hello world

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `hello-world plugins`

List installed plugins.

```
USAGE
  $ hello-world plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ hello-world plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `hello-world plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hello-world plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ hello-world plugins add

EXAMPLES
  $ hello-world plugins:install myplugin 

  $ hello-world plugins:install https://github.com/someuser/someplugin

  $ hello-world plugins:install someuser/someplugin
```

## `hello-world plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ hello-world plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ hello-world plugins:inspect myplugin
```

## `hello-world plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ hello-world plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ hello-world plugins add

EXAMPLES
  $ hello-world plugins:install myplugin 

  $ hello-world plugins:install https://github.com/someuser/someplugin

  $ hello-world plugins:install someuser/someplugin
```

## `hello-world plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ hello-world plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ hello-world plugins:link myplugin
```

## `hello-world plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hello-world plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hello-world plugins unlink
  $ hello-world plugins remove
```

## `hello-world plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hello-world plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hello-world plugins unlink
  $ hello-world plugins remove
```

## `hello-world plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ hello-world plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ hello-world plugins unlink
  $ hello-world plugins remove
```

## `hello-world plugins update`

Update installed plugins.

```
USAGE
  $ hello-world plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
