# AnimeStream - MySQL XAMPP Edition

## 🎉 Fitur Lengkap

### ✅ Backend
- Node.js + Express
- MySQL XAMPP (data permanen)
- Passport.js (OAuth Google & Facebook)
- Multer (file upload)
- bcrypt (password hash)
- Session management

### ✅ Frontend
- EJS templates
- Purple theme (#a855f7, #8a2be2, #c084fc)
- Background music (login & dashboard)
- Responsive design
- Full-screen backgrounds

### ✅ Mobile
- Flutter WebView APK
- Android support
- Custom icon
- Video embed support
- Internet connectivity check

### ✅ Video Hosting
- 10+ platform support
- Streamable, Cloudinary, Vimeo (NO ADS!)
- Streamtape, Doodstream, Mixdrop (with ads)
- Google Drive, Terabox (download button)

### ✅ Database
- MySQL XAMPP
- phpMyAdmin integration
- Data permanen
- 3 tables: users, anime, reset_tokens

## 🚀 Quick Start

### 1. Install XAMPP
```bash
# Download dari https://www.apachefriends.org/
# Install XAMPP
# Start MySQL di XAMPP Control Panel
```

### 2. Import Database
```bash
# Buka http://localhost/phpmyadmin
# Klik tab "SQL"
# Copy isi file "setup_mysql.sql"
# Paste dan klik "Go"
```

### 3. Jalankan Server
```bash
# Cara 1: Double-click start-server.bat
# Cara 2: node server.js
```

### 4. Login
```
URL: http://localhost:3000/login
Username: admin
Password: admin123
```

## 📋 Struktur Database

### Tabel: users
```sql
id INT AUTO_INCREMENT PRIMARY KEY
username VARCHAR(255) UNIQUE NOT NULL
email VARCHAR(255) UNIQUE NOT NULL
password VARCHAR(255)
displayName VARCHAR(255)
avatar TEXT
role VARCHAR(50) DEFAULT 'user'
videoQuality VARCHAR(50) DEFAULT 'auto'
googleId VARCHAR(255) UNIQUE
facebookId VARCHAR(255) UNIQUE
joinDate VARCHAR(100) NOT NULL
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Tabel: anime
```sql
id INT AUTO_INCREMENT PRIMARY KEY
title VARCHAR(255) NOT NULL
description TEXT
episode VARCHAR(100)
genre VARCHAR(255)
videoPath TEXT NOT NULL
googleDriveFileId TEXT
uploadDate VARCHAR(100) NOT NULL
uploaderId INT NOT NULL
uploader VARCHAR(255) NOT NULL
views INT DEFAULT 0
category VARCHAR(100)
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
FOREIGN KEY (uploaderId) REFERENCES users(id) ON DELETE CASCADE
```

### Tabel: reset_tokens
```sql
id INT AUTO_INCREMENT PRIMARY KEY
userId INT NOT NULL
token VARCHAR(255) UNIQUE NOT NULL
code VARCHAR(10) NOT NULL
expiresAt DATETIME NOT NULL
used TINYINT DEFAULT 0
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
```

## 🎬 Platform Video Hosting

### Tanpa Iklan (Recommended)
- **Streamable.com** - Embed langsung, no ads, HD quality
- **Cloudinary.com** - Embed langsung, no ads, CDN global
- **Vimeo.com** - Embed langsung, no ads, HD+ quality

### Dengan Iklan
- Streamtape.com - Embed dengan iklan
- Doodstream.com - Embed dengan iklan
- Mixdrop.co - Embed dengan iklan
- Vidoza.net - Embed dengan iklan
- VOE.sx - Embed dengan iklan
- Filemoon.sx - Embed dengan iklan
- Upstream.to - Embed dengan iklan

### Special
- Google Drive - Button download (tidak bisa embed)
- Terabox - Button download (tidak bisa embed)

## 📱 Flutter APK

### Lokasi
```
flutter_app/output/AnimeStream.apk
Size: 41.4 MB
```

### Fitur
- WebView untuk load website
- Support embed video dari platform hosting
- Back button navigation
- Refresh & home button
- Connectivity check
- Custom icon dari foto sendiri
- Internet permissions
- Error handling

### Install
1. Copy file AnimeStream.apk ke HP Android
2. Install APK
3. Buka aplikasi
4. Login: admin / admin123
5. Video langsung bisa diputar!

## 🔧 Troubleshooting

### MySQL connection error
**Solusi:**
1. Pastikan XAMPP MySQL running (hijau di Control Panel)
2. Restart XAMPP MySQL
3. Restart server

### Table doesn't exist
**Solusi:**
1. Import ulang setup_mysql.sql di phpMyAdmin
2. Pastikan database animestream sudah dibuat

### Cannot login
**Solusi:**
1. Cek di phpMyAdmin → animestream → users
2. Pastikan ada user admin
3. Import ulang setup_mysql.sql jika tidak ada

### Video tidak bisa diputar di APK
**Solusi:**
1. Pastikan pakai platform yang support embed
2. Streamable, Cloudinary, Vimeo recommended
3. Jangan pakai Google Drive atau Terabox

## 📚 Dokumentasi

### Mulai Dari Sini
- **START_HERE_MYSQL.txt** - Panduan step-by-step
- **SUMMARY_FINAL.txt** - Summary lengkap semua fitur

### MySQL
- **MYSQL_MIGRATION_DONE.txt** - Summary migrasi
- **MYSQL_QUICK_START.txt** - Panduan cepat
- **SETUP_MYSQL_XAMPP.md** - Panduan lengkap

### Video Hosting
- **AD_FREE_VIDEO_HOSTING.md** - Platform tanpa iklan
- **VIDEO_HOSTING_ALTERNATIF.md** - Semua platform
- **VIDEO_PLAYBACK_APK.txt** - Video playback di APK
- **STREAMTAPE_DOODSTREAM_GUIDE.md** - Platform dengan iklan

### Flutter APK
- **FLUTTER_APK_SETUP.md** - Panduan build APK
- **BUILD_APK_MANUAL.md** - Build manual
- **APK_SUMMARY.txt** - Summary APK

### Railway
- **RAILWAY_DEPLOY.md** - Deploy ke Railway
- **RAILWAY_QUICK.txt** - Panduan cepat
- **DEPLOY_INFO.md** - Info deployment

## 🎯 Keuntungan MySQL vs SQLite

| Fitur | SQLite | MySQL XAMPP |
|-------|--------|-------------|
| Data permanen | ❌ Hilang saat deploy | ✅ Permanen |
| Lihat data | ❌ Perlu tools | ✅ phpMyAdmin |
| Multi-user | ⚠️ Terbatas | ✅ Support |
| Backup | ⚠️ Manual | ✅ Export SQL |
| Performance | ⚠️ File-based | ✅ Server-based |

## 🚀 Deploy ke Railway (Opsional)

Jika mau deploy ke Railway dengan MySQL:

1. Tambahkan MySQL plugin di Railway dashboard
2. Update environment variables:
   ```
   DB_HOST=<railway-mysql-host>
   DB_USER=<railway-mysql-user>
   DB_PASSWORD=<railway-mysql-password>
   DB_NAME=animestream
   ```
3. Import setup_mysql.sql ke Railway MySQL
4. Redeploy aplikasi

## 📊 Statistik Project

### Backend
- Node.js + Express
- MySQL (XAMPP)
- Passport.js (OAuth)
- Multer (file upload)
- bcrypt (password hash)

### Frontend
- EJS templates
- Purple theme
- Background music
- Responsive design

### Mobile
- Flutter WebView
- Android APK (41.4 MB)
- Custom icon
- Video embed support

### Deployment
- Railway (production)
- Docker container
- Environment variables

### Video Hosting
- 10+ platforms
- Embed support
- No ads options

## 📝 Catatan Penting

1. **XAMPP harus running** setiap kali mau jalankan server
2. **Data tersimpan permanen** di MySQL, tidak hilang
3. **phpMyAdmin** untuk lihat/edit data secara visual
4. **APK Flutter** otomatis connect ke server (Railway atau localhost)
5. **Video hosting** support 10+ platform (Streamable, Cloudinary, Vimeo, dll)

## 🎉 Selesai!

Sekarang AnimeStream sudah pakai MySQL XAMPP!

Data tersimpan PERMANEN dan bisa dilihat di phpMyAdmin.
Video bisa diputar langsung di APK tanpa buka browser.

Selamat mencoba! 🚀

---

**Status:** ✅ MySQL sudah terintegrasi
**Login:** admin / admin123
**phpMyAdmin:** http://localhost/phpmyadmin
**Railway:** https://animestream-production-95b2.up.railway.app
