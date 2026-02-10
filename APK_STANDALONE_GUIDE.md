# 📱 APK Standalone - Jalan Permanen di HP

## 🎯 Konsep

APK yang bisa jalan **tanpa internet**, **tanpa hosting**, langsung di HP!

**Cara Kerja:**
1. Server Node.js dibundle ke dalam APK
2. Database SQLite di HP
3. File video di storage HP
4. Akses via localhost di HP

---

## 🚀 Solusi: Termux + Tasker (RECOMMENDED)

### Kelebihan:
- ✅ Gratis 100%
- ✅ Server jalan di background
- ✅ Auto-start saat HP nyala
- ✅ Tidak perlu internet
- ✅ Data persistent

### Cara Kerja:
1. Install Termux (server Node.js)
2. Install Tasker (auto-start)
3. Server jalan di background
4. Akses via browser: `http://localhost:3000`

---

## 📋 Setup Lengkap (30 Menit)

### Step 1: Install Termux
1. Download Termux dari F-Droid: https://f-droid.org/packages/com.termux/
2. Install aplikasi

### Step 2: Setup Node.js di Termux
```bash
# Update Termux
pkg update && pkg upgrade -y

# Install Node.js
pkg install nodejs -y

# Verify
node --version
npm --version
```

### Step 3: Copy Project ke HP
1. Copy folder project ke:
   ```
   /storage/emulated/0/AnimeStream
   ```

2. Di Termux:
   ```bash
   cd /storage/emulated/0/AnimeStream
   npm install --legacy-peer-deps
   ```

### Step 4: Test Server
```bash
node server.js
```

Buka browser: `http://localhost:3000`

**Jika berhasil → Lanjut ke auto-start!**

---

## 🔄 Auto-Start dengan Tasker

### Step 1: Install Tasker
1. Download Tasker (berbayar ~$3)
2. Atau gunakan Termux:Boot (gratis)

### Step 2: Buat Script Auto-Start

**File:** `/storage/emulated/0/AnimeStream/start-boot.sh`

```bash
#!/data/data/com.termux/files/usr/bin/bash

# Wait for system to boot
sleep 30

# Start server
cd /storage/emulated/0/AnimeStream
node server.js > /dev/null 2>&1 &

# Log
echo "AnimeStream started at $(date)" >> /storage/emulated/0/AnimeStream/boot.log
```

### Step 3: Setup Termux:Boot

1. Install Termux:Boot dari F-Droid
2. Buka Termux:Boot sekali (untuk activate)
3. Buat folder:
   ```bash
   mkdir -p ~/.termux/boot
   ```

4. Copy script:
   ```bash
   cp /storage/emulated/0/AnimeStream/start-boot.sh ~/.termux/boot/
   chmod +x ~/.termux/boot/start-boot.sh
   ```

5. Restart HP
6. Server auto-start!

---

## 📱 Alternatif: React Native APK (Kompleks)

Jika mau APK native yang benar-benar standalone:

### Konsep:
1. Convert backend ke React Native
2. Bundle database di APK
3. Build APK native

**Waktu:** 1-2 minggu
**Skill:** React Native, Mobile Development

**Tidak recommended untuk project ini!**

---

## 🎯 Solusi Terbaik: Hybrid

### Kombinasi Termux + WebView APK

**Cara:**
1. Server jalan di Termux (background)
2. APK WebView akses localhost
3. User buka APK, langsung connect ke localhost

**Kelebihan:**
- ✅ Seperti app native
- ✅ Server di background
- ✅ Data persistent
- ✅ Mudah dibuat

---

## 🛠️ Build Hybrid APK

### Step 1: Server di Termux (sudah setup di atas)

### Step 2: Buat APK WebView

**File:** `MainActivity.java`

```java
package com.animestream.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        
        webView.setWebViewClient(new WebViewClient());
        
        // Connect ke localhost (server Termux)
        webView.loadUrl("http://localhost:3000");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```

### Step 3: Build APK
Ikuti: **BUILD_APK_ANDROID_STUDIO.md**

---

## 📊 Perbandingan Solusi

| Solusi | Kompleksitas | Biaya | Offline | Auto-Start |
|--------|--------------|-------|---------|------------|
| Termux + Browser | Mudah | Gratis | ✅ | ✅ |
| Termux + WebView APK | Sedang | Gratis | ✅ | ✅ |
| React Native | Sulit | Gratis | ✅ | ✅ |
| WebView + Hosting | Mudah | Gratis | ❌ | ✅ |

---

## 🎯 Rekomendasi

### Untuk Kamu:
**Termux + WebView APK** (Hybrid)

**Alasan:**
- ✅ Mudah setup
- ✅ Gratis 100%
- ✅ Jalan offline
- ✅ Auto-start
- ✅ Data persistent
- ✅ Seperti app native

**Langkah:**
1. Setup Termux (30 menit)
2. Setup auto-start (10 menit)
3. Build APK WebView (30 menit)
4. Selesai!

---

## 📝 Checklist

- [ ] Termux installed
- [ ] Node.js installed di Termux
- [ ] Project copied ke HP
- [ ] Dependencies installed
- [ ] Server tested (http://localhost:3000)
- [ ] Auto-start script created
- [ ] Termux:Boot configured
- [ ] APK WebView built
- [ ] APK tested
- [ ] Auto-start tested (restart HP)

---

## 🆘 Troubleshooting

### Server tidak auto-start
```bash
# Cek log
cat /storage/emulated/0/AnimeStream/boot.log

# Test manual
bash ~/.termux/boot/start-boot.sh
```

### APK tidak connect
```bash
# Pastikan server jalan
# Di Termux:
lsof -i:3000

# Jika tidak ada, start manual:
cd /storage/emulated/0/AnimeStream
node server.js
```

### Port conflict
```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Start ulang
node server.js
```

---

**Baca juga:**
- **TERMUX_GUIDE.md** - Setup Termux lengkap
- **BUILD_APK_ANDROID_STUDIO.md** - Build APK WebView

**© 2026 AnimeStream**
**WA: 082297706541**
