# GPG鍵をYubiKey 5.7へ移行する手順 (2026)

この手順は、GnuPGの主鍵と副鍵をオフライン環境で生成し、同じ鍵材を2本のYubiKeyへ格納して、旧鍵から新鍵へ移行するためのものです。

## この手順の前提

対象者は `Kohei Watanabe <nebel@fogtype.com>` です。

GnuPG 2.4以降を前提にします。

旧鍵の主鍵フィンガープリントは次の値です。

```text
4818 145E 783E 2A4A 04E8  16A4 7980 7D08 C6EF 6460
```

提示された旧鍵は、主鍵が `[SC]`、副鍵が `[A]` と `[E]` で、2029-03-30まで有効です。

新鍵は次の構成にします。

| 鍵   | 用途                    | 格納先               |
| ---- | ----------------------- | -------------------- |
| 主鍵 | 認証局証明と署名 `[SC]` | 署名スロット `SIG`   |
| 副鍵 | 認証 `[A]`              | 認証スロット `AUT`   |
| 副鍵 | 暗号化と復号 `[E]`      | 暗号化スロット `DEC` |

YubiKeyのOpenPGPアプリケーションには、署名、暗号化、認証の3スロットしかありません。
そのため、主鍵の認証局証明用途 `C` と署名用途 `S` は一つの主鍵にまとめます。

2本の新しいYubiKeyには、3スロットすべてへ同じ鍵材を格納します。

- YubiKey 5C NFC：日用
- YubiKey 5C Nano：オフライン保管

旧鍵の2本は移行期間中に保持します。

- YubiKey 5C NFC：旧鍵の日用
- YubiKey 5 NFC：旧鍵のオフライン保管

「旧主鍵を副鍵へ格下げする」操作はOpenPGPにはありません。
新鍵を新しい主鍵として使い、旧主鍵は移行期間に新鍵との対応を証明する旧鍵として扱います。

新鍵を作成した時点で、秘密鍵を復元できるバックアップは作りません。
2本のYubiKeyを同時に失うと、新鍵を復元できず、失効証明書も作れない運用になります。

## 移行を中止する条件

次のいずれかに該当する場合、この手順の「失効させない移行」は使いません。

- 旧鍵の秘密鍵がコピーされた証拠がある
- 旧鍵のパスフレーズ、YubiKeyのPIN、管理者PINが漏れた
- 旧鍵を格納したYubiKeyを回収できない
- オフライン生成環境に秘密鍵が残った可能性がある

この場合は旧鍵を直ちに失効させ、失効済みの公開鍵を配布します。

## 作業前の準備

作業は、永続ストレージを接続していないTails OSなどで行います。
ネットワークを切断し、Tailsの永続領域を使わない状態で起動します。
新しいYubiKey以外のYubiKeyは取り外します。

GnuPGのバージョンとOpenPGPカードの情報を確認します。

```sh
gpg --version
gpg --card-status
```

新しい2本について、`gpg --card-status` の `Version` が5.7.xで、`Application type` がOpenPGPであることを確認します。

カードのPINを変更するには、次のコマンドを実行します。

```sh
gpg --change-pin
```

表示されたメニューで、ユーザーPINの変更には `1`、管理者PINの変更には `3` を選びます。

通常のユーザーPINの初期値は `123456`、管理者PINの初期値は `12345678` です。
PINの値はシェル履歴、ファイル、写真には残しません。

## 作業用の一時GnuPG環境を作る

秘密鍵を通常のホームディレクトリへ生成しないため、メモリ上の一時ディレクトリをGnuPGホームにします。
Tails以外で実施する場合は、`/tmp` がメモリ上にあることと、スワップが有効でないことを確認します。

```sh
set -eu
umask 077

export GNUPGHOME="$(mktemp -d /tmp/gpg-new.XXXXXX)"
GNUPGHOME_SECOND="$(mktemp -d /tmp/gpg-new-second.XXXXXX)"
```

旧鍵の公開鍵を一時環境へ取り込みます。
通常環境から取り出す場合も、秘密鍵ではなく公開鍵だけをエクスポートします。

```sh
gpg --armor --export 4818145E783E2A4A04E816A479807D08C6EF6460 > old-public-key.asc
gpg --import old-public-key.asc
gpg --show-keys --with-fingerprint --with-subkey-fingerprint old-public-key.asc
```

表示された主鍵フィンガープリントが、旧鍵のフィンガープリントと一致することを確認します。

## 新しい主鍵と副鍵を生成する

```sh
USER_ID='Kohei Watanabe <nebel@fogtype.com>'

gpg --quick-gen-key "$USER_ID" default default 3y
```

コマンドが求めたら、新しい主鍵のパスフレーズを入力します。
パスフレーズはYubiKeyのPINとは別の値です。

