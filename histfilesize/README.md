# Bash `HISTFILESIZE` の限界

```console
$ seq 0 $((0x7fffffff)) > .bash_history
$ wc -l .bash_history
2147483648 .bash_history
$ echo $((0x7fffffff))
2147483647
$ docker compose run --rm bash
root@ff1161946537:/# 225859065
$ wc -l .bash_history
16777215 .bash_history
```

- 225859066 行 (< 0x7fffffff bytes) まで読み込まれた
  - `HISTFILESIZE=$((0x7fffffff))` 以上にするのは意味がない
- `HISTFILESIZE=$((0x7fffff))` 行に切り落とせる
- `HISTFILESIZE=$((0xffffff))` 行に切り落とせる
- `HISTFILESIZE=$((0x7fffffff))` では .bash_history が大きいとハングすることがあった
  - このあたりが限界だろう
  - 0xffffff 行くらいまでならおそらく OK だろう
