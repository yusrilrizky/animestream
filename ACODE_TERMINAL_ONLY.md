# 📱 Cara Menjalankan dari Terminal Acode Saja

Panduan lengkap menjalankan AnimeStream hanya menggunakan Acode (tanpa Termux).

---

## ⚠️ PENTING: Setup Awal (Sekali Saja)

Sebelum bisa run di Acode, **Node.js harus terinstall di sistem Android**. Ini hanya perlu dilakukan sekali.

### Opsi 1: Install Node.js via Termux (Recommended)

**Buka Termux sekali saja untuk install Node.js:**

```bash
pkg update
pkg install nodejs
```

Setelah ini, **Termux tidak perlu dibuka lagi**. Node.js sudah terinstall di sistem dan bisa diakses dari Acode.

### Opsi 2: Install Node.js via UserLAnd

Atau gunakan aplikasi UserLAnd untuk install Node.js.

---

## 🎯 Cara Menggunakan Terminal Acode

### Step 1: Buka Project di Acode

1. Buka aplikasi **Acode**
2. Tap menu (☰) di kiri atas
3. Tap **Open Folder**
4. Navigate ke folder **AnimeStream**
5. Tap **Use this folder**

### Step 2: Buka Terminal

1. Tap menu (☰) di kiri atas
2. Scroll ke bawah
3. Tap **Terminal** atau **Console**
4. Terminal akan muncul di bagian bawah

**Jika tidak ada menu Terminal:**
- Tap menu → **Settings**
- Cari **Terminal**
- Enable **Terminal**
- Restart Acode

### Step 3: Cek Node.js

Di terminal Acode, ketik:
```bash
node --version
```

Harus muncul versi Node.js (contoh: `v18.17.0`)

Jika muncul "command not found", berarti Node.js belum terinstall. Kembali ke setup awal.

### Step 4: Install Dependencies (Pertama Kali)

Di terminal Acode:
```bash
npm install
```

**Tunggu 3-5 menit** sampai selesai.

Jika error, coba:
```bash
npm install --legacy-peer-deps
```

### Step 5: Jalankan Server

Di terminal Acode:
```bash
node server.js
```

Harus muncul:
```
Server running on port 3000
```

### Step 6: Akses di Browser

1. **Minimize Acode** (jangan close!)
2. Buka **Chrome** atau browser lain
3. Ketik: `localhost:3000`
4. Login: `admin` / `admin123`

---

## 🔄 Workflow Harian (Hanya Acode)

### Setiap Kali Mau Jalankan:

**1. Buka Acode**
```
Tap icon Acode
```

**2. Open project (jika belum)**
```
Menu → Open Folder → AnimeStream
```

**3. Buka Terminal**
```
Menu → Terminal
```

**4. Jalankan server**
```bash
node server.js
```

**5. Minimize Acode**
```
Tekan tombol Home (jangan close!)
```

**6. Buka browser**
```
Chrome → localhost:3000
```

**7. Selesai!**
```
Gunakan aplikasi
```

---

## ✏️ Edit & Restart (Hanya Acode)

### Saat Mau Edit Code:

**1. Edit file di Acode**
```
Tap file → Edit → Save (Ctrl+S)
```

**2. Stop server**
```
Di terminal: Tekan Ctrl + C
```

**3. Start server lagi**
```bash
node server.js
```

**4. Refresh browser**
```
Chrome → Pull down untuk refresh
```

---

## 🎯 Commands di Terminal Acode

### Basic Commands:

```bash
# Lihat isi folder
ls

# Lihat detail
ls -la

# Cek lokasi
pwd

# Lihat file
cat package.json

# Clear screen
clear
```

### Server Commands:

```bash
# Start server
node server.js

# Start dengan npm
npm start

# Stop server
Ctrl + C

# Check Node version
node --version

# Check npm version
npm --version
```

### Install Commands:

```bash
# Install dependencies
npm install

# Install dengan legacy
npm install --legacy-peer-deps

# Install specific module
npm install express

# Clear cache
npm cache clean --force
```

### Database Commands:

```bash
# Initialize database
node database.js

# Reset admin
node reset-admin.js

# Backup database
cp animestream.db animestream.db.backup
```

---

## 🐛 Troubleshooting Terminal Acode

### Terminal Tidak Muncul

**Solusi:**
1. Update Acode ke versi terbaru
2. Settings → Terminal → Enable
3. Restart Acode
4. Jika masih tidak ada, gunakan Termux

### Command Not Found

**Solusi:**
```bash
# Cek apakah Node.js terinstall
which node

# Jika tidak ada, install via Termux:
# Buka Termux → pkg install nodejs
```