生成された主鍵のフィンガープリントを確認し、変数へ手入力します。

```sh
gpg --list-secret-keys --keyid-format 0xlong --with-subkey-fingerprint

NEW_FPR='新しい主鍵の40桁フィンガープリント'
```

暗号化副鍵と認証副鍵を追加し、すべての有効期限を3年に設定します。

```sh
gpg --quick-add-key "$NEW_FPR" default auth 3y
gpg --quick-set-expire "$NEW_FPR" 3y '*'
```

鍵の構成を確認します。

```sh
gpg --list-keys --keyid-format 0xlong --with-subkey-fingerprint "$NEW_FPR"
gpg --list-secret-keys --keyid-format 0xlong --with-subkey-fingerprint "$NEW_FPR"
```

次の構成になっていることを確認します。

```text
主鍵       [SC]  作成日から3年
副鍵       [E]   作成日から3年
副鍵       [A]   作成日から3年
```

## 2本のYubiKeyへ同じ鍵材を格納する

1本目へ移す前に、完全な秘密鍵を2つ目の一時GnuPG環境へパイプで複製します。
ファイルへ保存しないため、複製データは一時環境のメモリ上だけに置きます。

```sh
GNUPGHOME="$GNUPGHOME" gpg --export-secret-keys "$NEW_FPR" \
  | GNUPGHOME="$GNUPGHOME_SECOND" gpg --import

GNUPGHOME="$GNUPGHOME_SECOND" \
  gpg --list-secret-keys --with-subkey-fingerprint "$NEW_FPR"
```

### 1本目へ格納する

1本目のYubiKeyを接続し、次のコマンドを実行します。

```sh
GNUPGHOME="$GNUPGHOME" gpg --edit-key "$NEW_FPR"
```

GnuPGのプロンプトで、主鍵、`[E]` 副鍵、`[A]` 副鍵の順にカードへ移します。

```text
gpg> keytocard
Your selection? 1
gpg> key 1
gpg> keytocard
Your selection? 2
gpg> key 1
gpg> key 2
gpg> keytocard
Your selection? 3
gpg> save
```

最初の `keytocard` は主鍵を署名スロットへ移します。
二つ目は `[E]` の副鍵を暗号化スロットへ移します。
三つ目は `[A]` の副鍵を認証スロットへ移します。

副鍵の番号が表示上異なる場合は、番号ではなく用途表示 `[E]` と `[A]` を見て選択します。
用途を確認できないまま進めません。

カードへ移した後、GnuPGの秘密鍵はカードを指すスタブになります。
カード内の3つのフィンガープリントを確認します。

```sh
GNUPGHOME="$GNUPGHOME" gpg --card-status
```

### 2本目へ格納する

1本目を取り外し、2本目のYubiKeyを接続します。
2つ目のGnuPG環境を使って同じ操作を行います。

```sh
GNUPGHOME="$GNUPGHOME_SECOND" gpg --card-status
GNUPGHOME="$GNUPGHOME_SECOND" gpg --edit-key "$NEW_FPR"
```

プロンプトでは、主鍵を署名スロット、`[E]` を暗号化スロット、`[A]` を認証スロットへ移します。
保存後、2本目の `gpg --card-status` の3つのフィンガープリントが1本目と完全に一致することを確認します。

## 2本のYubiKeyを検証する

各YubiKeyを1本ずつ接続し、署名と復号を確認します。

```sh
printf 'YubiKey test\n' \
  | GNUPGHOME="$GNUPGHOME" gpg --local-user "$NEW_FPR" --clear-sign \
  | GNUPGHOME="$GNUPGHOME" gpg --verify

printf 'YubiKey encryption test\n' \
  | GNUPGHOME="$GNUPGHOME" gpg --encrypt --recipient "$NEW_FPR" \
  | GNUPGHOME="$GNUPGHOME" gpg --decrypt
```

1本目で確認した後、2本目でも同じコマンドを実行します。
どちらもYubiKeyのPINを求め、署名と復号に成功することを確認します。

## 旧鍵と新鍵を相互に署名する

鍵そのものへ署名する操作と、移行文書へ両方の鍵で署名する操作は別です。
両方を実施します。

### 鍵そのものへ署名する

旧鍵を格納したYubiKeyを接続し、旧鍵で新鍵へ署名します。

```sh
OLD_FPR='4818145E783E2A4A04E816A479807D08C6EF6460'
gpg --local-user "$OLD_FPR" --quick-sign-key "$NEW_FPR"
```

旧鍵のYubiKeyを取り外し、新鍵を格納したYubiKeyを接続します。
新鍵で旧鍵へ署名します。

```sh
gpg --local-user "$NEW_FPR" --quick-sign-key "$OLD_FPR"
```

署名後の公開鍵をエクスポートします。

