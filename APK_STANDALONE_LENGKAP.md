# 📱 APK Standalone - Simpan Video di HP!

## 🎯 Solusi: Server Jalan di HP

Untuk video & data tetap tersimpan, server harus jalan di HP sendiri (bukan hosting online).

**Cara kerja:**
1. Install Termux di HP
2. Jalankan server Node.js di HP
3. Akses via browser HP: `http://localhost:3000`
4. Atau buat APK yang akses localhost

**Kelebihan:**
- ✅ Data & video tersimpan di HP
- ✅ Tidak perlu internet (offline)
- ✅ Tidak perlu hosting
- ✅ Gratis 100%

---

## 📋 CARA 1: Termux + Browser (PALING MUDAH!)

### Step 1: Install Termux (5 Menit)

1. **Download Termux:**
   - Buka: https://f-droid.org/en/packages/com.termux/
   - Atau: https://github.com/termux/termux-app/releases
   - Download APK terbaru
   - Install di HP

2. **Buka Termux**

3. **Update packages:**
   ```bash
   pkg update && pkg upgrade -y
   ```

4. **Install Node.js:**
   ```bash
   pkg install nodejs git -y
   ```

---

### Step 2: Upload Project ke HP (10 Menit)

**Cara 1: Via GitHub (Recommended)**

```bash
# Clone dari GitHub (jika sudah push)
git clone https://github.com/USERNAME/animestream.git
cd animestream

# Install dependencies
npm install --legacy-peer-deps
```

**Cara 2: Via File Transfer**

1. Copy folder project ke HP (via USB/WhatsApp)
2. Pindahkan ke folder Termux:
   ```bash
   # Di Termux
   cd ~
   cp -r /sdcard/Download/ArtonNime ./animestream
   cd animestream
   npm install --legacy-peer-deps
   ```

---

### Step 3: Jalankan Server (2 Menit)

```bash
# Start server
node server.js
```

**Output:**
```
✅ Server berjalan di http://localhost:3000
```

---

### Step 4: Akses Website (1 Menit)

1. **Buka browser di HP** (Chrome/Firefox)
2. **URL:** `http://localhost:3000`
3. **Login:** `admin` / `admin123`
4. **Upload video** → Tersimpan di HP! ✅

---

### Step 5: Auto-Start (Opsional)

**Agar server auto-start saat HP nyala:**

1. **Install Termux:Boot:**
   - Download: https://f-droid.org/en/packages/com.termux.boot/
   - Install

2. **Buat script auto-start:**
   ```bash
   mkdir -p ~/.termux/boot
   nano ~/.termux/boot/start-server.sh
   ```

3. **Isi script:**
   ```bash
   #!/data/data/com.termux/files/usr/bin/bash
   cd ~/animestream
   node server.js > ~/server.log 2>&1 &
   ```

4. **Save:** Ctrl+X → Y → Enter

5. **Buat executable:**
   ```bash
   chmod +x ~/.termux/boot/start-server.sh
   ```

6. **Restart HP** → Server auto-start! ✅

---

## 📋 CARA 2: APK WebView (Akses Localhost)

Buat APK yang akses `http://localhost:3000`

### Step 1: Buat APK dengan AppGeyser

1. **Buka:** https://appsgeyser.com
2. **Create App** → **Website**
3. **URL:** `http://localhost:3000`
4. **Name:** `AnimeStream`
5. **Create** → **Download APK**

### Step 2: Install APK + Termux

1. Install APK AnimeStream
2. Install Termux (dari step sebelumnya)
3. Jalankan server di Termux
4. Buka APK AnimeStream
5. Website load dari localhost! ✅

---

## 📋 CARA 3: APK Native (Full Offline)

Buat APK native dengan Android Studio yang include server Node.js.

**Kompleks, butuh:**
- Android Studio
- Node.js to Java bridge
- 2-3 jam setup

**Panduan lengkap:** Baca `BUILD_APK_ANDROID_STUDIO.md`

---

## 🎯 Rekomendasi