### npm install Error

**Solusi:**
```bash
# Clear cache
npm cache clean --force

# Remove old files
rm -rf node_modules
rm package-lock.json

# Install lagi
npm install --legacy-peer-deps
```

### Permission Denied

**Solusi:**
```bash
# Berikan permission
chmod -R 755 .
chmod 777 uploads
```

### Server Tidak Jalan

**Solusi:**
```bash
# Cek apakah dependencies terinstall
ls node_modules

# Jika kosong, install
npm install

# Test module
node -e "require('express')"

# Run server
node server.js
```

### Port Already in Use

**Solusi:**
```bash
# Kill process (jika ada)
pkill node

# Atau gunakan port lain
PORT=8080 node server.js
```

---

## 💡 Tips Terminal Acode

### 1. Keyboard Shortcuts

Di terminal Acode:
- **Ctrl + C**: Stop server
- **Ctrl + L**: Clear screen
- **Arrow Up**: Previous command
- **Tab**: Auto-complete

### 2. Copy Paste

- **Long press** di terminal untuk copy/paste
- Atau gunakan keyboard Acode

### 3. Multiple Commands

```bash
# Jalankan beberapa command sekaligus
npm install && node server.js
```

### 4. Background Running

**Tidak recommended di Acode terminal!**
Server akan stop jika terminal ditutup.

Untuk background, gunakan Termux.

### 5. View Logs

```bash
# Redirect output ke file
node server.js > server.log 2>&1

# View log di terminal lain
tail -f server.log
```

---

## 📋 Checklist Sebelum Run

- [ ] Acode terinstall
- [ ] Node.js terinstall di sistem (via Termux)
- [ ] Project folder sudah dibuka di Acode
- [ ] Terminal Acode bisa dibuka
- [ ] `node --version` berfungsi
- [ ] `npm install` sudah dijalankan
- [ ] Folder `node_modules` ada
- [ ] Folder `uploads` ada

---

## 🎬 Video Tutorial Steps

### First Time (5 menit):
```
1. Install Node.js via Termux (sekali saja)
   pkg install nodejs

2. Buka Acode
3. Open Folder → AnimeStream
4. Menu → Terminal
5. npm install (tunggu 3-5 menit)
6. node server.js
7. Browser → localhost:3000
```

### Daily Use (30 detik):
```
1. Buka Acode
2. Menu → Terminal
3. node server.js
4. Minimize Acode
5. Browser → localhost:3000
```

### Edit Code (1 menit):
```
1. Edit file di Acode
2. Save (Ctrl+S)
3. Terminal → Ctrl+C (stop)
4. node server.js (start)
5. Browser → Refresh
```

---

## ⚡ Quick Commands

### One-Line Start:
```bash
cd /storage/emulated/0/AnimeStream && node server.js
```

### One-Line Install & Start:
```bash
npm install && node server.js
```

### One-Line Fix & Start:
```bash
rm -rf node_modules && npm install && node server.js
```

---

## 🔧 Konfigurasi Terminal Acode

### Settings Recommended:

1. **Font Size**: 12-14
2. **Theme**: Dark (lebih nyaman)
3. **Auto-complete**: Enable
4. **Word wrap**: Enable

**Cara setting:**
- Menu → Settings → Terminal
- Adjust sesuai preferensi

---

## 📊 Comparison: Acode vs Termux

| Feature | Acode Terminal | Termux |
|---------|---------------|--------|
| Stability | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Easy to use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Background run | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Features | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Edit + Run | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation:**
- **Simple testing**: Acode Terminal ✅
- **Production/Long run**: Termux ✅
- **Best**: Split screen (Acode + Termux) ✅

---

## 🎯 Summary

### Untuk Run di Acode Terminal:

**Setup (Sekali):**
```bash
# Di Termux (sekali saja)
pkg install nodejs

# Di Acode Terminal (pertama kali)
npm install
```

**Daily Use:**
```bash
# Di Acode Terminal
node server.js

# Di Browser
localhost:3000
```

**Edit Code:**
```
Edit di Acode → Save → 
Ctrl+C di terminal → 
node server.js → 
Refresh browser
```

---

## ✅ Selesai!

Sekarang kamu bisa:
- ✅ Run server dari terminal Acode
- ✅ Edit code di Acode
- ✅ Test di browser
- ✅ Semua dalam satu aplikasi!

**Catatan:** Server akan stop jika Acode ditutup. Untuk background running, gunakan Termux.

---

Dibuat untuk AnimeStream © 2026
