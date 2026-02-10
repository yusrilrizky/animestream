# 🚀 Panduan Deploy & Build APK - AnimeStream

## ✅ Fitur yang Sudah Berfungsi

### 1. Authentication
- ✅ Login dengan username/email & password
- ✅ Register akun baru
- ✅ Logout
- ✅ Session management (expire saat browser ditutup)
- ✅ Forgot password dengan kode 6 digit (2 langkah verifikasi)

### 2. User Management
- ✅ Settings (ubah nama & password)
- ✅ Dashboard user (statistik upload & views)
- ✅ Admin panel (kelola user & anime)
- ✅ Role system (user & admin)

### 3. Upload & Storage
- ✅ Upload video anime (MP4, MKV, AVI, WebM)
- ✅ Max size: 500MB
- ✅ Tersimpan di folder `uploads/`
- ✅ Data tersimpan di database SQLite
- ✅ Auto-generate metadata (uploader, date, views)

### 4. Video Streaming
- ✅ Watch video dengan HTML5 player
- ✅ Auto-increment views
- ✅ Responsive video player
- ✅ Support multiple formats

### 5. Database
- ✅ SQLite database (`animestream.db`)
- ✅ Data persistent (tidak hilang saat restart)
- ✅ Tabel: users, anime, reset_tokens
- ✅ Foreign keys & relationships

---

## 📦 Persiapan Sebelum Deploy

### 1. Test Lokal Dulu

```bash
# Test upload video
1. Login sebagai admin (admin/admin123)
2. Klik "Upload"
3. Pilih video (max 500MB)
4. Isi title, episode, category, description
5. Upload
6. Cek apakah muncul di homepage
7. Klik "Tonton" untuk test video player
```

### 2. Cek Database

```bash
# Cek apakah data tersimpan
node -e "const {animeDB} = require('./database.js'); console.log('Total anime:', animeDB.getAll().length);"
```

### 3. Backup Database

```bash
# Backup sebelum deploy
copy animestream.db backup\animestream-backup.db
```

---

## 🌐 Deploy ke Hosting

### Pilihan Platform Hosting

#### ✅ Railway.app (RECOMMENDED)
**Keuntungan:**
- Support SQLite dengan persistent disk
- Free tier available
- Easy deployment
- Auto SSL/HTTPS

**Cara Deploy:**

1. **Buat akun di Railway.app**
   - https://railway.app/
   - Login dengan GitHub

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login Railway**
   ```bash
   railway login
   ```

4. **Init Project**
   ```bash
   railway init
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Set Environment Variables**
   ```bash
   railway variables set PORT=3000
   railway variables set SESSION_SECRET=your-secret-key-here
   railway variables set NODE_ENV=production
   ```

7. **Add Domain**
   - Buka Railway dashboard
   - Settings → Generate Domain
   - Copy URL (contoh: `animestream.up.railway.app`)

#### ✅ Render.com

**Cara Deploy:**

1. **Buat akun di Render.com**
   - https://render.com/

2. **New Web Service**
   - Connect GitHub repository
   - Atau upload manual

3. **Settings:**
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: Node

4. **Environment Variables:**
   ```
   PORT=3000
   SESSION_SECRET=your-secret-key
   NODE_ENV=production
   ```

5. **Add Persistent Disk** (PENTING!)
   - Settings → Disks
   - Add Disk
   - Mount Path: `/opt/render/project/src`
   - Size: 1GB (free)

#### ⚠️ Heroku (Perlu Addon)

Heroku tidak support SQLite persistent. Perlu migrate ke PostgreSQL:

```bash
# Install PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Migrate database (perlu setup tambahan)
```

#### ❌ Vercel/Netlify

Tidak support SQLite karena serverless. Tidak disarankan.

---

## 📱 Build APK (Android)

### Metode 1: PWA Builder (TERMUDAH)

**Langkah:**

1. **Deploy website dulu** (Railway/Render)
   - Dapatkan URL: `https://animestream.up.railway.app`

2. **Buka PWA Builder**
   - https://www.pwabuilder.com/

3. **Input URL**
   - Masukkan URL website yang sudah di-deploy
   - Klik "Start"

4. **Generate APK**
   - Pilih "Android"
   - Klik "Generate"
   - Download APK

5. **Install APK**
   - Transfer APK ke Android
   - Install (enable "Unknown Sources")
   - Buka app!

