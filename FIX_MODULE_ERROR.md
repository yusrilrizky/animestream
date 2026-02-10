# 🔧 Fix: Module Not Found Error

Panduan mengatasi error "Cannot find module" di Android/Acode.

---

## ❌ Error yang Muncul

```
Error: Cannot find module 'express'
Error: Cannot find module 'better-sqlite3'
Error: Cannot find module 'bcryptjs'
```

---

## ✅ Solusi Lengkap

### **Step 1: Pastikan di Folder yang Benar**

Di Termux, ketik:
```bash
pwd
```

Harus menunjukkan path ke folder AnimeStream, contoh:
```
/data/data/com.termux/files/home/storage/shared/AnimeStream
```

Jika salah, navigate ke folder yang benar:
```bash
cd ~/storage/shared/AnimeStream
```

Atau:
```bash
cd /storage/emulated/0/AnimeStream
```

---

### **Step 2: Cek Apakah package.json Ada**

```bash
ls -la package.json
```

Jika ada, lanjut ke step 3.
Jika tidak ada, berarti folder salah!

---

### **Step 3: Install Dependencies**

```bash
npm install
```

**Tunggu 3-5 menit** sampai selesai.

Jika error, coba:
```bash
npm install --legacy-peer-deps
```

Atau:
```bash
npm install --force
```

---

### **Step 4: Verifikasi Instalasi**

Cek apakah folder `node_modules` sudah ada:
```bash
ls -la node_modules
```

Harus ada banyak folder di dalamnya.

---

### **Step 5: Jalankan Server**

```bash
node server.js
```

Seharusnya sekarang jalan tanpa error!

---

## 🔍 Troubleshooting Detail

### Error: npm command not found

**Penyebab:** Node.js belum terinstall

**Solusi:**
```bash
pkg install nodejs
```

Verifikasi:
```bash
node --version
npm --version
```

---

### Error: EACCES permission denied

**Penyebab:** Permission folder

**Solusi:**
```bash
chmod -R 755 .
```

Atau pindahkan project ke folder lain:
```bash
cp -r /storage/emulated/0/AnimeStream ~/AnimeStream
cd ~/AnimeStream
npm install
```

---

### Error: network timeout

**Penyebab:** Koneksi internet lambat

**Solusi:**
```bash
# Gunakan registry mirror
npm config set registry https://registry.npmmirror.com
npm install

# Atau increase timeout
npm install --timeout=60000
```

---

### Error: Cannot find module 'better-sqlite3'

**Penyebab:** Module native perlu compile

**Solusi:**
```bash
# Install build tools
pkg install python make clang

# Install better-sqlite3
npm install better-sqlite3 --build-from-source

# Install semua dependencies
npm install
```

---

### Error: gyp ERR! (untuk better-sqlite3)

**Penyebab:** Build tools tidak lengkap

**Solusi Lengkap:**
```bash
# 1. Install semua build tools
pkg install python make clang binutils

# 2. Set environment
export CC=clang
export CXX=clang++

# 3. Install better-sqlite3
npm install better-sqlite3 --build-from-source

# 4. Install dependencies lainnya
npm install
```

---

### Error: node_modules tidak ada setelah npm install

**Penyebab:** npm install gagal tapi tidak ada error message

**Solusi:**
```bash
# Clear cache
npm cache clean --force

# Remove package-lock
rm -f package-lock.json

# Install lagi
npm install --verbose
```

---

## 🚀 Script Auto-Fix

Buat file `fix-modules.sh`:

```bash
#!/bin/bash

echo "🔧 Fixing module errors..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    pkg install nodejs -y
fi

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    echo "Please run this from AnimeStream directory"
    exit 1
fi

# Remove old installations
echo "Cleaning old installations..."
rm -rf node_modules
rm -f package-lock.json

# Install build tools for better-sqlite3
echo "Installing build tools..."
pkg install python make clang binutils -y

# Set environment
export CC=clang
export CXX=clang++

# Install dependencies
echo "Installing dependencies..."
npm install --verbose

# Check if successful
if [ -d "node_modules" ]; then
    echo ""
    echo "✅ Modules installed successfully!"
    echo ""
    echo "Now you can run:"
    echo "  node server.js"
else
    echo ""
    echo "❌ Installation failed!"
    echo "Please check the error messages above"
fi
```

