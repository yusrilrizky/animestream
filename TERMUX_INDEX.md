# 📱 Termux Documentation Index

## 🎯 Mulai dari Mana?

### Pemula? Baca ini:
1. **TERMUX_SIMPLE.md** ⭐ - Panduan super simple (5 langkah)
2. **TERMUX_README.txt** - Quick reference

### Butuh detail? Baca ini:
1. **TERMUX_GUIDE.md** - Panduan lengkap dengan tips & tricks
2. **TERMUX_SUMMARY.md** - Summary & quick reference

---

## 📚 Semua File Termux

### Panduan:
- **TERMUX_SIMPLE.md** - Panduan ringkas (recommended)
- **TERMUX_GUIDE.md** - Panduan lengkap
- **TERMUX_SUMMARY.md** - Summary & quick reference
- **TERMUX_README.txt** - Quick reference text
- **TERMUX_INDEX.md** - File ini

### Script:
- **start-android.sh** - Start server
- **stop-android.sh** - Stop server
- **.termux-setup.sh** - First-time setup

### Troubleshooting:
- **README_ERRORS.md** - Daftar error & solusi
- **TROUBLESHOOTING_MODULES.md** - Troubleshooting detail
- **QUICK_FIX_MODULES.md** - Quick fix commands

---

## 🚀 Quick Start

```bash
# Setup (sekali saja)
pkg update && pkg upgrade -y
pkg install nodejs -y
cd /storage/emulated/0/AnimeStream
npm install --legacy-peer-deps

# Start server
bash start-android.sh
```

Buka browser: **http://localhost:3000**

---

## ❌ Quick Fix

```bash
# Module error
npm install --legacy-peer-deps

# Port error
lsof -ti:3000 | xargs kill -9

# Node not found
pkg install nodejs -y
```

---

## 📖 Baca Berdasarkan Kebutuhan

### Baru Install Termux?
→ **TERMUX_SIMPLE.md**

### Sudah Install, Mau Run Server?
→ **TERMUX_README.txt** atau **TERMUX_SUMMARY.md**

### Ada Error?
→ **README_ERRORS.md**

### Butuh Tips & Tricks?
→ **TERMUX_GUIDE.md**

### Mau Lihat Semua Dokumentasi?
→ **DOCS_INDEX.md**

---

## 🎯 Command Paling Sering Dipakai

```bash
# Masuk folder
cd /storage/emulated/0/AnimeStream

# Start server
bash start-android.sh

# Stop server
bash stop-android.sh
# atau: Volume Down + C

# Install dependencies
npm install --legacy-peer-deps

# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Cek Node.js
node --version
npm --version
```

---

**© 2026 AnimeStream - Termux Edition**
