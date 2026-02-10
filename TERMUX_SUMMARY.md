# 📱 Termux - Summary & Quick Reference

## ✅ Apa yang Sudah Dibuat

### 1. **Panduan Termux**
- ✅ **TERMUX_SIMPLE.md** - Panduan super simple (recommended untuk pemula)
- ✅ **TERMUX_GUIDE.md** - Panduan lengkap dengan tips & tricks
- ✅ **TERMUX_README.txt** - Quick reference text file

### 2. **Script untuk Termux**
- ✅ **start-android.sh** - Start server dengan auto-check port
- ✅ **stop-android.sh** - Stop server dengan mudah

### 3. **Dokumentasi Updated**
- ✅ **DOCS_INDEX.md** - Updated dengan panduan Termux
- ✅ **START_HERE.md** - Updated dengan link ke Termux guide

---

## 🚀 Cara Pakai (Copy-Paste)

### Setup Pertama Kali:
```bash
# 1. Update & Install Node.js
pkg update && pkg upgrade -y && pkg install nodejs -y

# 2. Masuk folder project
cd /storage/emulated/0/AnimeStream

# 3. Install dependencies
npm install --legacy-peer-deps
```

### Start Server:
```bash
bash start-android.sh
```

### Stop Server:
```bash
# Cara 1: Keyboard
Volume Down + C

# Cara 2: Script
bash stop-android.sh

# Cara 3: Manual
lsof -ti:3000 | xargs kill -9
```

---

## 📱 Akses Server

Buka browser di HP:
- **URL**: http://localhost:3000
- **Username**: admin
- **Password**: admin123

---

## ❌ Troubleshooting

### Error: "Module Not Found"
```bash
npm install --legacy-peer-deps
```

### Error: "Port Already in Use"
```bash
lsof -ti:3000 | xargs kill -9
bash start-android.sh
```

### Error: "Command Not Found: node"
```bash
pkg install nodejs -y
node --version
```

### Error: "Permission Denied"
```bash
chmod -R 777 .
npm install --legacy-peer-deps
```

---

## 🎯 File Penting untuk Termux

1. **TERMUX_SIMPLE.md** ⭐ - Baca ini dulu!
2. **TERMUX_GUIDE.md** - Panduan lengkap
3. **TERMUX_README.txt** - Quick reference
4. **start-android.sh** - Script start server
5. **stop-android.sh** - Script stop server

---

## 📚 Dokumentasi Lainnya

- **README_ERRORS.md** - Daftar error & solusi
- **TROUBLESHOOTING_MODULES.md** - Troubleshooting detail
- **QUICK_FIX_MODULES.md** - Quick fix commands
- **DOCS_INDEX.md** - Index semua dokumentasi

---

## 💡 Tips

### 1. Shortcut Command
Tambahkan alias di `~/.bashrc`:
```bash
alias anime-start="cd /storage/emulated/0/AnimeStream && bash start-android.sh"
alias anime-stop="cd /storage/emulated/0/AnimeStream && bash stop-android.sh"
```

### 2. Run di Background
```bash
# Install screen
pkg install screen

# Start server di background
screen -S anime
bash start-android.sh

# Detach: Ctrl+A lalu D
# Attach: screen -r anime
```

### 3. Auto-Start
Edit `~/.bashrc`:
```bash
cd /storage/emulated/0/AnimeStream
echo "🎬 AnimeStream - Run: bash start-android.sh"
```

---

## ✅ Checklist

Sebelum run server:
- [ ] Termux terinstall
- [ ] Node.js terinstall (`node --version`)
- [ ] Di folder project (`pwd`)
- [ ] Dependencies terinstall (`ls node_modules`)
- [ ] Port 3000 kosong

---

## 🎉 Success!

Jika berhasil, akan muncul:
```
✅ Database tables initialized
Server berjalan di http://localhost:3000
```

Buka browser: **http://localhost:3000**

---

**© 2026 AnimeStream**
**Dibuat khusus untuk Termux Android**