```sh
gpg --armor --export "$NEW_FPR" > new-public-key.asc
gpg --armor --export "$OLD_FPR" > old-public-key-transition.asc
```

### 移行文書へ署名する

次のコマンドは、移行文書を旧鍵と新鍵で署名します。
旧鍵と新鍵のYubiKeyを交換する順序は、GnuPGのPIN要求に従います。

```sh
gpg --clear-sign \
  -u "$OLD_FPR" \
  -u "$NEW_FPR" \
  > transition-statement.asc <<EOF
OpenPGP Key Transition Statement for Kohei Watanabe <nebel@fogtype.com>

Old key fingerprint:
4818 145E 783E 2A4A 04E8  16A4 7980 7D08 C6EF 6460

New key fingerprint:
$NEW_FPR

The new key can be fetched with:
gpg --recv-key $NEW_FPR
or from: https://openpgpkey.fogtype.com/.well-known/openpgpkey/fogtype.com/hu/k5iarqu189w6rpg6immh6a3sdiyse3kp?l=nebel

If you have signed the old key, I would appreciate a signature on the new key as well.
EOF

gpg --verify transition-statement.asc
```

旧鍵と新鍵の両方について、Good signatureが表示されることを確認します。

## 公開鍵を取り出す方法

公開鍵はGnuPGの公開鍵リングから次のコマンドでエクスポートします。

```sh
gpg --armor --export "$NEW_FPR" > new-public-key.asc
gpg --show-keys --with-fingerprint --with-subkey-fingerprint new-public-key.asc
```

主鍵フィンガープリントが2本のYubiKeyの主鍵フィンガープリントと一致することを確認します。

## 公開鍵をQRコードにする

QRコードには秘密鍵を入れません。
ASCII Armor形式の公開鍵だけを使います。

```sh
command -v qrencode
command -v zbarimg
wc -c < new-public-key.asc
qrencode -8 -l L -o new-public-key.png < new-public-key.asc
zbarimg --raw new-public-key.png > decoded-public-key.asc
cmp new-public-key.asc decoded-public-key.asc
gpg --show-keys --with-fingerprint --with-subkey-fingerprint decoded-public-key.asc
```

`cmp` が成功し、フィンガープリントが新鍵と一致した画像だけを保存します。
1枚に収まらない場合は、公開鍵全体を分割して使わず、WKDのURLやフィンガープリントをQRコードにします。

## keys.openpgp.orgへ公開する

keys.openpgp.orgのVKS APIへ公開鍵を送信します。
QRコードを保存した場合は、写真から読み取ってフィンガープリントを確認した `decoded-public-key.asc` を送信します。

```sh
UPLOAD_RESPONSE="$(
  jq -Rs '{keytext: .}' < decoded-public-key.asc \
    | curl --fail --silent --show-error \
        -H 'Content-Type: application/json' \
        --data-binary @- \
        https://keys.openpgp.org/vks/v1/upload
)"

printf '%s\n' "$UPLOAD_RESPONSE"
```

応答の `key_fpr` が新鍵のフィンガープリントと一致することを確認します。
`unpublished` または `pending` の場合は、認証メールを要求します。

```sh
TOKEN="$(printf '%s' "$UPLOAD_RESPONSE" | jq -r '.token')"

jq -n \
  --arg token "$TOKEN" \
  '{token: $token, addresses: ["nebel@fogtype.com"]}' \
  | curl --fail --silent --show-error \
      -H 'Content-Type: application/json' \
      --data-binary @- \
      https://keys.openpgp.org/vks/v1/request-verify
```

メール認証後、メールアドレス検索で新鍵が返ることを確認します。

```sh
curl --fail --silent \
  https://keys.openpgp.org/vks/v1/by-email/nebel%40fogtype.com \
  | gpg --show-keys --with-fingerprint --with-subkey-fingerprint
```

## WKDを更新する

現在のWKD URLとハッシュを確認します。

```sh
gpg-wks-client --print-wkd-url nebel@fogtype.com
gpg-wks-client --print-wkd-hash nebel@fogtype.com
```

提示されているURLは次のとおりです。

```text
https://openpgpkey.fogtype.com/.well-known/openpgpkey/fogtype.com/hu/k5iarqu189w6rpg6immh6a3sdiyse3kp?l=nebel
```

静的なWKDを運用している場合は、公開鍵をバイナリ形式でエクスポートし、URLのクエリ文字列を除いたパスのファイルを置き換えます。

```sh
gpg --export "$NEW_FPR" > new-public-key.wkd
```

更新対象のパスは次のとおりです。

```text
/.well-known/openpgpkey/fogtype.com/hu/k5iarqu189w6rpg6immh6a3sdiyse3kp
```

