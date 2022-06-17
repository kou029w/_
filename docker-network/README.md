やりたいこと: 複数の NIC がある環境でそれぞれ Docker コンテナに割り当てたい

メモ:

```sh
docker compose create
sudo apt install -y bridge-utils
sudo brctl addif br-nic-a <NIC名>
docker compose start
# brctl show
```

インターネットにつながることは確認できなかった。
NIC を割り当てることはできた。
あとは IP アドレスを振れば問題無いか。
