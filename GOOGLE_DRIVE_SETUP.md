# 🚀 Setup Google Drive API - Panduan Lengkap

## Kenapa Google Drive?

✅ **Storage Besar** - 15GB gratis, atau unlimited dengan Google One
✅ **Reliable** - Google infrastructure
✅ **API Resmi** - Fully supported
✅ **Streaming** - Video bisa di-stream langsung

## Google One Plans:
- **Free**: 15GB (~15-30 video)
- **100GB**: Rp 26,900/bulan (~100-200 video)
- **200GB**: Rp 43,000/bulan (~200-400 video)
- **2TB**: Rp 135,000/bulan (~2000+ video)

---

## Step 1: Buat Google Cloud Project

### 1.1 Buka Google Cloud Console
https://console.cloud.google.com/

### 1.2 Buat Project Baru
1. Klik "Select a project" di atas
2. Klik "NEW PROJECT"
3. Project name: `AnimeStream`
4. Klik "CREATE"

### 1.3 Tunggu Project Dibuat
Tunggu beberapa detik sampai project selesai dibuat.

---

## Step 2: Enable Google Drive API

### 2.1 Buka API Library
1. Di sidebar kiri, klik "APIs & Services" → "Library"
2. Atau buka: https://console.cloud.google.com/apis/library

### 2.2 Enable Google Drive API
1. Search: "Google Drive API"
2. Klik "Google Drive API"
3. Klik "ENABLE"
4. Tunggu sampai enabled

---

## Step 3: Buat OAuth Credentials

### 3.1 Buka Credentials
1. Di sidebar kiri, klik "APIs & Services" → "Credentials"
2. Atau buka: https://console.cloud.google.com/apis/credentials

### 3.2 Configure OAuth Consent Screen
1. Klik "CONFIGURE CONSENT SCREEN"
2. Pilih "External"
3. Klik "CREATE"

**Isi Form:**
- App name: `AnimeStream`
- User support email: (email kamu)
- Developer contact: (email kamu)
- Klik "SAVE AND CONTINUE"

**Scopes:**
- Klik "ADD OR REMOVE SCOPES"
- Search: `drive.file`
- Centang: `.../auth/drive.file`
- Klik "UPDATE"
- Klik "SAVE AND CONTINUE"

**Test users:**
- Klik "ADD USERS"
- Masukkan email Google kamu (yang punya Google Drive)
- Klik "ADD"
- Klik "SAVE AND CONTINUE"

### 3.3 Buat OAuth Client ID
1. Kembali ke "Credentials"
2. Klik "CREATE CREDENTIALS" → "OAuth client ID"
3. Application type: "Web application"
4. Name: `AnimeStream Web`

**Authorized redirect URIs:**
- Klik "ADD URI"
- Masukkan: `http://localhost:3000/oauth2callback`
- Klik "ADD URI" lagi
- Masukkan: `https://YOUR-RAILWAY-DOMAIN.railway.app/oauth2callback`
  (Ganti YOUR-RAILWAY-DOMAIN dengan domain Railway kamu)

5. Klik "CREATE"

### 3.4 Copy Credentials
Akan muncul popup dengan:
- **Client ID**: `xxxxx.apps.googleusercontent.com`
- **Client Secret**: `xxxxx`

**SIMPAN BAIK-BAIK!** Kita butuh ini nanti.

---

## Step 4: Get Refresh Token

### 4.1 Set Environment Variables (Sementara)
Buka Railway dashboard → Project → Variables

Tambahkan:
```
GOOGLE_DRIVE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=xxxxx
GOOGLE_DRIVE_REDIRECT_URI=https://YOUR-RAILWAY-DOMAIN.railway.app/oauth2callback
```

Ganti `xxxxx` dengan Client ID dan Client Secret kamu.

### 4.2 Deploy Code
Code sudah siap, tinggal push ke GitHub:
```bash
git add .
git commit -m "Add Google Drive integration"
git push
```

Railway akan auto-deploy.

### 4.3 Get Authorization URL
Buka Railway logs, cari URL seperti ini:
```
🔗 Google Drive Auth URL: https://accounts.google.com/o/oauth2/v2/auth?...
```

Atau jalankan di local:
```bash
node -e "const gd = require('./google-drive'); console.log(gd.generateAuthUrl())"
```

### 4.4 Authorize
1. Copy URL tersebut
2. Paste di browser
3. Login dengan akun Google yang punya Google Drive
4. Klik "Allow"
5. Akan redirect ke `/oauth2callback?code=xxxxx`
6. Copy `code=xxxxx` (bagian setelah code=)

### 4.5 Get Refresh Token
Jalankan di terminal:
```bash
node -e "const gd = require('./google-drive'); gd.getTokensFromCode('PASTE_CODE_DISINI').then(t => console.log('Refresh Token:', t.refresh_token))"
```

Ganti `PASTE_CODE_DISINI` dengan code yang kamu copy tadi.

Akan muncul:
```
Refresh Token: 1//xxxxx
```

**SIMPAN REFRESH TOKEN INI!**

---

## Step 5: Set Final Environment Variables

Buka Railway dashboard → Project → Variables

Update/tambahkan:
```
GOOGLE_DRIVE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=xxxxx
GOOGLE_DRIVE_REFRESH_TOKEN=1//xxxxx
GOOGLE_DRIVE_REDIRECT_URI=https://YOUR-RAILWAY-DOMAIN.railway.app/oauth2callback
```

Optional (kalau mau simpan di folder tertentu):
```
GOOGLE_DRIVE_FOLDER_ID=xxxxx
```

Cara dapat Folder ID:
1. Buka Google Drive
2. Buat folder baru: "AnimeStream Videos"
3. Buka folder tersebut
4. Copy ID dari URL: `https://drive.google.com/drive/folders/FOLDER_ID_DISINI`

---

## Step 6: Test Upload!

1. Railway akan auto-redeploy setelah set environment variables
2. Tunggu 1-2 menit
3. Buka website kamu
4. Login
5. Upload video
6. Video akan otomatis upload ke Google Drive!
7. Cek Google Drive kamu, video seharusnya ada di sana

---

## Troubleshooting

### Error: "Google Drive not configured"
→ Environment variables belum di-set atau salah
→ Cek Railway Variables

### Error: "invalid_grant"
→ Refresh token expired atau salah
→ Ulangi Step 4 untuk get refresh token baru

### Error: "insufficient permissions"
→ Scope tidak lengkap
→ Ulangi Step 3.2, pastikan scope `drive.file` di-centang

### Video tidak muncul di Google Drive
→ Cek Railway logs untuk error
→ Pastikan refresh token benar

### Video tidak bisa di-play
→ Google Drive butuh waktu untuk process video
→ Tunggu beberapa menit
→ Atau video terlalu besar (> 100MB butuh waktu lama)

---

## Tips

1. **Compress video** sebelum upload untuk hemat storage
2. **Organize folder** di Google Drive untuk mudah manage
3. **Backup credentials** di tempat aman
4. **Monitor quota** di Google Cloud Console

---

## Kesimpulan

Setelah setup:
✅ Video otomatis upload ke Google Drive
✅ Video persistent (tidak hilang saat redeploy)
✅ Streaming langsung dari Google Drive
✅ Hemat disk Railway
✅ Storage besar (15GB - 2TB)

Selamat! Website kamu sekarang pakai Google Drive untuk storage! 🎉
