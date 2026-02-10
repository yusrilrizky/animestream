# 📱 Panduan Menjalankan AnimeStream di Acode (Android)

## 📋 Persyaratan

### 1. Install Aplikasi yang Diperlukan:
- **Acode** - Code editor untuk Android
- **Termux** - Terminal emulator untuk Android
- **Chrome/Browser** - Untuk mengakses aplikasi

### Download:
- Acode: [Google Play Store](https://play.google.com/store/apps/details?id=com.foxdebug.acode)
- Termux: [F-Droid](https://f-droid.org/packages/com.termux/) atau [GitHub](https://github.com/termux/termux-app/releases)

---

## 🚀 Langkah-Langkah Setup

### Step 1: Setup Termux

1. Buka **Termux**
2. Update package list:
```bash
pkg update && pkg upgrade
```

3. Install Node.js:
```bash
pkg install nodejs
```

4. Install Git (opsional, jika clone dari GitHub):
```bash
pkg install git
```

5. Verifikasi instalasi:
```bash
node --version
npm --version
```

### Step 2: Setup Storage Access

1. Berikan akses storage ke Termux:
```bash
termux-setup-storage
```

2. Izinkan akses saat diminta

### Step 3: Copy Project ke Termux

**Opsi A: Jika project di storage internal**
```bash
cd ~/storage/shared/AnimeStream
```

**Opsi B: Clone dari GitHub**
```bash
cd ~
git clone <repository-url>
cd AnimeStream
```

**Opsi C: Copy manual**
1. Copy folder project ke `/storage/emulated/0/AnimeStream`
2. Di Termux:
```bash
cd ~/storage/shared/AnimeStream
```

### Step 4: Install Dependencies

```bash
npm install
```

Jika ada error, coba:
```bash
npm install --legacy-peer-deps
```

### Step 5: Setup Environment

1. Copy file `.env.example` ke `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` menggunakan nano:
```bash
nano .env
```

3. Isi konfigurasi minimal:
```env
PORT=3000
SESSION_SECRET=animestream-secret-key-2024
BASE_URL=http://localhost:3000

# Email (opsional untuk testing)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# OAuth (opsional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

4. Save: `Ctrl + X`, lalu `Y`, lalu `Enter`

### Step 6: Inisialisasi Database

```bash
node database.js
```

Atau langsung jalankan server (database akan otomatis terinisialisasi):

### Step 7: Jalankan Server

```bash
node server.js
```

Atau gunakan npm:
```bash
npm start
```

### Step 8: Akses Aplikasi

1. Buka browser di HP
2. Akses: `http://localhost:3000`
3. Login dengan:
   - Username: `admin`
   - Password: `admin123`

---

## 🔧 Konfigurasi Acode

### 1. Buka Project di Acode

1. Buka **Acode**
2. Tap menu (☰) → **Open Folder**
3. Pilih folder project AnimeStream
4. Folder akan terbuka di Acode

### 2. Edit File di Acode

- Tap file untuk membuka
- Edit seperti biasa
- Auto-save aktif (atau tap Save icon)

### 3. Jalankan Server dari Acode

**Opsi A: Menggunakan Terminal Acode**
1. Tap menu (☰) → **Terminal**
2. Jalankan:
```bash
node server.js
```

**Opsi B: Menggunakan Termux (Recommended)**
1. Buka Termux
2. Navigate ke project:
```bash
cd ~/storage/shared/AnimeStream
```
3. Jalankan:
```bash
node server.js
```

---

## 📱 Tips untuk Android

### 1. Keep Screen On
Agar server tetap jalan, jangan lock HP atau:
- Install **Termux:Boot** untuk auto-start
- Gunakan **Termux:Widget** untuk shortcut

### 2. Background Running
Untuk menjalankan server di background:
```bash
nohup node server.js > server.log 2>&1 &
```

Cek log:
```bash
tail -f server.log
```

Stop server:
```bash
pkill node
```

### 3. Port Alternatif
Jika port 3000 sudah digunakan, ubah di `.env`:
```env
PORT=8080
```

Akses: `http://localhost:8080`

### 4. Akses dari HP Lain (Local Network)

1. Cek IP HP:
```bash
ifconfig
```

2. Cari IP address (contoh: 192.168.1.100)

3. Update `.env`:
```env
BASE_URL=http://192.168.1.100:3000
```

4. Akses dari HP lain di jaringan yang sama:
```
http://192.168.1.100:3000
```

---

## 🐛 Troubleshooting

### Error: Cannot find module

**Solusi:**
```bash
npm install
```

### Error: EACCES permission denied

**Solusi:**
```bash
chmod -R 755 .
```

### Error: Port already in use

**Solusi:**
```bash
# Cari process yang menggunakan port
lsof -i :3000

# Kill process
kill -9 <PID>

# Atau gunakan port lain
PORT=8080 node server.js
```

### Database locked

**Solusi:**
```bash
# Hapus lock file
rm animestream.db-journal

# Restart server
node server.js
```

### Upload folder permission

**Solusi:**
```bash
mkdir -p uploads
chmod 777 uploads
```

---

## 📦 Package.json untuk Android

Pastikan `package.json` memiliki scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js",
    "init-db": "node database.js",
    "reset-admin": "node reset-admin.js",
    "test-email": "node test-email.js"
  }
}
```

---

## 🔄 Update Project

### Pull changes dari Git:
```bash
cd ~/storage/shared/AnimeStream
git pull origin main
npm install
```

### Backup database:
```bash
cp animestream.db animestream.db.backup
```

---

## 🌐 Akses dari Internet (Ngrok)

### 1. Install Ngrok di Termux:
```bash
pkg install wget unzip
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-arm64.zip
unzip ngrok-v3-stable-linux-arm64.zip
chmod +x ngrok
mv ngrok $PREFIX/bin/
```

### 2. Setup Ngrok:
```bash
ngrok config add-authtoken <your-token>
```

### 3. Jalankan Ngrok:
```bash
ngrok http 3000
```

### 4. Akses URL yang diberikan:
```
https://xxxx-xx-xx-xx-xx.ngrok-free.app
```

---

## 📝 File Structure untuk Android

```
/storage/emulated/0/AnimeStream/
├── node_modules/
├── public/
│   ├── audio/
│   ├── css/
│   ├── images/
│   └── js/
├── uploads/
├── views/
├── .env
├── .gitignore
├── database.js
├── package.json
├── server.js
└── animestream.db
```

---

## ⚡ Quick Start Commands

### Start Server:
```bash
cd ~/storage/shared/AnimeStream && node server.js
```

### Stop Server:
```bash
pkill node
```

### View Logs:
```bash
tail -f server.log
```

### Restart Server:
```bash
pkill node && node server.js
```

---

## 🎯 Recommended Workflow

1. **Edit di Acode** - Edit code dengan syntax highlighting
2. **Run di Termux** - Jalankan server di Termux
3. **Test di Browser** - Buka `localhost:3000` di Chrome
4. **Debug** - Lihat console log di Termux

---

## 🔐 Security untuk Production

Jika ingin deploy ke internet:

1. Ganti `SESSION_SECRET` dengan random string
2. Setup HTTPS dengan Ngrok atau Cloudflare Tunnel
3. Gunakan environment variables yang aman
4. Backup database secara berkala

---

## 📞 Support

Jika ada masalah:
1. Cek log error di Termux
2. Pastikan semua dependencies terinstall
3. Cek permission folder uploads
4. Restart Termux dan coba lagi

---

## 🎉 Selesai!

Aplikasi AnimeStream sekarang bisa dijalankan di HP Android menggunakan Acode dan Termux!

**Login Default:**
- Username: `admin`
- Password: `admin123`

**Akses:**
- Local: `http://localhost:3000`
- Network: `http://<your-ip>:3000`
- Internet: `https://<ngrok-url>`

---

Dibuat untuk AnimeStream © 2026
