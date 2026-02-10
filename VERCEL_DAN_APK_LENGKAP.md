# 🚀 Deploy Vercel + Buat APK - Panduan Lengkap!

## ⚠️ Catatan Penting

**Vercel = Serverless:**
- ✅ Super cepat
- ✅ Gratis unlimited
- ⚠️ Data TIDAK persistent (hilang setiap deploy)
- ⚠️ Upload video TIDAK persistent

**Cocok untuk:**
- Testing & demo
- Buat APK untuk testing
- Showcase project

**Tidak cocok untuk:**
- Production (data hilang)
- Upload video (file hilang)

---

## 📋 PART 1: Deploy ke Vercel (10 Menit)

### STEP 1: Push ke GitHub (5 Menit)

#### 1.1 Buat Repository di GitHub

1. Buka: https://github.com
2. Login (atau Sign up jika belum)
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
   Note: vercel-deploy
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

### STEP 2: Deploy ke Vercel (5 Menit)

#### 2.1 Buat Akun Vercel

1. Buka: https://vercel.com
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. **Authorize Vercel**
5. Login otomatis! ✅

---

#### 2.2 Import Project

1. Dashboard Vercel → **"Add New"** → **"Project"**
2. **"Import Git Repository"**
3. Cari & pilih **"animestream"**
4. Klik **"Import"**

---

#### 2.3 Konfigurasi

**Framework Preset:**
```
Other
```

**Build Command:**
```
npm install --legacy-peer-deps
```

**Output Directory:**
```
(kosongkan)
```

**Install Command:**
```
npm install --legacy-peer-deps
```

---

#### 2.4 Environment Variables

Klik **"Environment Variables"** → Add:

```
Key: SESSION_SECRET
Value: animestream-secret-vercel-xyz789

Key: NODE_ENV
Value: production
```

---

#### 2.5 Deploy!

1. Klik **"Deploy"**
2. Tunggu 2-3 menit
3. Status: **"Ready"** ✅

**URL Website:**
```
https://animestream.vercel.app
```
(atau nama lain yang Vercel generate)

---

### STEP 3: Test Website (2 Menit)

1. Klik URL website
2. Login: `admin` / `admin123`
3. **Berhasil?** → Deploy sukses! 🎉

---

## 📱 PART 2: Buat APK (10 Menit)

Ada 3 cara buat APK. Pilih yang paling mudah!

---

### CARA 1: AppGeyser (PALING MUDAH! ⭐⭐⭐⭐⭐)

**Kelebihan:**
- ✅ Super mudah (5 menit)
- ✅ Gratis
- ✅ Tidak perlu coding
- ⚠️ Ada iklan (bisa dihapus dengan upgrade)

**Langkah:**

1. **Buka:** https://appsgeyser.com

2. **Klik "Create App"**

3. **Pilih "Website"**

4. **Isi Form:**
   ```
   Website URL: https://animestream.vercel.app
   (ganti dengan URL Vercel kamu)
   
   App Name: AnimeStream
   
   Description: Platform Streaming Anime
   ```

