```
alias kamal='docker run -it --rm -v "${PWD}:/workdir" -v "${SSH_AUTH_SOCK}:/ssh-agent" -v /var/run/docker.sock:/var/run/docker.sock -e "SSH_AUTH_SOCK=/ssh-agent" ghcr.io/basecamp/kamal:latest'
```

```.env
KAMAL_REGISTRY_PASSWORD=*
```

```
$ kamal setup
```

```
ubuntu@gamma:~$ mkdir -p .kamal/env/roles
ubuntu@gamma:~$ touch .kamal/env/roles/web-web.env
ubuntu@gamma:~$ chmod 600 .kamal/env/roles/web-web.env
```

- Docker レジストリどうするか => Docker Hub などパブリックなものを使用するのが簡単
