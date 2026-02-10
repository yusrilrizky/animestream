# 📱 AnimeStream - Panduan Utama

## 🎯 Pilihan Deploy

### 1️⃣ **APK Standalone (Data Tersimpan di HP)** ⭐⭐⭐⭐⭐

**Untuk:** Video & data tersimpan di HP

**Cara:**
1. Install Termux dari F-Droid
2. Jalankan server di HP
3. Akses via browser: `http://localhost:3000`

**Panduan:** `APK_STANDALONE_LENGKAP.md`

---

### 2️⃣ **Deploy ke Render (Online, Gratis)**

**Untuk:** Website online, bisa diakses dari mana saja

**Cara:**
1. Push ke GitHub
2. Deploy ke Render
3. Buat APK dari URL

**Panduan:** `RENDER_DAN_APK_LENGKAP.md` atau `QUICK_START_RENDER_APK.md`

⚠️ Data tidak persistent (hilang setiap deploy)

---

### 3️⃣ **Deploy ke Railway (Data Persistent)**

**Untuk:** Website online + data persistent

**Cara:**
1. Push ke GitHub
2. Deploy ke Railway
3. Buat APK dari URL

**Panduan:** `DEPLOY_RAILWAY_LENGKAP.md`

✅ Data & video tersimpan (tidak hilang)

---

## 📖 Dokumentasi Tersedia

### Deploy & Hosting:
- `RENDER_DAN_APK_LENGKAP.md` - Deploy Render + APK
- `QUICK_START_RENDER_APK.md` - Quick start Render
- `DEPLOY_RAILWAY_LENGKAP.md` - Deploy Railway (data persistent)
- `RENDER_SIMPLE.md` - Render basics
- `RENDER_TROUBLESHOOTING.md` - Troubleshooting Render

### APK:
- `APK_STANDALONE_LENGKAP.md` - APK standalone (Termux)
- `BUILD_APK_GUIDE.md` - Cara buat APK
- `BUILD_APK_ANDROID_STUDIO.md` - APK dengan Android Studio
- `PWA_GUIDE.md` - Progressive Web App

### Termux (Android):
- `TERMUX_SIMPLE.md` - Panduan Termux
- `TERMUX_GUIDE.md` - Termux lengkap
- `AUTO_START_GUIDE.md` - Auto-start server
- `start-android.sh` - Script start server
- `stop-android.sh` - Script stop server

### Troubleshooting:
- `TROUBLESHOOTING.md` - Troubleshooting umum
- `TROUBLESHOOTING_MODULES.md` - Error modules
- `RENDER_TROUBLESHOOTING.md` - Error Render

### Lainnya:
- `BUILD_APK.md` - Build APK
- `README.md` - Project overview

---

## 🚀 Quick Start

### Untuk APK Standalone (Termux):
```bash
# 1. Install Termux
# 2. Di Termux:
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/USERNAME/animestream.git
cd animestream
npm install --legacy-peer-deps
node server.js
# 3. Browser: http://localhost:3000
```

### Untuk Deploy Online (Render):
```bash
# 1. Push ke GitHub
git branch -M main
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main

# 2. Deploy di Render.com
# 3. Buat APK di AppGeyser.com
```

---

## 📞 Kontak

**WhatsApp:** 082297706541

---

**© 2026 AnimeStream**
