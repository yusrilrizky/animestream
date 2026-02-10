# 🔧 Troubleshooting AnimeStream

## Masalah Login

### ❌ Tidak bisa login ke dashboard

**Gejala:** Setelah input username/password yang benar, tidak bisa masuk ke dashboard.

**Solusi:**

1. **Reset password admin:**
   ```bash
   node reset-admin.js
   ```
   
   Output:
   ```
   ✅ Password admin berhasil direset!
   - Username: admin
   - Email: admin@animestream.com
   - Password: admin123
   ```

2. **Cek database:**
   ```bash
   node -e "const {userDB} = require('./database.js'); console.log(userDB.getAll());"
   ```

3. **Clear browser cache & cookies:**
   - Chrome: Ctrl+Shift+Delete
   - Pilih "Cookies and other site data"
   - Clear data

4. **Restart server:**
   ```bash
   taskkill /F /IM node.exe
   node server.js
   ```

### ❌ Username/password salah padahal sudah benar

**Solusi:**

1. Pastikan tidak ada spasi di username/password
2. Cek caps lock
3. Reset password dengan script:
   ```bash
   node reset-admin.js
   ```

## Masalah Reset Password

### ❌ Kode pemulihan tidak terkirim ke Gmail

**Gejala:** Setelah submit email di "Lupa Password", tidak ada email masuk.

**Penyebab:** Email belum dikonfigurasi di `.env`

**Solusi (Mode Development):**

1. Submit email di form lupa password
2. Buka **console/terminal** tempat server jalan
3. Lihat output seperti ini:
   ```
   🔐 Reset password link untuk admin@animestream.com:
   http://localhost:3000/reset-password?token=abc123...
   ⚠️ Email belum dikonfigurasi. Setup EMAIL_USER dan EMAIL_PASSWORD di .env
   ```
4. **Copy link** tersebut
5. **Paste di browser**
6. Reset password

**Solusi (Setup Email untuk Production):**

1. Buka https://myaccount.google.com/apppasswords
2. Generate app password
3. Update `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-digit-app-password
   ```
4. Restart server
5. Test lagi

📚 **Dokumentasi lengkap:** Lihat [EMAIL_SETUP.md](EMAIL_SETUP.md)

### ❌ Link reset password expired

**Gejala:** "Link reset password sudah kadaluarsa"

**Penyebab:** Link hanya valid 1 jam

**Solusi:**

1. Kembali ke `/forgot-password`
2. Submit email lagi
3. Gunakan link baru dalam 1 jam

## Masalah Database

### ❌ Database locked

**Gejala:** Error "database is locked"

**Solusi:**

```bash
# Stop semua node process
taskkill /F /IM node.exe

# Hapus lock files
del animestream.db-shm
del animestream.db-wal

# Start server
node server.js
```

### ❌ Data hilang setelah restart

**Gejala:** User/anime yang diupload hilang setelah restart server

**Penyebab:** Database file terhapus atau corrupt

**Solusi:**

1. Cek apakah file `animestream.db` ada:
   ```bash
   dir animestream.db
   ```

2. Jika tidak ada, server akan buat database baru saat start

3. Restore dari backup (jika ada):
   ```bash
   copy backup\animestream.db animestream.db
   ```

### ❌ Reset database (hapus semua data)

**Kapan:** Ingin mulai dari awal dengan data bersih

**Cara:**

```bash
# Stop server
taskkill /F /IM node.exe

# Hapus database
del animestream.db
del animestream.db-shm
del animestream.db-wal

# Start server (akan buat database baru)
node server.js
```

Admin default akan dibuat otomatis:
- Username: `admin`
- Password: `admin123`

## Masalah Server

### ❌ Port 3000 already in use

**Gejala:** Error "EADDRINUSE: address already in use :::3000"

**Solusi:**

```bash
# Stop semua node process
taskkill /F /IM node.exe

# Start server
node server.js
```

Atau ubah port di `.env`:
```env
PORT=3001
```

### ❌ Module not found

**Gejala:** Error "Cannot find module 'xxx'"

**Solusi:**

```bash
# Install dependencies
npm install

# Start server
node server.js
```

### ❌ Server crash saat upload