### Untuk Kamu (Paling Mudah):

**Termux + Browser**
- Install Termux
- Jalankan server
- Akses via browser
- Upload video → Tersimpan di HP!

**Kelebihan:**
- ✅ Super mudah (15 menit)
- ✅ Data & video tersimpan
- ✅ Offline
- ✅ Gratis

**Kekurangan:**
- ⚠️ Harus buka Termux dulu
- ⚠️ Server stop jika Termux ditutup

---

## 💡 Tips Pro

### 1. Agar Server Jalan di Background

**Install Termux:API:**
```bash
pkg install termux-api -y
```

**Jalankan server di background:**
```bash
nohup node server.js > server.log 2>&1 &
```

Server tetap jalan meskipun Termux ditutup!

---

### 2. Akses dari HP Lain (Jaringan Lokal)

**Cari IP HP:**
```bash
ifconfig wlan0 | grep inet
```

**Contoh IP:** `192.168.1.100`

**Akses dari HP lain:**
```
http://192.168.1.100:3000
```

Teman bisa akses dari HP mereka (satu WiFi)!

---

### 3. Backup Data

**Backup database:**
```bash
cp ~/animestream/animestream.db ~/animestream.db.backup
```

**Backup video:**
```bash
cp -r ~/animestream/uploads ~/uploads.backup
```

---

## 🆘 Troubleshooting

### Error: "Cannot find module"

**Fix:**
```bash
cd ~/animestream
npm install --legacy-peer-deps
```

---

### Error: "Port already in use"

**Fix:**
```bash
# Kill process di port 3000
pkill -f "node server.js"

# Start lagi
node server.js
```

---

### Server Stop Saat Termux Ditutup

**Fix:**
```bash
# Jalankan di background
nohup node server.js > server.log 2>&1 &

# Cek logs
tail -f server.log
```

---

### Video Tidak Tersimpan

**Fix:**
```bash
# Cek folder uploads
ls -la ~/animestream/uploads

# Buat folder jika tidak ada
mkdir -p ~/animestream/uploads
chmod 777 ~/animestream/uploads
```

---

## 📊 Perbandingan Solusi

| Solusi | Mudah | Offline | Persistent | Gratis |
|--------|-------|---------|------------|--------|
| **Termux + Browser** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| **APK WebView** | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| **APK Native** | ⭐⭐ | ✅ | ✅ | ✅ |
| **Hosting Online** | ⭐⭐⭐⭐ | ❌ | ❌ | ✅ |

**Kesimpulan:**
Termux + Browser = **Terbaik untuk kamu!**

---

## 🎯 Quick Start (15 Menit)

```bash
# 1. Install Termux dari F-Droid

# 2. Di Termux:
pkg update && pkg upgrade -y
pkg install nodejs git -y

# 3. Clone project (jika sudah di GitHub)
git clone https://github.com/USERNAME/animestream.git
cd animestream

# 4. Install dependencies
npm install --legacy-peer-deps

# 5. Start server
node server.js

# 6. Buka browser: http://localhost:3000
# 7. Login: admin / admin123
# 8. Upload video → Tersimpan di HP! ✅
```

---

## 📱 Hasil Akhir

**Kamu punya:**
- ✅ Server jalan di HP
- ✅ Website akses via browser
- ✅ Data & video tersimpan di HP
- ✅ Bisa offline (tidak perlu internet)
- ✅ Gratis 100%

**Upload video:**
- Video tersimpan di: `/data/data/com.termux/files/home/animestream/uploads/`
- Database tersimpan di: `/data/data/com.termux/files/home/animestream/animestream.db`

---

## 📞 Butuh Bantuan?

**WhatsApp:** 082297706541

**Dokumentasi:**
- `TERMUX_SIMPLE.md` - Panduan Termux
- `APK_STANDALONE_GUIDE.md` - APK standalone
- `AUTO_START_GUIDE.md` - Auto-start setup

---

**© 2026 AnimeStream**
**Server di HP, data tersimpan! 📱**
