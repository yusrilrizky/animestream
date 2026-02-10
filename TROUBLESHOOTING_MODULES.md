# 🔧 Troubleshooting: Module Not Found & Port Errors

## ❌ Error 1: "Module Not Found"

### Penyebab:
- `node_modules` belum terinstall
- Instalasi module tidak lengkap
- Versi Node.js tidak kompatibel

### Solusi:

#### Windows (PC):
```bash
# Hapus node_modules dan package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Install ulang dengan flag legacy
npm install --legacy-peer-deps
```

#### Android/Termux:
```bash
# Hapus node_modules
rm -rf node_modules package-lock.json

# Install ulang
npm install --legacy-peer-deps
```

#### Acode Terminal:
```bash
# Pastikan Node.js sudah terinstall di Termux dulu!
# Buka Termux, jalankan: pkg install nodejs

# Di Acode Terminal:
cd /storage/emulated/0/AnimeStream
npm install --legacy-peer-deps
```

---

## ❌ Error 2: "EADDRINUSE: Port 3000 Already in Use"

### Penyebab:
Server sudah jalan di background dan belum di-stop

### Solusi:

#### Windows (PC):

**Cara 1: Gunakan Script**
```bash
# Double click file ini:
stop-server.bat
```

**Cara 2: Manual**
```bash
# Cari process yang pakai port 3000
netstat -ano | findstr :3000

# Kill process (ganti 1234 dengan PID yang muncul)
taskkill /F /PID 1234
```

**Cara 3: Kill Semua Node**
```bash
taskkill /F /IM node.exe
```

#### Android/Termux:
```bash
# Cari process
lsof -ti:3000

# Kill process
lsof -ti:3000 | xargs kill -9

# Atau gunakan script
bash stop-android.sh
```

#### Acode Terminal:
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9

# Atau restart Termux
```

---

## ❌ Error 3: "Cannot Find Module 'better-sqlite3'"

### Penyebab:
Module `better-sqlite3` perlu di-compile untuk sistem operasi Anda

### Solusi:

#### Windows:
```bash
# Install build tools (sekali saja)
npm install --global windows-build-tools

# Install ulang better-sqlite3
npm install better-sqlite3 --build-from-source
```

#### Android/Termux:
```bash
# Install dependencies
pkg install python build-essential

# Install ulang
npm install better-sqlite3 --build-from-source
```

---

## ✅ Cara Start Server yang Benar

### Windows:
```bash
# Cara 1: Double click
start-server.bat

# Cara 2: Command
node server.js
```

### Android/Termux:
```bash
# Cara 1: Gunakan script
bash start-android.sh

# Cara 2: Manual
node server.js
```

### Acode Terminal:
```bash
# Pastikan di folder project
cd /storage/emulated/0/AnimeStream

# Jalankan
node server.js
```

---

## 🔍 Cek Status Server

### Windows:
```bash
# Cek apakah server jalan
netstat -ano | findstr :3000

# Jika ada output, server sedang jalan
```

### Android/Termux:
```bash
# Cek port 3000
lsof -i:3000

# Atau
netstat -tulpn | grep :3000
```

---

## 📱 Akses Server

Setelah server jalan, buka browser:

- **Local**: http://localhost:3000
- **Network** (dari HP lain): http://[IP-ADDRESS]:3000

**Login Default:**
- Username: `admin`
- Password: `admin123`

---

## 🆘 Masih Error?

### Reset Total:

#### Windows:
```bash
# 1. Stop semua node
taskkill /F /IM node.exe

# 2. Hapus semua
rmdir /s /q node_modules
del package-lock.json
del animestream.db

# 3. Install ulang
npm install --legacy-peer-deps

# 4. Jalankan
node server.js
```

#### Android/Termux:
```bash
# 1. Stop server
lsof -ti:3000 | xargs kill -9

# 2. Hapus semua
rm -rf node_modules package-lock.json animestream.db

# 3. Install ulang
npm install --legacy-peer-deps

# 4. Jalankan
node server.js
```

---

## 📝 Tips

1. **Selalu gunakan `--legacy-peer-deps`** saat install
2. **Stop server dulu** sebelum start lagi
3. **Jangan tutup terminal** saat server jalan
4. **Gunakan Ctrl+C** untuk stop server dengan benar
5. **Cek port 3000** sebelum start server

---

## 🎯 Quick Commands

### Windows:
```bash
# Stop server
stop-server.bat

# Start server
start-server.bat

# Reinstall modules
npm install --legacy-peer-deps
```

### Android/Termux:
```bash
# Stop server
bash stop-android.sh

# Start server
bash start-android.sh

# Reinstall modules
npm install --legacy-peer-deps
```

---

**Dibuat: 2026**
**AnimeStream - Platform Streaming Anime Terbaik**