**Jalankan:**
```bash
bash fix-modules.sh
```

---

## 📋 Checklist Instalasi

Pastikan semua ini sudah dilakukan:

- [ ] Node.js terinstall (`node --version`)
- [ ] npm terinstall (`npm --version`)
- [ ] Di folder yang benar (`pwd` menunjukkan path AnimeStream)
- [ ] File `package.json` ada (`ls package.json`)
- [ ] Internet connection aktif
- [ ] Build tools terinstall (untuk better-sqlite3)
- [ ] `npm install` berhasil tanpa error
- [ ] Folder `node_modules` ada dan berisi banyak folder
- [ ] File `package-lock.json` terbuat

---

## 🎯 Instalasi Manual (Jika npm install gagal)

Install satu per satu:

```bash
# Core dependencies
npm install express
npm install ejs
npm install body-parser
npm install express-session
npm install multer
npm install dotenv

# Authentication
npm install bcryptjs
npm install passport
npm install passport-google-oauth20
npm install passport-facebook

# Email
npm install nodemailer
npm install @sendgrid/mail

# Database (yang sering bermasalah)
pkg install python make clang binutils
export CC=clang
export CXX=clang++
npm install better-sqlite3 --build-from-source
```

---

## 💡 Alternative: Gunakan Pre-built Binary

Jika `better-sqlite3` tetap error, gunakan alternative:

### Opsi 1: Gunakan sqlite3 (bukan better-sqlite3)

Edit `package.json`:
```json
{
  "dependencies": {
    "sqlite3": "^5.1.6"
  }
}
```

Lalu edit `database.js` untuk menggunakan sqlite3 biasa.

### Opsi 2: Download pre-built binary

```bash
# Download pre-built better-sqlite3 untuk Android
npm install better-sqlite3 --build-from-source --target_arch=arm64
```

---

## 🔄 Reset Total (Last Resort)

Jika semua cara gagal:

```bash
# 1. Backup database
cp animestream.db animestream.db.backup

# 2. Remove everything
rm -rf node_modules
rm -f package-lock.json

# 3. Update npm
npm install -g npm@latest

# 4. Clear cache
npm cache clean --force

# 5. Reinstall Node.js
pkg uninstall nodejs
pkg install nodejs

# 6. Install dependencies
npm install --legacy-peer-deps

# 7. Restore database
cp animestream.db.backup animestream.db
```

---

## 📱 Verifikasi Instalasi Berhasil

Setelah `npm install`, cek:

```bash
# 1. Folder node_modules ada
ls node_modules | wc -l
# Harus ada 50+ folders

# 2. Module penting ada
ls node_modules/express
ls node_modules/better-sqlite3
ls node_modules/bcryptjs

# 3. Test import
node -e "require('express')"
# Tidak ada error = berhasil

# 4. Test server
node server.js
# Harus muncul "Server running on port 3000"
```

---

## 🎉 Setelah Berhasil

Jika sudah tidak ada error "module not found":

```bash
# Start server
node server.js

# Atau gunakan script
npm start

# Atau gunakan helper
bash start-android.sh
```

**Akses:** `http://localhost:3000`

---

## 📞 Masih Error?

### Cek Log Detail:
```bash
npm install --verbose 2>&1 | tee install.log
cat install.log
```

### Cek Module Specific:
```bash
npm list express
npm list better-sqlite3
npm list bcryptjs
```

### Test Individual Module:
```bash
node -e "console.log(require('express'))"
node -e "console.log(require('better-sqlite3'))"
```

---

## 🔑 Key Points

1. **Selalu di folder yang benar** - `cd ~/storage/shared/AnimeStream`
2. **npm install harus berhasil** - Tunggu sampai selesai
3. **better-sqlite3 perlu build tools** - Install python, make, clang
4. **Cek node_modules ada** - `ls node_modules`
5. **Test sebelum run** - `node -e "require('express')"`

---

Dibuat untuk AnimeStream © 2026
