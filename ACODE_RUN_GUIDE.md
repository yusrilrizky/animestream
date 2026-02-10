# 🎯 Cara Menjalankan Server dari Acode

Panduan lengkap menjalankan AnimeStream langsung dari aplikasi Acode di Android.

---

## 📱 Metode 1: Menggunakan Terminal Acode (Recommended)

### Step 1: Buka Project di Acode

1. Buka aplikasi **Acode**
2. Tap menu (☰) di kiri atas
3. Pilih **Open Folder**
4. Navigate ke folder project AnimeStream
5. Tap **Use this folder**

### Step 2: Buka Terminal di Acode

1. Tap menu (☰) di kiri atas
2. Scroll ke bawah
3. Pilih **Terminal** atau **Console**
4. Terminal akan muncul di bawah

### Step 3: Install Dependencies (Pertama Kali)

Di terminal Acode, ketik:
```bash
npm install
```

Tunggu sampai selesai (bisa 2-5 menit).

### Step 4: Setup Environment (Pertama Kali)

```bash
cp .env.example .env
```

### Step 5: Jalankan Server

```bash
node server.js
```

Atau:
```bash
npm start
```

### Step 6: Akses Aplikasi

1. Buka **Chrome** atau browser lain di HP
2. Ketik di address bar: `http://localhost:3000`
3. Login dengan:
   - Username: `admin`
   - Password: `admin123`

### Step 7: Stop Server

Di terminal Acode:
- Tekan **Ctrl + C** (biasanya ada tombol di keyboard Acode)
- Atau close terminal

---

## 📱 Metode 2: Menggunakan Termux (Lebih Stabil)

### Step 1: Install Termux

