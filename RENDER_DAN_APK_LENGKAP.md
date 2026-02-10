# 🚀 Deploy Render + Buat APK - Panduan Lengkap!

## ⚠️ Catatan Penting

**Render dengan SQLite:**
- ✅ Gratis
- ✅ Mudah
- ⚠️ Data TIDAK persistent (hilang setiap deploy)
- ⚠️ Upload video TIDAK persistent

**Cocok untuk:**
- Testing & demo
- Buat APK untuk showcase

**Untuk data persistent:**
- Pakai Railway/Fly.io
- Atau tambah PostgreSQL (lihat awal conversation)

---

## 📋 PART 1: Deploy ke Render (15 Menit)

### STEP 1: Push ke GitHub (10 Menit)

#### 1.1 Buat Repository di GitHub

1. Buka: https://github.com
2. Login (atau Sign up)
3. Klik **"+"** → **"New repository"**
4. Isi:
   ```
   Repository name: animestream
   Description: Platform Streaming Anime
   Public
   ```
5. **Create repository**

---

#### 1.2 Buat Personal Access Token

1. GitHub → Foto profil → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token** → **Generate new token (classic)**
4. Isi:
   ```
   Note: render-deploy
   Expiration: No expiration
   Centang: ☑️ repo
   ```
5. **Generate token**
6. **COPY & SIMPAN!**

---

#### 1.3 Push Code

**Command Prompt atau PowerShell:**

```bash
# 1. Set branch
git branch -M main

# 2. Add remote (GANTI USERNAME!)
git remote add origin https://github.com/USERNAME/animestream.git

# 3. Push
git push -u origin main
```

**Login:**
- Username: username GitHub kamu
- Password: **PASTE TOKEN**

**Tunggu upload selesai!**

---

### STEP 2: Deploy ke Render (5 Menit)

#### 2.1 Buat Akun Render

1. Buka: https://render.com
2. Klik **"Get Started"**
3. Pilih **"Sign up with GitHub"**
4. **Authorize Render**
5. Login otomatis! ✅

---

#### 2.2 Buat Web Service

1. Dashboard Render → **"New +"** (pojok kanan atas)
2. Pilih **"Web Service"**
3. Klik **"Connect account"** (jika diminta)
4. Pilih repository **"animestream"**
5. Klik **"Connect"**

---

#### 2.3 Konfigurasi Service

**Isi form:**

**Name:**
```
animestream
```

**Environment:**
```
Node
```

**Region:**
```
Singapore
```

**Branch:**
```
main
```

**Build Command:**
```
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

**Start Command:**
```
node server.js
```

**Instance Type:**
```
Free
```

---

#### 2.4 Environment Variables

**Scroll ke bawah, klik "Advanced"**

**Add Environment Variables:**

```
Key: NODE_ENV
Value: production

Key: SESSION_SECRET
Value: animestream-secret-render-xyz789

Key: PORT
Value: 10000

Key: BASE_URL
Value: https://animestream.onrender.com
```
(Ganti `animestream` dengan nama service kamu)

---

#### 2.5 Deploy!

1. Klik **"Create Web Service"**
2. Tunggu build (5-10 menit)
3. Lihat logs real-time
4. Status: **"Live"** ✅

**URL Website:**
```
https://animestream.onrender.com
```

---

### STEP 3: Test Website (2 Menit)

1. Klik URL website
2. Login: `admin` / `admin123`
3. **Berhasil?** → Deploy sukses! 🎉

---

## 📱 PART 2: Buat APK (10 Menit)

### CARA 1: AppGeyser (PALING MUDAH! ⭐⭐⭐⭐⭐)

**Langkah:**

1. **Buka:** https://appsgeyser.com

2. **Klik "Create App"**

3. **Pilih "Website"**

4. **Isi Form:**
   ```
   Website URL: https://animestream.onrender.com
   (ganti dengan URL Render kamu)
   
   App Name: AnimeStream
   
   Description: Platform Streaming Anime
   ```

5. **Customize:**
   - Upload icon (512x512 px)
   - Warna tema: `#a855f7` (ungu)
   - Splash screen (optional)

6. **Klik "Create"**

7. **Tunggu 1-2 menit**

8. **Download APK**

9. **Install di HP:**
   - Transfer APK ke HP
   - Install
   - Selesai! 📱

---

### CARA 2: PWA (Install dari Browser) ⭐⭐⭐⭐⭐

**Langkah:**

1. **Buka website di HP** (Chrome)
   ```
   https://animestream.onrender.com
   ```

2. **Chrome:** Menu (3 titik) → **"Add to Home screen"**

3. **Nama:** `AnimeStream`

4. **Add**

5. **Icon muncul di home screen!** 📱

---

### CARA 3: Android Studio (Professional) ⭐⭐⭐

**Panduan lengkap:** Baca `BUILD_APK_ANDROID_STUDIO.md`

---

## 🎨 Buat Icon APK

### Tools:
- **Canva:** https://canva.com (mudah)
- **Figma:** https://figma.com (professional)

### Ukuran:
- 512x512 px
- Format: PNG
- Background: Solid color atau gradient

### Design:
```
Background: Gradient ungu (#a855f7 → #8a2be2)
Logo: "AS" atau icon anime
Text: "AnimeStream" (optional)
```

### Template Canva:
1. Buka Canva
2. Search: "App Icon"
3. Pilih template
4. Edit warna → Ungu
5. Download PNG (512x512)

---

## 📤 Distribusi APK

