# 🚀 Cloudflare R2 Setup - Panduan Lengkap

## Kenapa Cloudflare R2?

✅ **Paling Murah!** - $0.015/GB/bulan (10GB gratis)
✅ **Bandwidth Unlimited Gratis!** - Streaming tanpa batas
✅ **Setup Simple** - 10 menit selesai
✅ **Reliable** - Cloudflare infrastructure
✅ **S3-Compatible** - Standard API

## Biaya:
- **0-10GB**: GRATIS
- **50GB**: $0.60/bulan (Rp 9,000)
- **100GB**: $1.35/bulan (Rp 20,000)
- **500GB**: $7.35/bulan (Rp 110,000)
- **Bandwidth**: UNLIMITED GRATIS ⭐

---

## Step 1: Daftar Cloudflare

### 1.1 Buka Cloudflare
https://dash.cloudflare.com/sign-up

### 1.2 Daftar Akun
- Masukkan email
- Buat password
- Verify email
- Login

---

## Step 2: Buat R2 Bucket

### 2.1 Buka R2
1. Login ke Cloudflare Dashboard
2. Di sidebar kiri, klik **"R2"**
3. Atau buka: https://dash.cloudflare.com/?to=/:account/r2

### 2.2 Create Bucket
1. Klik **"Create bucket"**
2. Bucket name: `animestream-videos` (atau nama lain, huruf kecil, no space)
3. Location: **Automatic** (recommended)
4. Klik **"Create bucket"**

### 2.3 Enable Public Access (Optional)
Kalau mau video bisa diakses public:
1. Klik bucket yang baru dibuat
2. Klik tab **"Settings"**
3. Scroll ke **"Public access"**
4. Klik **"Allow Access"**
5. Copy **Public bucket URL** (simpan untuk nanti)

---

## Step 3: Buat API Token

### 3.1 Buka R2 API Tokens
1. Di halaman R2, klik **"Manage R2 API Tokens"**
2. Atau buka: https://dash.cloudflare.com/?to=/:account/r2/api-tokens

### 3.2 Create API Token
1. Klik **"Create API token"**
2. Token name: `AnimeStream API`
3. Permissions:
   - **Object Read & Write** (centang)
4. TTL: **Forever** (atau sesuai kebutuhan)
5. Klik **"Create API Token"**

### 3.3 Copy Credentials
Akan muncul 3 informasi penting:

```
Access Key ID: xxxxxxxxxxxxxxxxxxxxx
Secret Access Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
Endpoint: https://xxxxxxxxxxxxx.r2.cloudflarestorage.com
```

**SIMPAN BAIK-BAIK!** Secret Access Key hanya muncul sekali!

### 3.4 Get Account ID
1. Kembali ke Cloudflare Dashboard
2. Di sidebar kiri, klik **"R2"**
3. Di kanan atas, lihat **Account ID**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. Copy Account ID ini

---

## Step 4: Set Environment Variables di Railway

### 4.1 Buka Railway Dashboard
https://railway.app → Project kamu → Variables

### 4.2 Tambahkan Variables
Klik **"New Variable"**, lalu tambahkan satu per satu:

```
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxx
R2_SECRET_ACCESS_KEY=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
R2_BUCKET_NAME=animestream-videos
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

**Penjelasan:**
- `R2_ACCOUNT_ID`: Account ID dari Cloudflare
- `R2_ACCESS_KEY_ID`: Access Key ID dari API Token
- `R2_SECRET_ACCESS_KEY`: Secret Access Key dari API Token
- `R2_BUCKET_NAME`: Nama bucket yang kamu buat
- `R2_PUBLIC_URL`: Public bucket URL (kalau enable public access)

**Kalau tidak enable public access**, skip `R2_PUBLIC_URL` atau isi dengan:
```
R2_PUBLIC_URL=https://YOUR-ACCOUNT-ID.r2.cloudflarestorage.com/animestream-videos
```

---

## Step 5: Deploy!

### 5.1 Push ke GitHub
Code sudah siap, tinggal push:
```bash
git add .
git commit -m "Add Cloudflare R2 integration"
git push
```

### 5.2 Railway Auto-Deploy
Railway akan detect perubahan dan auto-deploy.
Tunggu 1-2 menit sampai deployment selesai.

### 5.3 Cek Logs
Buka Railway → Deployments → Latest → View Logs

Cari log:
```
✅ Cloudflare R2 initialized
📦 Bucket: animestream-videos
```

Kalau ada, berarti R2 sudah aktif!

---

## Step 6: Test Upload!

1. Buka website kamu
2. Login
3. Klik "Upload"
4. Pilih video
5. Isi form
6. Klik "Upload Sekarang"
7. Video akan otomatis upload ke Cloudflare R2!

### Verifikasi di Cloudflare:
1. Buka Cloudflare Dashboard → R2
2. Klik bucket `animestream-videos`
3. Seharusnya ada file video di folder `videos/`

---

## Troubleshooting

### Error: "Cloudflare R2 not configured"
→ Environment variables belum di-set atau salah
→ Cek Railway Variables, pastikan semua ada

### Error: "Access Denied"
→ API Token permissions salah
→ Buat API Token baru dengan **Object Read & Write**

### Error: "Bucket not found"
→ Bucket name salah atau belum dibuat
→ Cek `R2_BUCKET_NAME` sama dengan nama bucket di Cloudflare

### Video tidak bisa di-play
→ Public access belum di-enable
→ Atau `R2_PUBLIC_URL` salah
→ Enable public access di bucket settings

### Upload lambat
→ File terlalu besar
→ Compress video dulu (target 50-100MB per episode)

---

## Tips Hemat Biaya

### 1. Compress Video
Pakai HandBrake (gratis):
- Resolution: 720p
- Codec: H.264
- Bitrate: 1-2 Mbps
- Target: 50-100MB per episode

### 2. Monitor Usage
Cek usage di Cloudflare Dashboard → R2 → Analytics

### 3. Delete Video Lama
Hapus video yang jarang ditonton untuk hemat storage

### 4. Pakai Free Tier Maksimal
10GB gratis = ~100-200 video (kalau di-compress)

---

## Biaya Estimasi

### Scenario 1: Website Kecil (50 video)
- Storage: 5GB (dalam free tier)
- Bandwidth: Unlimited gratis
- **Total: GRATIS**

### Scenario 2: Website Sedang (200 video)
- Storage: 20GB
- Biaya: (20GB - 10GB free) × $0.015 = $0.15/bulan
- Bandwidth: Unlimited gratis
- **Total: Rp 2,250/bulan**

### Scenario 3: Website Besar (1000 video)
- Storage: 100GB
- Biaya: (100GB - 10GB free) × $0.015 = $1.35/bulan
- Bandwidth: Unlimited gratis
- **Total: Rp 20,000/bulan**

Bandingkan dengan:
- Google One 100GB: Rp 26,900/bulan
- Supabase 100GB: $25/bulan (Rp 375,000)

**R2 PALING MURAH!** 🎉

---

## Kesimpulan

Setelah setup:
✅ Video otomatis upload ke Cloudflare R2
✅ Video persistent (tidak hilang saat redeploy)
✅ Streaming unlimited gratis
✅ Hemat disk Railway
✅ Biaya paling murah

Selamat! Website kamu sekarang pakai Cloudflare R2! 🚀
