# SPDX-License-Identifier: MIT

import random

import M5
from M5 import *

from hardware import I2C, Pin
from hardware.rgb import WS2812
from base import AtomicEchoBase

import time

i2c1 = None
echo = None
px = None

NUM_PIXELS = 25
PIXEL_PIN = 27

SCALE = [523, 587, 659, 784, 880, 1047]  # C5 D5 E5 G5 A5 C6
NOTE_COLORS = [
    0xFF0000,  # C5 red
    0xFF8000,  # D5 orange
    0xFFFF00,  # E5 yellow
    0x00FF00,  # G5 green
    0x0080FF,  # A5 blue
    0xFF00FF,  # C6 magenta
]


def play_omikuji():
    n = random.randint(3, 6)
    for _ in range(n):
        idx = random.randrange(len(SCALE))
        dur = random.choice([100, 150, 200])
        px.fill_color(NOTE_COLORS[idx])
        px.write()
        echo.tone(SCALE[idx], dur)
        time.sleep_ms(dur + 20)
    px.fill_color(0x000000)
    px.write()


def setup():
    global i2c1, echo, px
    M5.begin()
    px = WS2812(Pin(PIXEL_PIN), NUM_PIXELS)
    px.set_brightness(80)
    px.fill_color(0x000000)
    px.write()
    i2c1 = I2C(1, scl=Pin(21), sda=Pin(25), freq=100000)
    echo = AtomicEchoBase(
        i2c1, address=0x18, i2s_port=1, sample_rate=44100,
        i2s_sck=33, i2s_ws=19, i2s_di=23, i2s_do=22,
    )
    echo.set_volume(50)


def loop():
    M5.update()
    if BtnA.wasPressed():
        play_omikuji()


if __name__ == "__main__":
    try:
        setup()
        while True:
            loop()
    except (Exception, KeyboardInterrupt) as e:
        try:
            from utility import print_error_msg
            print_error_msg(e)
        except ImportError:
            print("please update to latest firmware")
