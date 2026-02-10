# 📚 AnimeStream - Documentation Index

## 🚀 Quick Start
- **START_HERE.md** - Cara tercepat untuk mulai
- **README.md** - Dokumentasi lengkap project

---

## ❌ Error & Troubleshooting
- **README_ERRORS.md** - Daftar error umum & solusinya
- **QUICK_FIX_MODULES.md** - Quick fix untuk module & port errors
- **TROUBLESHOOTING_MODULES.md** - Troubleshooting detail
- **TROUBLESHOOTING.md** - General troubleshooting
- **FIX_MODULE_ERROR.md** - Fix module errors (legacy)

---

## 📱 Android/Acode Setup
- **TERMUX_SIMPLE.md** - Cara run di Termux (SUPER SIMPLE!) ⭐
- **TERMUX_GUIDE.md** - Panduan lengkap Termux dengan tips & tricks
- **ACODE_TERMINAL_ONLY.md** - Cara run di Acode Terminal
- **ACODE_SETUP.md** - Setup lengkap Acode + Termux
- **ACODE_RUN_GUIDE.md** - Panduan run di Acode
- **ACODE_VISUAL_GUIDE.md** - Panduan visual step-by-step
- **README_ANDROID.md** - Android setup overview
- **ANDROID_COMMANDS.md** - Command reference untuk Android

---

## ⚙️ Configuration & Setup
- **DATABASE.md** - Database schema & setup
- **EMAIL_SETUP.md** - Email configuration
- **SETUP_EMAIL_STEP_BY_STEP.md** - Email setup step-by-step
- **OAUTH_SETUP.md** - Google & Facebook OAuth setup
- **MUSIC_SETUP.md** - Background music setup
- **BACKGROUND_SETUP.md** - Background image setup

---

## 🎯 Features
- **DASHBOARD_FEATURES.md** - Dashboard features overview
- **SETTINGS_GUIDE.md** - Settings page guide
- **BUILD_APK.md** - Build Android APK
- **DEPLOYMENT_GUIDE.md** - Deploy to production

---

## 🛠️ Scripts & Tools

### Windows:
- **start-server.bat** - Start server (auto-stop old server)
- **stop-server.bat** - Stop server
- **fix-modules.sh** - Fix module errors (bash)

### Android/Termux:
- **start-android.sh** - Start server di Android
- **stop-android.sh** - Stop server di Android
- **run-acode.sh** - Quick run di Acode
- **.termux-setup.sh** - First-time Termux setup

### Testing:
- **test-email.js** - Test email functionality
- **test-forgot-password.js** - Test password reset
- **test-upload.js** - Test upload functionality
- **reset-admin.js** - Reset admin password

---

## 📖 How to Use This Index

### Baru Mulai?
1. Baca **START_HERE.md**
2. Jika error, buka **README_ERRORS.md**

### Setup di Android?
1. Baca **TERMUX_SIMPLE.md** (paling mudah!) ⭐
2. Atau **TERMUX_GUIDE.md** (lengkap dengan tips)
3. Atau **ACODE_TERMINAL_ONLY.md** (jika pakai Acode)

### Ada Error?
1. Cek **README_ERRORS.md** untuk error umum
2. Cek **QUICK_FIX_MODULES.md** untuk quick fix
3. Cek **TROUBLESHOOTING_MODULES.md** untuk detail

### Mau Deploy?
1. Baca **DEPLOYMENT_GUIDE.md**
2. Atau **BUILD_APK.md** untuk Android app

---

## 🎯 Quick Commands Reference

### Start Server:
```bash
# Windows
start-server.bat

# Android/Termux
bash start-android.sh

# Acode Terminal
node server.js
```

### Stop Server:
```bash
# Windows
stop-server.bat
# atau: taskkill /F /IM node.exe

# Android/Termux
bash stop-android.sh
# atau: lsof -ti:3000 | xargs kill -9
# atau: Volume Down + C (di Termux)
```

### Fix Modules:
```bash
npm install --legacy-peer-deps
```

### Reset Everything:
```bash
# Windows
taskkill /F /IM node.exe
rmdir /s /q node_modules
npm install --legacy-peer-deps

# Android/Termux
lsof -ti:3000 | xargs kill -9
rm -rf node_modules
npm install --legacy-peer-deps
```

---

## 🆘 Need Help?

1. **Cek error message** - Lihat error apa yang muncul
2. **Buka README_ERRORS.md** - Cari error yang sama
3. **Follow solution** - Ikuti solusi yang diberikan
4. **Still stuck?** - Baca dokumentasi detail yang relevan

---

## 📱 Access Server

After server starts:
- **Local**: http://localhost:3000
- **Network**: http://[YOUR-IP]:3000

**Default Login:**
- Username: `admin`
- Password: `admin123`

---

**© 2026 AnimeStream - Platform Streaming Anime Terbaik**