5. **Customize (Opsional):**
   - Upload icon (512x512 px)
   - Pilih warna tema (ungu: #a855f7)
   - Splash screen

6. **Klik "Create"**

7. **Tunggu 1-2 menit**

8. **Download APK**
   - Klik **"Download APK"**
   - File: `AnimeStream.apk` (sekitar 5-10 MB)

9. **Install di HP:**
   - Transfer APK ke HP (via USB, WhatsApp, atau email)
   - Buka file APK di HP
   - Klik **"Install"**
   - Jika ada warning "Unknown sources", enable di Settings
   - Selesai! 📱

---

### CARA 2: PWA (Progressive Web App) ⭐⭐⭐⭐

**Kelebihan:**
- ✅ Tidak perlu download APK
- ✅ Install langsung dari browser
- ✅ Update otomatis
- ✅ Ukuran kecil

**Langkah:**

1. **Buka website di HP** (Chrome/Edge)
   ```
   https://animestream.vercel.app
   ```

2. **Chrome:** Klik menu (3 titik) → **"Add to Home screen"**
   
   **Edge:** Klik menu → **"Add to phone"**

3. **Isi nama:** `AnimeStream`

4. **Klik "Add"**

5. **Icon muncul di home screen!** 📱

6. **Buka dari home screen** → Seperti app native!

---

### CARA 3: Android Studio (Tanpa Iklan) ⭐⭐⭐

**Kelebihan:**
- ✅ Tanpa iklan
- ✅ Full control
- ✅ Professional
- ⚠️ Butuh waktu (30 menit)
- ⚠️ Perlu install Android Studio

**Langkah Singkat:**

1. **Install Android Studio**
   - Download: https://developer.android.com/studio
   - Install (ikuti wizard)

2. **Buat Project Baru**
   - New Project → Empty Activity
   - Name: AnimeStream
   - Package: com.animestream.app

3. **Edit MainActivity.java**
   ```java
   WebView webView = findViewById(R.id.webview);
   webView.loadUrl("https://animestream.vercel.app");
   ```

4. **Build APK**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Tunggu 5-10 menit
   - APK ready!

**Panduan Lengkap:** Baca `BUILD_APK_ANDROID_STUDIO.md`

---

## 🎨 Customize APK (Opsional)

### 1. Buat Icon

**Tools:**
- Canva: https://canva.com
- Icon Generator: https://romannurik.github.io/AndroidAssetStudio/

**Ukuran:**
- 512x512 px (untuk upload)
- Format: PNG dengan background

**Design:**
- Logo AnimeStream
- Warna ungu (#a855f7)
- Text: "AnimeStream"

---

### 2. Splash Screen

**Buat gambar:**
- Ukuran: 1080x1920 px
- Logo di tengah
- Background gradient ungu

**Upload di AppGeyser:**
- Settings → Splash Screen → Upload

---

### 3. Warna Tema

**AppGeyser:**
- Settings → Theme Color
- Pilih: `#a855f7` (ungu)

---

## 📤 Distribusi APK

### Cara 1: Share Langsung

**Via WhatsApp:**
1. Kirim file APK ke kontak
2. Mereka download & install

**Via Google Drive:**
1. Upload APK ke Google Drive
2. Share link
3. Set permission: Anyone with link

**Via Telegram:**
1. Upload APK ke channel/group
2. Share link

---

### Cara 2: Upload ke Play Store (Berbayar)

**Biaya:** $25 one-time fee

**Langkah:**
1. Daftar Google Play Console
2. Bayar $25
3. Upload APK
4. Isi detail app
5. Submit for review
6. Tunggu approval (1-7 hari)

---

### Cara 3: Alternatif Store (Gratis)

**APKPure:**
- Upload: https://apkpure.com/developer

**APKMirror:**
- Upload: https://apkmirror.com

**F-Droid:**
- Open source only
- Upload: https://f-droid.org

---

## 🔄 Update APK

### Jika Pakai AppGeyser:

1. Edit code di project
2. Push ke GitHub
3. Vercel auto-deploy
4. **APK otomatis update!** (karena load dari URL)
5. User tidak perlu download ulang

---

### Jika Pakai Android Studio:

1. Edit code
2. Push ke GitHub
3. Vercel auto-deploy
4. Build APK baru di Android Studio
5. Upload APK baru
6. User harus download & install ulang

---

## 🆘 Troubleshooting

### APK Tidak Bisa Install

**Fix:**
1. HP → Settings → Security
2. Enable **"Unknown sources"** atau **"Install unknown apps"**
3. Coba install lagi

---

### Website Tidak Load di APK

**Fix:**
1. Cek URL di AppGeyser (harus HTTPS)
2. Cek website bisa dibuka di browser HP
3. Cek internet connection

---

### APK Terlalu Besar

**Fix:**
1. Compress images di project
2. Minify CSS/JS
3. Atau pakai PWA (lebih kecil)

---

### Iklan Mengganggu (AppGeyser)

**Fix:**
1. Upgrade ke Premium ($9.99/bulan)
2. Atau pakai Android Studio (tanpa iklan)
3. Atau pakai PWA (tanpa iklan)

---

## 📊 Perbandingan Cara Buat APK

| Cara | Mudah | Gratis | Iklan | Ukuran | Update |
|------|-------|--------|-------|--------|--------|
| **AppGeyser** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | 5-10 MB | Auto |
| **PWA** | ⭐⭐⭐⭐⭐ | ✅ | ❌ | <1 MB | Auto |
| **Android Studio** | ⭐⭐⭐ | ✅ | ❌ | 10-20 MB | Manual |

**Rekomendasi:**
- **Pemula:** AppGeyser atau PWA
- **Professional:** Android Studio

---

## 🎯 Checklist Lengkap

### Deploy Vercel:
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported
- [ ] Environment variables set
- [ ] Website deployed
- [ ] Website accessible
- [ ] Login works

### Buat APK:
- [ ] Pilih cara (AppGeyser/PWA/Android Studio)
- [ ] APK created
- [ ] APK tested on phone
- [ ] Icon customized (optional)
- [ ] Splash screen added (optional)

### Distribusi:
- [ ] APK shared (WhatsApp/Drive/Telegram)
- [ ] Tested by others
- [ ] Feedback collected

---

## 🎉 Selesai!

**Website:** `https://animestream.vercel.app`
**APK:** `AnimeStream.apk`

**Kamu sudah punya:**
- ✅ Website online
- ✅ APK Android
- ✅ Bisa dibagikan ke teman

---

## 💡 Tips Pro

### 1. Custom Domain (Gratis)

Vercel → Settings → Domains → Add domain
- Bisa pakai domain sendiri
- Gratis!

### 2. Analytics

Tambahkan Google Analytics:
- Track visitor
- Monitor usage
- Improve app

### 3. Push Notifications

Pakai Firebase Cloud Messaging:
- Notif anime baru
- Notif update

---

## 📞 Butuh Bantuan?

**WhatsApp:** 082297706541

**Dokumentasi:**
- `BUILD_APK_GUIDE.md` - Panduan APK lengkap
- `PWA_GUIDE.md` - Panduan PWA
- `BUILD_APK_ANDROID_STUDIO.md` - Android Studio

---

**© 2026 AnimeStream**
**Website + APK dalam 20 menit! 🚀**
