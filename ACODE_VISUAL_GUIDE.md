# 📱 Panduan Visual: Menjalankan AnimeStream di Acode

Panduan step-by-step dengan instruksi visual untuk menjalankan server dari Acode.

---

## 🎯 Metode Termudah (Recommended)

### ✅ Step 1: Install Aplikasi

**Download & Install:**
1. **Termux** dari F-Droid
   - Buka browser → https://f-droid.org/packages/com.termux/
   - Download & Install
   
2. **Acode** dari Play Store
   - Buka Play Store
   - Cari "Acode"
   - Install

---

### ✅ Step 2: Setup Termux (Sekali Saja)

**Buka Termux, ketik satu per satu:**

```bash
pkg update
```
Tekan Enter, tunggu selesai (1-2 menit)

```bash
pkg install nodejs
```
Tekan Enter, ketik `y` jika diminta, tunggu selesai (2-3 menit)

```bash
termux-setup-storage
```
Tekan Enter, izinkan akses storage saat popup muncul

**✅ Setup Termux selesai!**

---

### ✅ Step 3: Copy Project ke HP

**Opsi A: Download dari GitHub**
```bash
cd ~/storage/shared
git clone <repository-url> AnimeStream
cd AnimeStream
```

**Opsi B: Copy Manual**
1. Copy folder project ke `/storage/emulated/0/AnimeStream`
2. Di Termux:
```bash
cd ~/storage/shared/AnimeStream
```

---

### ✅ Step 4: Install Dependencies

Di Termux:
```bash
npm install
```

Tunggu 3-5 menit sampai selesai.

**✅ Dependencies terinstall!**

---

### ✅ Step 5: Jalankan Server

**Di Termux, ketik:**
```bash
sh run-acode.sh
```

Atau:
```bash
node server.js
```

**Lihat output:**
```
🚀 Starting AnimeStream server...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Access URLs:
   Local:   http://localhost:3000
   Network: http://192.168.1.100:3000

👤 Default Login:
   Username: admin
   Password: admin123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Server running on port 3000
```

**✅ Server berjalan!**

---

### ✅ Step 6: Akses di Browser

1. **Minimize Termux** (jangan close!)
2. **Buka Chrome** atau browser lain
3. **Ketik di address bar:**
   ```
   localhost:3000
   ```
4. **Tekan Enter**

**✅ Website terbuka!**

---

### ✅ Step 7: Login

**Di halaman login:**
- Username: `admin`
- Password: `admin123`
- Klik **Masuk**

**✅ Berhasil login!**

---

### ✅ Step 8: Edit Code (Opsional)

**Buka Acode:**
1. Tap menu (☰) kiri atas
2. Tap **Open Folder**
3. Navigate ke `AnimeStream`
4. Tap **Use this folder**

**Edit file:**
1. Tap file yang mau diedit (misal: `views/index-new.ejs`)
2. Edit code
3. Save (Ctrl+S atau auto-save)

**Restart server:**
1. Switch ke Termux
2. Tekan **Ctrl + C** (stop server)
3. Ketik `node server.js` (start lagi)
4. Refresh browser

**✅ Perubahan terlihat!**

---

## 🎬 Workflow Harian

### Setiap Kali Mau Jalankan:

**1. Buka Termux**
```
Tap icon Termux
```

**2. Navigate ke project**
```bash
cd ~/storage/shared/AnimeStream
```

**3. Start server**
```bash
node server.js
```

**4. Buka browser**
```
Chrome → localhost:3000
```

**5. Selesai!**
```
Mulai gunakan aplikasi
```

---

## 🔄 Edit & Test Workflow

### Saat Mau Edit Code:

**1. Buka Acode**
```
Tap icon Acode
Project sudah terbuka
```

**2. Edit file**
```
Tap file → Edit → Save
```

**3. Switch ke Termux**
```
Swipe dari bawah → Tap Termux
```

**4. Restart server**
```
Ctrl + C (stop)
node server.js (start)
```

**5. Refresh browser**
```
Swipe dari bawah → Tap Chrome
Pull down untuk refresh
```

**6. Lihat perubahan**
```
Perubahan code terlihat!
```

---

## 📱 Split Screen Mode (Advanced)

### Setup Split Screen:

**1. Buka Termux**
```
Start server: node server.js
```