`gpg-wks-server` を使っている場合は、サーバー上で次の形式にします。

```sh
gpg-wks-server --install-key ./new-public-key.wkd nebel@fogtype.com
```

更新後、HTTPSで取得した鍵を検証します。

```sh
curl --fail --silent \
  'https://openpgpkey.fogtype.com/.well-known/openpgpkey/fogtype.com/hu/k5iarqu189w6rpg6immh6a3sdiyse3kp?l=nebel' \
  | gpg --show-keys --with-fingerprint --with-subkey-fingerprint

gpg --auto-key-locate clear,wkd --locate-keys nebel@fogtype.com
```

## 移行期間の運用

移行文書と新公開鍵を公開した後、約1年間は旧鍵と新鍵を併用します。
新しい署名は新鍵で作成します。
旧鍵で署名された既存のデータは、旧鍵が有効である期間は旧鍵で検証します。

旧鍵の有効期限が過ぎた後は、旧YubiKeyを1本ずつ論理消去します。

```text
gpg --card-edit
gpg/card> admin
gpg/card> factory-reset
gpg --card-status
```

`factory-reset` の完了後、`gpg --card-status` でOpenPGPスロットが空であることを確認します。
確認後、そのYubiKeyを物理的に破棄します。

## 一時環境から秘密鍵を消去する

公開鍵の配布、QRコードの検証、移行文書の署名を終えてから消去します。
消去前に、新しい2本のYubiKeyで署名と復号が成功することをもう一度確認します。

```sh
GNUPGHOME="$GNUPGHOME" gpg --delete-secret-keys "$NEW_FPR"
GNUPGHOME="$GNUPGHOME_SECOND" gpg --delete-secret-keys "$NEW_FPR"

GNUPGHOME="$GNUPGHOME" gpg --delete-keys "$NEW_FPR"
GNUPGHOME="$GNUPGHOME_SECOND" gpg --delete-keys "$NEW_FPR"

GNUPGHOME="$GNUPGHOME" gpgconf --kill gpg-agent || true
GNUPGHOME="$GNUPGHOME" gpgconf --kill scdaemon || true
GNUPGHOME="$GNUPGHOME_SECOND" gpgconf --kill gpg-agent || true
GNUPGHOME="$GNUPGHOME_SECOND" gpgconf --kill scdaemon || true

rm -rf -- "$GNUPGHOME" "$GNUPGHOME_SECOND"
rm -f -- old-public-key.asc new-public-key.asc new-public-key.wkd \
  old-public-key-transition.asc transition-statement.asc \
  new-public-key.png decoded-public-key.asc
```

通常のディスク上で生成した秘密鍵は、削除してもスワップ、バックアップ、ファイルシステムの残存領域に残る可能性があります。
「YubiKey以外に秘密鍵を残さない」という条件を満たすには、作業開始時点からメモリ上の一時環境を使います。

## 移行完了の確認項目

- 新鍵の主鍵フィンガープリントを2本のYubiKeyで確認した
- `SIG`、`DEC`、`AUT` の3スロットを2本で比較した
- 新鍵で署名できた
- 新鍵で暗号化したデータを復号できた
- 旧鍵から新鍵への署名を確認した
- 新鍵から旧鍵への署名を確認した
- 旧鍵と新鍵で署名した移行文書を検証した
- QRコードを読み取り、元の公開鍵と一致した
- keys.openpgp.orgから新鍵を取得できた
- WKDから新鍵を取得できた
- 秘密鍵を含む一時ファイルを削除した
- 新しいYubiKeyを日用とオフライン保管に分けた
- 2本を同じ場所に保管していない
- 新鍵のパスフレーズ、ユーザーPIN、管理者PINを確認できる

## 参考資料

- [GnuPG OpenPGP Key Management](https://gnupg.org/documentation/manuals/gnupg/OpenPGP-Key-Management.html)
- [GnuPG Smart Card Tool](https://gnupg.org/documentation/manuals/gnupg/Smart-Card-Tool.html)
- [GnuPG Web Key Service](https://gnupg.org/documentation/manuals/gnupg/Web-Key-Service.html)
- [Yubico OpenPGP Specifics](https://docs.yubico.com/hardware/yubikey/yk-tech-manual/yk5-apps-openpgp.html)
- [keys.openpgp.org API](https://keys.openpgp.org/about/api/)
- [sunknudsen/privacy-guides](https://github.com/sunknudsen/privacy-guides/blob/master/how-to-generate-and-air-gap-pgp-private-keys-using-gnupg-tails-and-yubikey/README.md)
- [drduh/YubiKey-Guide](https://github.com/drduh/YubiKey-Guide)
- [Technical guide for using YubiKey series 4 for GPG and SSH](https://gist.github.com/ageis/14adc308087859e199912b4c79c4aaa4)
