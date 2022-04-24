package app

import (
	"dagger.io/dagger"
	"dagger.io/dagger/core"
)

dagger.#Plan & {
	client: {
		filesystem: {
			".": read: contents: dagger.#FS
		}
	}
	actions: {
		docker: core.#Dockerfile & {
			source: client.filesystem.".".read.contents
		}
		hello: core.#Exec & {
			input: docker.output
			args: ["echo", "Hello, World!"]
			always: true
		}
	}
}
