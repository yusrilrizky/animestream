# ⚠️ Common Errors & Solutions

## 1️⃣ Module Not Found

**Error:**
```
Error: Cannot find module 'express'
Error: Cannot find module 'better-sqlite3'
```

**Solution:**
```bash
npm install --legacy-peer-deps
```

---

## 2️⃣ Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution Windows:**
```bash
# Cara 1: Gunakan script
stop-server.bat

# Cara 2: Manual
taskkill /F /IM node.exe
```

**Solution Android/Termux:**
```bash
# Cara 1: Gunakan script
bash stop-android.sh

# Cara 2: Manual
lsof -ti:3000 | xargs kill -9
```

---

## 3️⃣ Database Error

**Error:**
```
Error: SQLITE_ERROR: no such table: users
```

**Solution:**
```bash
# Hapus database lama
rm animestream.db  # Linux/Android
del animestream.db  # Windows

# Jalankan ulang server (akan auto-create database baru)
node server.js
```

---

## 4️⃣ Permission Denied

**Error:**
```
Error: EACCES: permission denied
```

**Solution Android/Termux:**
```bash
# Ubah permission folder
chmod -R 777 .

# Atau install dengan sudo
sudo npm install --legacy-peer-deps
```

**Solution Windows:**
```bash
# Run Command Prompt as Administrator
# Lalu jalankan:
npm install --legacy-peer-deps
```

---

## 5️⃣ Node.js Not Found

**Error:**
```
'node' is not recognized as an internal or external command
```

**Solution Windows:**
1. Download Node.js: https://nodejs.org
2. Install dengan "Add to PATH" dicentang
3. Restart Command Prompt
4. Test: `node --version`

**Solution Android/Termux:**
```bash
# Install Node.js
pkg install nodejs

# Verify
node --version
npm --version
```

---

## 6️⃣ Cannot Start Server

**Checklist:**
- [ ] Node.js terinstall? (`node --version`)
- [ ] npm terinstall? (`npm --version`)
- [ ] node_modules ada? (folder `node_modules` harus ada)
- [ ] Port 3000 kosong? (tidak ada server lain yang jalan)
- [ ] Di folder yang benar? (ada file `server.js`)

**Fix:**
```bash
# 1. Cek Node.js
node --version

# 2. Install modules
npm install --legacy-peer-deps

# 3. Stop server lama
taskkill /F /IM node.exe  # Windows
lsof -ti:3000 | xargs kill -9  # Linux/Android

# 4. Start server
node server.js
```

---

## 🆘 Nuclear Option (Reset Everything)

Jika semua cara di atas gagal:

### Windows:
```bash
# 1. Stop all
taskkill /F /IM node.exe

# 2. Delete everything
rmdir /s /q node_modules
del package-lock.json
del animestream.db

# 3. Reinstall
npm install --legacy-peer-deps

# 4. Start fresh
node server.js
```

### Android/Termux:
```bash
# 1. Stop all
lsof -ti:3000 | xargs kill -9

# 2. Delete everything
rm -rf node_modules package-lock.json animestream.db

# 3. Reinstall
npm install --legacy-peer-deps

# 4. Start fresh
node server.js
```

---

## ✅ Success Indicators

Server berhasil jalan jika muncul:
```
✅ Database tables initialized
Server berjalan di http://localhost:3000
```

Lalu buka browser: **http://localhost:3000**

Login:
- Username: `admin`
- Password: `admin123`

---

## 📚 More Help

- **Quick Fix**: `QUICK_FIX_MODULES.md`
- **Detailed Troubleshooting**: `TROUBLESHOOTING_MODULES.md`
- **Android Setup**: `ACODE_TERMINAL_ONLY.md`
- **Quick Start**: `START_HERE.md`

---

**© 2026 AnimeStream**