**2. Buka Recent Apps**
```
Swipe up dari bawah (atau tombol recent)
```

**3. Drag Termux ke atas**
```
Tap & hold icon Termux
Drag ke "Split screen" atau atas layar
```

**4. Pilih Acode di bawah**
```
Tap Acode dari recent apps
```

**5. Adjust ukuran**
```
Drag garis tengah untuk resize
```

**Sekarang:**
- **Atas**: Termux (server running)
- **Bawah**: Acode (edit code)

**Workflow:**
```
Edit di Acode → Save → 
Tap Termux → Ctrl+C → node server.js →
Tap Chrome → Refresh
```

---

## 🎯 Keyboard Shortcuts

### Di Termux:
- **Ctrl + C**: Stop server
- **Ctrl + D**: Exit terminal
- **Ctrl + L**: Clear screen
- **Arrow Up**: Previous command
- **Tab**: Auto-complete

### Di Acode:
- **Ctrl + S**: Save file
- **Ctrl + F**: Find
- **Ctrl + H**: Replace
- **Ctrl + Z**: Undo
- **Ctrl + Y**: Redo

---

## 💡 Tips Penting

### 1. Jangan Close Termux!
```
❌ Jangan swipe close Termux
✅ Minimize saja (home button)
```

### 2. Server Harus Running
```
Cek di Termux:
Harus ada text "Server running on port 3000"
```

### 3. Akses Harus localhost:3000
```
✅ localhost:3000
✅ 127.0.0.1:3000
❌ localhost (tanpa :3000)
❌ 192.168.1.100 (tanpa :3000)
```

### 4. Restart Setelah Edit
```
Edit code → Save → Restart server
Jika tidak restart, perubahan tidak terlihat
```

### 5. Check Error di Termux
```
Jika website error, lihat error di Termux
Biasanya ada pesan error yang jelas
```

---

## 🐛 Troubleshooting Visual

### ❌ "Cannot GET /"

**Penyebab:** Server tidak jalan

**Solusi:**
```
1. Buka Termux
2. Cek apakah ada text "Server running"
3. Jika tidak, ketik: node server.js
```

---

### ❌ "This site can't be reached"

**Penyebab:** Salah URL atau server mati

**Solusi:**
```
1. Pastikan URL: localhost:3000 (ada :3000)
2. Cek Termux, server harus running
3. Restart server: Ctrl+C, node server.js
```

---

### ❌ "Port 3000 already in use"

**Penyebab:** Server sudah jalan di background

**Solusi:**
```
Di Termux:
pkill node
node server.js
```

---

### ❌ File tidak bisa diedit di Acode

**Penyebab:** Permission atau folder salah

**Solusi:**
```
1. Pastikan folder di /storage/emulated/0/
2. Buka Acode → Open Folder lagi
3. Pilih folder yang benar
```

---

### ❌ npm install error

**Penyebab:** Node.js belum terinstall atau internet

**Solusi:**
```
1. Cek Node.js: node --version
2. Jika error, install: pkg install nodejs
3. Cek internet, coba lagi
```

---

## 📊 Checklist Sebelum Mulai

### ✅ Persiapan:
- [ ] Termux terinstall
- [ ] Acode terinstall
- [ ] Node.js terinstall di Termux (`node --version`)
- [ ] Project sudah di storage HP
- [ ] Dependencies terinstall (`npm install`)

### ✅ Setiap Kali Run:
- [ ] Buka Termux
- [ ] cd ke folder project
- [ ] Jalankan: `node server.js`
- [ ] Lihat "Server running on port 3000"
- [ ] Buka browser: `localhost:3000`
- [ ] Login dengan admin/admin123

---

## 🎉 Selesai!

**Sekarang kamu bisa:**
- ✅ Jalankan server dari Termux
- ✅ Edit code di Acode
- ✅ Akses website di browser
- ✅ Upload anime
- ✅ Nonton anime
- ✅ Kelola dashboard

**Selamat coding! 🚀**

---

## 📞 Butuh Bantuan?

**Cek dokumentasi:**
- `README_ANDROID.md` - Quick start
- `ACODE_SETUP.md` - Setup detail
- `ANDROID_COMMANDS.md` - Command reference
- `ACODE_RUN_GUIDE.md` - Run guide

**Video tutorial:** (coming soon)

---

Dibuat untuk AnimeStream © 2026
