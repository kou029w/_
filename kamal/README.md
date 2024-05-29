```
alias kamal='docker run -it --rm -v "${PWD}:/workdir" -v "${SSH_AUTH_SOCK}:/ssh-agent" -v /var/run/docker.sock:/var/run/docker.sock -e "SSH_AUTH_SOCK=/ssh-agent" ghcr.io/basecamp/kamal:latest'
```

```.env
KAMAL_REGISTRY_PASSWORD=*
```

```
$ docker context create --docker=host=ssh://ubuntu@gamma.fogtype.com gamma
$ docker context use gamma
$ docker run --rm -d -p 127.0.0.1:5000:5000 --name registry registry
$ ssh -NL 5000:localhost:5000 ubuntu@gamma.fogtype.com
$ docker context use default
$ kamal deploy
```

TODO

- [ ] Docker レジストリどうするか問題
