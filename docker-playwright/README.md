# デスクトップ環境で Docker イメージを使って Playwright のブラウザーを起動してみる

WebKit の環境が必要だったので構築してみた。

Ubuntu ならば Playwright が公式にサポートしているためホントは不要だが、環境を汚さないので便利かもしれないと思った。

## 前提

- Docker
- X11 の UNIX ドメインソケットが/tmp/.X11-unix に存在すること

## やり方

```sh
docker run --rm -it -u $(id -u):$(id -g) -e DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix mcr.microsoft.com/playwright npx playwright wk example.com
```

Digest: `sha256:310e3ca5bb884f4b9a4a8452dbabda4a35ac62a0d6f46eee953558e8d7d4cfb0`

### Docker Compose の場合

```bash
echo UID=$(id -u) >> .env
echo GID=$(id -g) >> .env
docker-compose up
```
