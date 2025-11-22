やりたいこと: 複数の NIC がある環境でそれぞれ Docker コンテナに割り当て

既存のシステムブリッジ br0 を Docker ブリッジとして利用できない
https://github.com/moby/libnetwork/issues/2310

なので macvlan を使用:

```sh
docker compose up -d
```

確認:

```sh
watch -n 1 ip -s link show enp1s0
```