**Gejala:** Server berhenti saat upload video

**Penyebab:** File terlalu besar atau disk penuh

**Solusi:**

1. Cek ukuran file (max 500MB)
2. Cek disk space:
   ```bash
   dir
   ```
3. Compress video sebelum upload
4. Ubah limit di `server.js`:
   ```javascript
   limits: { fileSize: 1000 * 1024 * 1024 } // 1GB
   ```

## Masalah Upload

### ❌ Upload gagal

**Gejala:** Error saat upload video

**Solusi:**

1. Cek format video (MP4, MKV, AVI, WebM)
2. Cek ukuran file (max 500MB)
3. Pastikan folder `uploads/` ada:
   ```bash
   mkdir uploads
   ```
4. Cek permission folder

### ❌ Video tidak bisa diputar

**Gejala:** Video berhasil diupload tapi tidak bisa play

**Penyebab:** Format video tidak supported browser

**Solusi:**

1. Convert video ke MP4 (H.264 codec)
2. Gunakan tools: HandBrake, FFmpeg
3. Recommended settings:
   - Format: MP4
   - Video codec: H.264
   - Audio codec: AAC

## Masalah Settings

### ❌ Tidak bisa ubah nama/password

**Gejala:** Setelah submit form settings, tidak ada perubahan

**Solusi:**

1. Cek console browser untuk error (F12)
2. Pastikan form tersubmit ke route yang benar
3. Cek database:
   ```bash
   node -e "const {userDB} = require('./database.js'); console.log(userDB.getById(1));"
   ```

### ❌ Password lama salah

**Gejala:** Error "Password saat ini salah" padahal benar

**Solusi:**

1. Reset password dengan script:
   ```bash
   node reset-admin.js
   ```
2. Login dengan password baru: `admin123`
3. Ubah password di settings

## Masalah Hosting

### ❌ Database tidak persistent di hosting

**Gejala:** Data hilang setelah redeploy

**Penyebab:** Platform hosting tidak support persistent filesystem

**Solusi:**

1. Gunakan platform yang support persistent disk:
   - ✅ Railway.app
   - ✅ Render.com (paid plan)
   - ✅ VPS/Dedicated Server

2. Atau migrate ke database external:
   - PostgreSQL (Heroku, Supabase)
   - MongoDB (MongoDB Atlas)
   - MySQL (PlanetScale)

### ❌ Email tidak terkirim di production

**Gejala:** Reset password tidak kirim email di server production

**Solusi:**

1. Pastikan environment variables sudah diset di hosting:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

2. Cek logs server untuk error message

3. Gunakan email service profesional:
   - SendGrid
   - Mailgun
   - AWS SES

## Quick Fixes

### Reset Everything

```bash
# Stop server
taskkill /F /IM node.exe

# Delete database
del animestream.db

# Delete node_modules
rmdir /s /q node_modules

# Reinstall
npm install

# Start fresh
node server.js
```

### Check System Status

```bash
# Check users
node -e "const {userDB} = require('./database.js'); console.log('Users:', userDB.getAll().length);"

# Check anime
node -e "const {animeDB} = require('./database.js'); console.log('Anime:', animeDB.getAll().length);"

# Check admin
node -e "const {userDB} = require('./database.js'); const admin = userDB.getByUsernameOrEmail('admin'); console.log('Admin:', admin ? 'OK' : 'NOT FOUND');"
```

### Backup Database

```bash
# Create backup
copy animestream.db backup\animestream-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%.db

# Restore backup
copy backup\animestream-backup.db animestream.db
```

## Masih Bermasalah?

1. **Cek logs:** Lihat console/terminal untuk error message
2. **Cek browser console:** Tekan F12 untuk lihat error
3. **Reset database:** Hapus `animestream.db` dan start ulang
4. **Reinstall:** Hapus `node_modules` dan `npm install` lagi
5. **Buat issue:** Report di GitHub dengan detail error

---

**Dokumentasi lain:**
- [README.md](README.md) - Dokumentasi utama
- [DATABASE.md](DATABASE.md) - Dokumentasi database
- [EMAIL_SETUP.md](EMAIL_SETUP.md) - Setup email
