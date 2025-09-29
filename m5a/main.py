import os
import time

import neopixel
import network
import uasyncio as asyncio
import ujson as json
from machine import Pin

# ------------- 設定 -------------
SSID = "YOUR_SSID"
PASSWORD = "YOUR_PASS"
PORT = 80

# ==== 設定 ====
NUM_PIXELS = 25
PIN_NEOPIXEL = 27  # Atom Lite の 5x5 LED
PORT = 80
DURATION = 3  # 点灯する秒数

# ==== 初期化 ====
np = neopixel.NeoPixel(Pin(PIN_NEOPIXEL), NUM_PIXELS)
# --- GPIO制御 ---
gpio26 = Pin(26, Pin.OUT)
gpio32 = Pin(32, Pin.OUT)

# GPIO pins that must be set both H or both L
gpio26 = Pin(26, Pin.OUT)
gpio32 = Pin(32, Pin.OUT)


# ------------- ユーティリティ -------------
def set_gpio_both(on: bool):
    v = 1 if on else 0
    gpio26.value(v)
    gpio32.value(v)


def clear():
    for i in range(NUM_PIXELS):
        np[i] = (0, 0, 0)
    np.write()
    gpio26.value(0)
    gpio32.value(0)


def smile(color=(0, 50, 0)):
    """緑のにっこりマークを表示"""
    clear()
    eyes = [(1, 1), (3, 1)]
    mouth = [(0, 3), (1, 4), (2, 4), (3, 4), (4, 3)]

    def idx(x, y):
        return y * 5 + x

    for x, y in eyes + mouth:
        np[idx(x, y)] = color
    np.write()
    gpio26.value(1)
    gpio32.value(1)


def trigger():
    """スマイルを表示し、一定時間後に消灯"""
    smile()
    time.sleep(DURATION)
    clear()


# ------------- Wi-Fi 接続 -------------
def wifi_connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    while not wlan.isconnected():
        asyncio.sleep_ms(200)
    ip = wlan.ifconfig()[0]
    print("Connected, IP:", ip)
    return ip


# ------------- HTTP サーバ（uasyncio.Stream）-------------
MIME_TYPES = {
    "html": "text/html",
    "htm": "text/html",
    "js": "application/javascript",
    "css": "text/css",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "svg": "image/svg+xml",
    "json": "application/json",
    "ico": "image/x-icon",
}


async def send_file(writer, path):
    try:
        # バイナリ読みでOK
        with open(path, "rb") as f:
            # Content-Type
            ext = path.rsplit(".", 1)[-1].lower()
            ctype = MIME_TYPES.get(ext, "application/octet-stream")
            data = f.read()
            await writer.awrite("HTTP/1.1 200 OK\r\n")
            await writer.awrite("Content-Type: {}\r\n".format(ctype))
            await writer.awrite("Content-Length: {}\r\n".format(len(data)))
            await writer.awrite("Connection: close\r\n")
            await writer.awrite("\r\n")
            await writer.awrite(data)
    except Exception:
        await writer.awrite("HTTP/1.1 404 NOT FOUND\r\n\r\n404")


async def handle_api(writer, method, path, headers, body_bytes):
    # path like /api/heart, /api/gpio, /api/color, /api/vad
    try:
        if path.startswith("/api/smile"):
            trigger()
        else:
            return {"status": "error", "reason": "unknown api"}
    except Exception as e:
        return {"status": "error", "exception": str(e)}


async def http_handler(reader, writer):
    try:
        request_line = await reader.readline()
        if not request_line:
            await writer.aclose()
            return
        request_line = request_line.decode().strip()
        method, raw_path, _ = request_line.split()
        print("Request:", method, raw_path)
        # ヘッダー読む
        headers = {}
        while True:
            line = await reader.readline()
            if not line or line == b"\r\n":
                break
            l = line.decode()
            if ":" in l:
                k, v = l.split(":", 1)
                headers[k.strip().lower()] = v.strip()
        # パスとクエリ分離
        path = raw_path.split("?", 1)[0]
        # ボディ読み（Content-Length があれば）
        body = b""
        cl = int(headers.get("content-length", "0"))
        if cl:
            body = await reader.readexactly(cl)

        # API ハンドリング
        if path.startswith("/api/"):
            res = await handle_api(writer, method, path, headers, body)
            b = json.dumps(res)
            await writer.awrite("HTTP/1.1 200 OK\r\n")
            await writer.awrite("Content-Type: application/json\r\n")
            await writer.awrite("Content-Length: {}\r\n".format(len(b)))
            await writer.awrite("Connection: close\r\n")
            await writer.awrite("\r\n")
            await writer.awrite(b)
            await writer.aclose()
            return

        # 静的ファイル: "/" -> "/index.html"（または /index.html）
        if path.endswith("/"):
            path += "index.html"
        fs_path = "./static" + path
        if fs_path.endswith("/"):
            fs_path += "index.html"
        try:
            os.stat(fs_path)
            await send_file(writer, fs_path)
        except OSError:
            # 404
            await writer.awrite("HTTP/1.1 404 NOT FOUND\r\n")
            await writer.awrite("Content-Type: text/plain\r\n\r\n")
            await writer.awrite("404 Not Found")
        await writer.aclose()
    except Exception as e:
        try:
            await writer.awrite("HTTP/1.1 500 INTERNAL\r\n\r\n")
            await writer.awrite("Error: " + str(e))
            await writer.aclose()
        except:
            pass


async def main():
    wifi_connect()
    print("Starting server on port", PORT)
    await asyncio.start_server(http_handler, "0.0.0.0", PORT)
    # サーバはバックグラウンドで動く
    while True:
        await asyncio.sleep(1)


# 実行
try:
    asyncio.run(main())
finally:
    asyncio.new_event_loop()
