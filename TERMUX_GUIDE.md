# 📱 Panduan Lengkap Run di Termux

## 🎯 Cara Tercepat (Recommended)

### Step 1: Install Termux
1. Download Termux dari F-Droid: https://f-droid.org/en/packages/com.termux/
2. Atau dari GitHub: https://github.com/termux/termux-app/releases
3. Install aplikasi

### Step 2: Setup Termux (Pertama Kali)
Buka Termux, lalu jalankan command ini satu per satu:

```bash
# Update package list
pkg update && pkg upgrade

# Install Node.js
pkg install nodejs

# Install Git (optional, untuk clone project)
pkg install git

# Cek instalasi
node --version
npm --version
```

### Step 3: Copy Project ke Termux

**Cara 1: Jika project sudah ada di HP**
```bash
# Pindah ke storage HP
cd /storage/emulated/0

# Masuk ke folder project (sesuaikan nama folder)
cd AnimeStream
# atau
cd ArtonNime
# atau
cd Downloads/AnimeStream
```

**Cara 2: Clone dari GitHub (jika ada)**
```bash
cd ~
git clone https://github.com/username/animestream.git
cd animestream
```

**Cara 3: Copy manual**
1. Copy folder project ke `/storage/emulated/0/AnimeStream`
2. Di Termux:
```bash
cd /storage/emulated/0/AnimeStream
```

### Step 4: Install Dependencies
```bash
# Install semua module yang dibutuhkan
npm install --legacy-peer-deps
```

Tunggu sampai selesai (bisa 2-5 menit tergantung koneksi).

### Step 5: Jalankan Server

**Cara 1: Gunakan Script (Recommended)**
```bash
bash start-android.sh
```

**Cara 2: Manual**
```bash
node server.js
```

### Step 6: Akses di Browser
1. Buka browser di HP (Chrome/Firefox)
2. Ketik: `http://localhost:3000`
3. Login:
   - Username: `admin`
   - Password: `admin123`

---

## 🎉 Selesai!

Jika berhasil, kamu akan lihat:
```
✅ Database tables initialized
Server berjalan di http://localhost:3000
```

---

## ❌ Troubleshooting

### Error: "Module Not Found"
```bash
npm install --legacy-peer-deps
```

### Error: "Port Already in Use"
```bash
# Stop server lama
lsof -ti:3000 | xargs kill -9

# Atau gunakan script
bash stop-android.sh

# Lalu start lagi
bash start-android.sh
```

### Error: "Permission Denied"
```bash
# Ubah permission folder
chmod -R 777 .

# Lalu install lagi
npm install --legacy-peer-deps
```

### Error: "Cannot Find Package"
```bash
# Update Termux
pkg update && pkg upgrade

# Install ulang Node.js
pkg install nodejs

# Install ulang dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Error: "Command Not Found: node"
```bash
# Install Node.js
pkg install nodejs

# Verify
node --version
npm --version
```

---

## 🔄 Stop Server

**Cara 1: Di Termux**
```bash
# Tekan Ctrl+C
# Atau tekan Volume Down + C
```

**Cara 2: Gunakan Script**
```bash
bash stop-android.sh
```

**Cara 3: Manual**
```bash
lsof -ti:3000 | xargs kill -9
```

---

## 📱 Akses dari HP Lain (Network)

### Step 1: Cari IP Address HP
```bash
# Di Termux
ifconfig | grep inet
```

Cari yang seperti: `192.168.x.x`

### Step 2: Akses dari HP Lain
Buka browser di HP lain, ketik:
```
http://192.168.x.x:3000
```
(Ganti `192.168.x.x` dengan IP yang kamu dapat)

**Catatan:** HP harus terhubung ke WiFi yang sama!

---

## 🚀 Tips & Tricks

### 1. Run Server di Background
```bash
# Install screen
pkg install screen

# Buat session baru
screen -S animestream

# Jalankan server
node server.js

# Detach (server tetap jalan)
# Tekan: Ctrl+A lalu D

# Attach kembali
screen -r animestream

# Kill session
screen -X -S animestream quit
```

### 2. Auto-Start saat Termux Dibuka
```bash
# Edit .bashrc
nano ~/.bashrc

# Tambahkan di akhir file:
cd /storage/emulated/0/AnimeStream
echo "🎬 AnimeStream Project"
echo "Run: bash start-android.sh"

# Save: Ctrl+X, Y, Enter
```

### 3. Shortcut Command
```bash
# Buat alias
nano ~/.bashrc

# Tambahkan:
alias anime-start="cd /storage/emulated/0/AnimeStream && bash start-android.sh"
alias anime-stop="cd /storage/emulated/0/AnimeStream && bash stop-android.sh"

# Save dan reload
source ~/.bashrc

# Sekarang bisa pakai:
anime-start
anime-stop
```

### 4. Cek Status Server
```bash
# Cek apakah server jalan
lsof -i:3000

# Atau
netstat -tulpn | grep :3000
```

---

## 📋 Command Reference

### Navigasi:
```bash
cd ~                              # Home directory
cd /storage/emulated/0            # Storage HP
cd /storage/emulated/0/AnimeStream # Project folder
ls                                # List files
pwd                               # Current directory
```

### Server:
```bash
bash start-android.sh             # Start server
bash stop-android.sh              # Stop server
node server.js                    # Start manual
lsof -ti:3000 | xargs kill -9    # Kill port 3000
```

### NPM:
```bash
npm install --legacy-peer-deps    # Install dependencies
npm list                          # List installed packages
rm -rf node_modules               # Remove node_modules
```

### Termux:
```bash
pkg update                        # Update package list
pkg upgrade                       # Upgrade packages
pkg install nodejs                # Install Node.js
pkg install git                   # Install Git
```

---

## 🎯 Quick Start (Copy-Paste)

Jalankan command ini satu per satu di Termux:

```bash
# 1. Update Termux
pkg update && pkg upgrade -y

# 2. Install Node.js
pkg install nodejs -y

# 3. Masuk ke folder project
cd /storage/emulated/0/AnimeStream

# 4. Install dependencies
npm install --legacy-peer-deps

# 5. Start server
bash start-android.sh
```

Lalu buka browser: **http://localhost:3000**

---

## 🆘 Masih Bermasalah?

### Reset Total:
```bash
# 1. Stop server
lsof -ti:3000 | xargs kill -9

# 2. Hapus semua
rm -rf node_modules package-lock.json animestream.db

# 3. Install ulang
npm install --legacy-peer-deps

# 4. Start server
bash start-android.sh
```

### Reinstall Node.js:
```bash
# Uninstall
pkg uninstall nodejs

# Install ulang
pkg install nodejs

# Verify
node --version
npm --version
```

---

## 📚 Dokumentasi Lainnya

- **START_HERE.md** - Quick start guide
- **README_ERRORS.md** - Daftar error & solusi
- **TROUBLESHOOTING_MODULES.md** - Troubleshooting detail
- **ACODE_TERMINAL_ONLY.md** - Run di Acode Terminal

---

## ✅ Checklist

Sebelum run server, pastikan:
- [ ] Termux sudah terinstall
- [ ] Node.js sudah terinstall (`node --version`)
- [ ] Sudah di folder project (`pwd`)
- [ ] node_modules sudah ada (`ls node_modules`)
- [ ] Port 3000 kosong (tidak ada server lain)

---

**© 2026 AnimeStream - Platform Streaming Anime Terbaik**
**Dibuat khusus untuk Termux Android**