### Metode 2: Capacitor (Advanced)

**Persiapan:**

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Init Capacitor
npx cap init

# Add Android platform
npx cap add android

# Build
npm run build
npx cap sync

# Open Android Studio
npx cap open android
```

**Build APK di Android Studio:**
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Tunggu proses build
3. APK ada di `android/app/build/outputs/apk/`

### Metode 3: Cordova

```bash
# Install Cordova
npm install -g cordova

# Create project
cordova create animestream com.animestream.app AnimeStream

# Add platform
cd animestream
cordova platform add android

# Build
cordova build android

# APK di: platforms/android/app/build/outputs/apk/
```

---

## 🔧 Optimasi untuk Production

### 1. Update .env untuk Production

```env
# Production settings
PORT=3000
SESSION_SECRET=change-this-to-random-string-in-production
NODE_ENV=production
BASE_URL=https://your-domain.com

# Email (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 2. Compress Video

Untuk menghemat bandwidth dan storage:

```bash
# Install FFmpeg
# Windows: https://ffmpeg.org/download.html

# Compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4
```

### 3. Add .gitignore

Pastikan file ini di `.gitignore`:

```
node_modules/
uploads/
.env
*.log
animestream.db
animestream.db-shm
animestream.db-wal
```

### 4. Security Headers

Tambahkan di server.js (sebelum routes):

```javascript
// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

---

## 🧪 Testing Checklist

Sebelum deploy, test semua fitur:

### Authentication
- [ ] Login dengan username
- [ ] Login dengan email
- [ ] Register akun baru
- [ ] Logout
- [ ] Forgot password (request kode)
- [ ] Forgot password (verifikasi kode)
- [ ] Forgot password (reset password)

### Upload
- [ ] Upload video MP4
- [ ] Upload video MKV
- [ ] Upload dengan semua field terisi
- [ ] Video muncul di homepage
- [ ] Video tersimpan di database

### Video Player
- [ ] Play video
- [ ] Pause video
- [ ] Fullscreen
- [ ] Volume control
- [ ] Views increment

### Settings
- [ ] Ubah display name
- [ ] Ubah password
- [ ] Data tersimpan di database

### Admin
- [ ] Akses admin panel
- [ ] Lihat semua user
- [ ] Lihat semua anime
- [ ] Hapus anime

---

## 📊 Monitoring

### Cek Status Server

```bash
# Cek apakah server jalan
curl https://your-domain.com

# Cek database
node -e "const {userDB, animeDB} = require('./database.js'); console.log('Users:', userDB.getAll().length, '| Anime:', animeDB.getAll().length);"
```

### Logs

```bash
# Railway
railway logs

# Render
# Lihat di dashboard → Logs

# Heroku
heroku logs --tail
```

---

## 🐛 Troubleshooting Production

### Video tidak bisa diupload

**Penyebab:** Disk space penuh atau permission

**Solusi:**
1. Cek disk space di hosting
2. Pastikan folder `uploads/` writable
3. Cek max file size di hosting

### Database hilang setelah redeploy

**Penyebab:** Hosting tidak support persistent filesystem

**Solusi:**
1. Gunakan Railway/Render dengan persistent disk
2. Atau migrate ke PostgreSQL/MongoDB

### APK tidak bisa install

**Penyebab:** Unsigned APK atau security settings

**Solusi:**
1. Enable "Unknown Sources" di Android
2. Sign APK dengan keystore
3. Upload ke Google Play Store

---

## 📝 Checklist Deploy

- [ ] Test semua fitur lokal
- [ ] Backup database
- [ ] Update .env untuk production
- [ ] Push ke GitHub (tanpa .env dan database)
- [ ] Deploy ke Railway/Render
- [ ] Set environment variables
- [ ] Add persistent disk (jika perlu)
- [ ] Test website di production
- [ ] Generate APK dengan PWA Builder
- [ ] Test APK di Android
- [ ] Done! 🎉

---

## 🎯 URL Penting

- **Railway:** https://railway.app/
- **Render:** https://render.com/
- **PWA Builder:** https://www.pwabuilder.com/
- **FFmpeg:** https://ffmpeg.org/
- **Android Studio:** https://developer.android.com/studio

---

**Selamat! Website siap di-deploy dan dijadikan APK! 🚀**
