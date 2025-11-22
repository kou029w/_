やりたいこと: 複数の NIC がある環境でそれぞれ Docker コンテナに割り当て

構築:

```sh
sudo ip link add br0 type bridge
sudo ip link set [INTERFACE_NAME] master br0
SUBNET_ADDRESS=[SUBNET_ADDRESS] docker compose up -d
```

確認:

```sh
watch -n 1 ip -s link show [INTERFACE_NAME]
```

撤去:

```sh
docker compose down
sudo ip link delete br0 type bridge
```

macvlan を使用する場合:

```yml
services:
  a:
    image: alpine
    command: ping 8.8.8.8
    networks:
      macnet:
        ipv4_address: "${IP_ADDRESS}"
networks:
  macnet:
    driver: macvlan
    driver_opts:
      parent: "${INTERFACE_NAME}"
    ipam:
      driver: default
      config:
        - subnet: "${SUBNET_ADDRESS}"
          gateway: "${GATEWAY_ADDRESS}"
```