Download dari [F-Droid](https://f-droid.org/packages/com.termux/)

### Step 2: Setup Termux

Buka Termux, ketik:
```bash
pkg update && pkg upgrade
pkg install nodejs
termux-setup-storage
```

### Step 3: Navigate ke Project

```bash
cd ~/storage/shared/AnimeStream
```

Atau jika project di folder lain:
```bash
cd ~/storage/shared/Download/AnimeStream
```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Jalankan Server

```bash
npm run android
```

Atau:
```bash
node server.js
```

### Step 6: Edit di Acode, Run di Termux

1. **Edit code** di Acode (syntax highlighting, autocomplete)
2. **Save** file (auto-save biasanya aktif)
3. **Restart server** di Termux:
   - Tekan `Ctrl + C` untuk stop
   - Ketik `node server.js` untuk start lagi

---

## 🔧 Konfigurasi Acode

### 1. Enable Terminal

1. Buka Acode
2. Tap menu (☰) → **Settings**
3. Scroll ke **Terminal**
4. Enable **Terminal**
5. Set **Shell**: `/system/bin/sh` atau `/data/data/com.termux/files/usr/bin/bash`

### 2. Keyboard Shortcuts

Di terminal Acode:
- **Ctrl + C**: Stop server
- **Ctrl + D**: Exit terminal
- **Ctrl + L**: Clear screen
- **Arrow Up**: Previous command

### 3. Font Size

Settings → Editor → Font Size → Sesuaikan (12-16 recommended)

---

## 🎯 Workflow Recommended

### Opsi A: Acode Terminal (Simple)

```
1. Buka Acode
2. Open project folder
3. Buka terminal (menu → Terminal)
4. Ketik: node server.js
5. Buka browser: localhost:3000
6. Edit code di Acode
7. Save → Restart server (Ctrl+C, node server.js)
```

### Opsi B: Acode + Termux (Stable)

```
1. Buka Termux
2. cd ~/storage/shared/AnimeStream
3. node server.js
4. Minimize Termux (jangan close!)
5. Buka Acode
6. Edit code
7. Save
8. Switch ke Termux
9. Restart server (Ctrl+C, node server.js)
```

### Opsi C: Split Screen (Best)

```
1. Enable split screen di Android
2. Atas: Acode (untuk edit)
3. Bawah: Termux (untuk run server)
4. Edit di Acode → Save → Restart di Termux
```

---

## 📝 Commands di Acode Terminal

### Basic Commands

```bash
# List files
ls -la

# Change directory
cd folder-name

# View file
cat file.txt

# Edit file (jika ada nano)
nano .env

# Check Node version
node --version

# Check npm version
npm --version
```

### Server Commands

```bash
# Start server
node server.js

# Start with npm
npm start

# Start in background (tidak recommended di Acode)
nohup node server.js &

# Stop server
# Tekan Ctrl + C

# Check if server running
ps aux | grep node

# Kill server
pkill node
```

### Database Commands

```bash
# Initialize database
node database.js

# Reset admin
node reset-admin.js

# Backup database
cp animestream.db animestream.db.backup

# View database
sqlite3 animestream.db
```

---

## 🐛 Troubleshooting Acode

### Terminal Tidak Muncul

**Solusi:**
1. Update Acode ke versi terbaru
2. Settings → Terminal → Enable
3. Restart Acode
4. Jika masih tidak ada, gunakan Termux

### Command Not Found

**Solusi:**
```bash
# Install Node.js di Termux dulu
pkg install nodejs

# Lalu gunakan Termux untuk run server
```

### Permission Denied

**Solusi:**
```bash
chmod +x start-android.sh
chmod 777 uploads
```

### Cannot Write File

**Solusi:**
1. Pastikan folder tidak read-only
2. Pindahkan project ke `/storage/emulated/0/AnimeStream`
3. Berikan permission storage ke Acode

### Server Tidak Jalan

**Solusi:**
1. Cek apakah Node.js terinstall: `node --version`
2. Cek apakah dependencies terinstall: `ls node_modules`
3. Install dependencies: `npm install`
4. Cek error di terminal

---

## 💡 Tips & Tricks

### 1. Auto-Restart Server

Install nodemon (di Termux):
```bash
npm install -g nodemon
```

Jalankan dengan nodemon:
```bash
nodemon server.js
```

Server akan auto-restart saat file berubah!

### 2. View Logs

```bash
# Real-time logs
tail -f server.log

# Last 50 lines
tail -n 50 server.log

# Search in logs
grep "error" server.log
```

### 3. Quick Restart

Buat alias di Termux (`~/.bashrc`):
```bash
alias restart="pkill node && node server.js"
```

Gunakan:
```bash
restart
```

### 4. Background Running

Di Termux (bukan Acode terminal):
```bash
nohup node server.js > server.log 2>&1 &
```

Cek process:
```bash
ps aux | grep node
```

Stop:
```bash
pkill node
```

---

## 🌐 Akses dari HP Lain

### 1. Cek IP Address

Di terminal:
```bash
ifconfig | grep "inet "
```

Atau:
```bash
ip addr show
```

Contoh output: `192.168.1.100`

### 2. Update .env

Edit `.env` di Acode:
```env
BASE_URL=http://192.168.1.100:3000
```

### 3. Akses dari HP Lain

Di browser HP lain (dalam WiFi yang sama):
```
http://192.168.1.100:3000
```

---

## 📱 Acode Plugins (Opsional)

### Recommended Plugins:

1. **Terminal** - Built-in terminal
2. **Git** - Git integration
3. **Prettier** - Code formatter
4. **ESLint** - JavaScript linter
5. **Live Server** - Preview HTML

Install dari: Menu → Plugins

---

## 🎬 Video Tutorial (Steps)

### 1. First Time Setup (5 menit)
```
1. Install Acode & Termux
2. Setup Termux (pkg install nodejs)
3. Copy project ke storage
4. Open folder di Acode
5. npm install di terminal
```

### 2. Daily Workflow (30 detik)
```
1. Buka Termux
2. cd ~/storage/shared/AnimeStream
3. node server.js
4. Buka browser: localhost:3000
5. Edit di Acode jika perlu
```

### 3. Edit & Restart (10 detik)
```
1. Edit file di Acode
2. Save (Ctrl+S)
3. Switch ke Termux
4. Ctrl+C (stop)
5. node server.js (start)
```

---

## 📊 Comparison

| Feature | Acode Terminal | Termux |
|---------|---------------|--------|
| Stability | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Speed | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Features | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Easy to use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Background run | ⭐⭐ | ⭐⭐⭐⭐⭐ |

**Recommendation:** 
- **Pemula**: Gunakan Acode Terminal
- **Advanced**: Gunakan Termux
- **Best**: Split screen (Acode + Termux)

---

## 🎯 Quick Reference

### Start Server (Acode Terminal)
```bash
node server.js
```

### Start Server (Termux)
```bash
cd ~/storage/shared/AnimeStream
npm run android
```

### Stop Server
```
Ctrl + C
```

### Restart Server
```bash
Ctrl + C
node server.js
```

### Check Status
```bash
curl http://localhost:3000
```

### View Logs
```bash
tail -f server.log
```

---

## 📞 Help

### Acode Support
- Website: https://acode.app
- GitHub: https://github.com/deadlyjack/Acode

### Termux Support
- Website: https://termux.dev
- Wiki: https://wiki.termux.com

### AnimeStream Support
- Check: `README_ANDROID.md`
- Commands: `ANDROID_COMMANDS.md`

---

## ✅ Checklist

Sebelum run server, pastikan:

- [ ] Node.js terinstall (`node --version`)
- [ ] Dependencies terinstall (`ls node_modules`)
- [ ] File `.env` sudah ada
- [ ] Folder `uploads` sudah ada
- [ ] Port 3000 tidak digunakan
- [ ] Storage permission diberikan

---

## 🎉 Selesai!

Sekarang kamu bisa:
- ✅ Edit code di Acode
- ✅ Run server dari Acode terminal
- ✅ Atau run server dari Termux (lebih stabil)
- ✅ Akses di browser: `localhost:3000`
- ✅ Edit → Save → Restart → Test

**Happy Coding! 🚀**

---

Dibuat untuk AnimeStream © 2026
