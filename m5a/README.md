# M5A Device Setup

## 1. Configure WiFi Settings

Before deploying to the device, edit the WiFi credentials in `main.py`:

```python
# ------------- 設定 -------------
SSID = "YOUR_SSID"        # Replace with your WiFi network name
PASSWORD = "YOUR_PASS"    # Replace with your WiFi password
```

## 2. Modify Frontend

```diff
diff a/static/main.js b/static/main.js
index 3feb608..6f0b7d8 100644
--- a/static/main.js
+++ b/static/main.js
@@ -254,6 +254,9 @@ function vr_function() {
   };

   recognition.onresult = function(event) {
+    // M5Atomに通知
+    fetch("/api/smile", { method: "POST" }).catch((err) => console.error(err));
+
     var results = event.results;
     var current_transcripts = ''; // resultsが複数ある場合は全て連結する。
     var need_reset = false;
```

## 3. Deploy to Device

```sh
uvx mpremote fs cp main.py :main.py
uvx mpremote fs mkdir :static
uvx mpremote fs cp static/index.html :static/index.html
uvx mpremote fs cp static/main.js :static/main.js
uvx mpremote fs cp static/style.css :static/style.css
uvx mpremote fs mkdir :static/kuromoji
uvx mpremote fs mkdir :static/kuromoji/build
uvx mpremote fs cp static/kuromoji/build/kuromoji.js :static/kuromoji/build/kuromoji.js
```