### 1. Share Langsung

**WhatsApp:**
- Kirim file APK
- Teman download & install

**Google Drive:**
- Upload APK
- Share link
- Set: Anyone with link can view

**Telegram:**
- Upload ke channel/group
- Share link

---

### 2. Website Download

**Buat halaman download:**
- Upload APK ke hosting
- Buat link download
- Share link

**Contoh:**
```
https://animestream.onrender.com/download
```

---

### 3. QR Code

**Generate QR Code:**
1. Buka: https://qr-code-generator.com
2. URL: Link download APK
3. Generate
4. Download QR Code
5. Share QR Code

**User scan QR → Download APK!**

---

## 🔄 Update Website & APK

### Update Website:

```bash
# 1. Edit code
# ...

# 2. Commit & push
git add .
git commit -m "Update"
git push

# 3. Render auto-deploy (2-5 menit)
```

### Update APK:

**Jika pakai AppGeyser/PWA:**
- APK otomatis update (load dari URL)
- User tidak perlu download ulang

**Jika pakai Android Studio:**
- Build APK baru
- Upload & share APK baru
- User harus install ulang

---

## ⚠️ Masalah Render

### 1. Website Sleep (15 Menit Tidak Ada Visitor)

**Gejala:**
- Loading lama saat pertama buka
- Butuh 30-60 detik untuk bangun

**Solusi:**
- Pakai UptimeRobot (gratis) untuk ping setiap 5 menit
- Atau upgrade ke paid plan ($7/bulan)

**Setup UptimeRobot:**
1. Buka: https://uptimerobot.com
2. Sign up (gratis)
3. Add Monitor → HTTP(s)
4. URL: `https://animestream.onrender.com`
5. Interval: 5 minutes
6. Create Monitor
7. Website tidak sleep lagi! ✅

---

### 2. Data Hilang Setiap Deploy

**Penyebab:**
- SQLite tidak persistent di Render

**Solusi:**
- Pakai PostgreSQL (lihat `POSTGRESQL_SETUP_SIMPLE.md`)
- Atau pakai Railway/Fly.io

---

### 3. Upload Video Tidak Persistent

**Penyebab:**
- File system tidak persistent

**Solusi:**
- Pakai cloud storage (Cloudinary, AWS S3)
- Atau pakai Railway/Fly.io

---

## 🆘 Troubleshooting

### Build Failed

**Fix:**
1. Render Dashboard → Logs
2. Cek error
3. Pastikan Build Command benar:
   ```
   npm install --legacy-peer-deps && npm rebuild better-sqlite3
   ```
4. Redeploy

---

### Internal Server Error

**Fix:**
1. Cek Logs
2. Pastikan environment variables sudah diset (4 variables)
3. Redeploy

---

### Website Lambat

**Fix:**
1. Website sleep → Tunggu 30 detik
2. Atau pakai UptimeRobot
3. Atau upgrade plan

---

## 📊 Perbandingan Hosting

| Hosting | Gratis | Persistent | Sleep | Mudah |
|---------|--------|------------|-------|-------|
| **Render** | ✅ | ❌ | ✅ (15 min) | ⭐⭐⭐⭐ |
| **Railway** | $5/mo | ✅ | ❌ | ⭐⭐⭐⭐ |
| **Vercel** | ✅ | ❌ | ❌ | ⭐⭐⭐⭐ |
| **Fly.io** | ✅ | ✅ | ❌ | ⭐⭐⭐ |

**Kesimpulan:**
- **Testing:** Render OK
- **Production:** Railway/Fly.io lebih baik

---

## 🎯 Checklist Lengkap

### Deploy Render:
- [ ] GitHub repository created
- [ ] Code pushed
- [ ] Render account created
- [ ] Web Service created
- [ ] Environment variables set (4 variables)
- [ ] Website deployed
- [ ] Website accessible
- [ ] Login works

### Buat APK:
- [ ] Pilih cara (AppGeyser/PWA)
- [ ] APK created
- [ ] Icon customized
- [ ] APK tested on phone
- [ ] APK works

### Distribusi:
- [ ] APK shared (WhatsApp/Drive)
- [ ] Tested by others
- [ ] Feedback collected

### Optional:
- [ ] UptimeRobot setup (agar tidak sleep)
- [ ] Custom domain (optional)
- [ ] Analytics (optional)

---

## 🎉 Selesai!

**Website:** `https://animestream.onrender.com`
**APK:** `AnimeStream.apk`

**Kamu sudah punya:**
- ✅ Website online (gratis)
- ✅ APK Android
- ✅ Bisa dibagikan

---

## 💡 Tips Pro

### 1. Agar Website Tidak Sleep

**Pakai UptimeRobot:**
- Gratis
- Ping setiap 5 menit
- Website selalu online

---

### 2. Custom Domain

**Render:**
- Settings → Custom Domain
- Add domain kamu
- Update DNS
- Gratis!

---

### 3. Monitor Usage

**Render Dashboard:**
- Usage → Lihat bandwidth
- Free tier: 750 jam/bulan
- Cukup untuk 1 project

---

## 📞 Butuh Bantuan?

**WhatsApp:** 082297706541

**Dokumentasi:**
- `RENDER_SIMPLE.md` - Render basics
- `BUILD_APK_GUIDE.md` - APK guide
- `DEPLOY_RAILWAY_LENGKAP.md` - Alternatif (data persistent)

---

**© 2026 AnimeStream**
**Render + APK dalam 25 menit! 🚀**
