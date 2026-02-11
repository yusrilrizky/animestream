# 📦 Railway Volume Setup - PENTING untuk Upload Video!

## Kenapa Perlu Volume?

Railway menggunakan **ephemeral storage** (temporary). Artinya:
- ❌ File yang diupload akan HILANG saat redeploy
- ❌ Database SQLite akan RESET saat redeploy
- ❌ Semua data tidak persistent

**Solusi: Pakai Railway Volume untuk persistent storage!**

## Cara Setup Railway Volume

### Step 1: Buka Railway Dashboard
1. Login ke https://railway.app
2. Klik project AnimeStream kamu
3. Klik service yang running

### Step 2: Tambah Volume
1. Klik tab **"Variables"** atau **"Settings"**
2. Scroll ke bawah, cari section **"Volumes"**
3. Klik **"+ New Volume"**

### Step 3: Konfigurasi Volume
Isi form dengan:
- **Mount Path**: `/data`
- **Name**: `animestream-data` (atau nama lain)

Klik **"Add"** atau **"Create"**

### Step 4: Set Environment Variable (Opsional)
Di tab **"Variables"**, tambahkan:
```
UPLOADS_DIR=/data/uploads
```

Tapi ini sudah di-set di Dockerfile, jadi opsional.

### Step 5: Redeploy
Setelah Volume ditambahkan, Railway akan otomatis redeploy.

Tunggu sampai deployment selesai (1-2 menit).

## Verifikasi Volume Sudah Aktif

1. Cek Railway logs
2. Seharusnya ada log: `✅ Created uploads directory: /data/uploads`
3. Coba upload video
4. Video seharusnya berhasil dan tidak hilang saat redeploy

## Struktur Directory di Railway

```
/app/                    # Application code
├── server.js
├── database.js
├── views/
└── public/

/data/                   # Volume (persistent)
├── uploads/            # Video files (persistent)
│   ├── video1.mp4
│   └── video2.mp4
└── animestream.db      # Database (persistent)
```

## Troubleshooting

### Upload Masih Stuck 0%
**Penyebab:**
- Volume belum di-setup
- Network timeout
- File terlalu besar

**Solusi:**
1. Pastikan Volume sudah di-setup dengan mount path `/data`
2. Coba upload file lebih kecil dulu (< 50MB) untuk test
3. Cek Railway logs untuk error

### Video Hilang Setelah Redeploy
**Penyebab:** Volume belum di-setup atau mount path salah

**Solusi:**
1. Pastikan Volume mount path = `/data`
2. Pastikan environment variable `UPLOADS_DIR=/data/uploads`
3. Redeploy setelah setup Volume

### Database Reset Setelah Redeploy
**Penyebab:** Database tidak di-simpan di Volume

**Solusi:**
Update `database.js` untuk simpan database di Volume:
```javascript
const dbPath = process.env.DATABASE_PATH || '/data/animestream.db';
```

### Upload Timeout
**Penyebab:** File terlalu besar atau koneksi lambat

**Solusi:**
1. Compress video dulu sebelum upload
2. Gunakan format MP4 dengan codec H.264
3. Maksimal file size: 500MB (bisa diubah di server.js)

## Limits Railway

### Free Plan
- Volume size: **1GB** (cukup untuk ~10-20 video)
- Bandwidth: Limited
- Build time: 10 minutes max

### Hobby Plan ($5/month)
- Volume size: **100GB**
- Bandwidth: Unlimited
- Build time: 30 minutes max

## Tips Optimasi

1. **Compress video sebelum upload**
   - Gunakan HandBrake atau FFmpeg
   - Target: 720p, H.264, ~50-100MB per episode

2. **Batasi ukuran file**
   - Edit `server.js` line multer config
   - Sesuaikan dengan quota Volume kamu

3. **Cleanup video lama**
   - Buat fitur delete video
   - Hapus video yang jarang ditonton

4. **Gunakan CDN untuk video**
   - Upload video ke Cloudflare R2 (free 10GB)
   - Atau Bunny CDN (murah)
   - Simpan hanya URL di database

## Alternative: External Storage

Kalau Volume Railway tidak cukup, bisa pakai:

1. **Cloudflare R2** (Recommended)
   - Free: 10GB storage
   - No egress fees
   - S3-compatible API

2. **Bunny CDN**
   - $0.01/GB storage
   - $0.01/GB bandwidth
   - Sangat murah!

3. **AWS S3**
   - Pay as you go
   - Reliable tapi agak mahal

4. **Google Drive API**
   - Free 15GB
   - Butuh setup OAuth

## Kesimpulan

✅ **WAJIB setup Railway Volume** dengan mount path `/data`
✅ Code sudah diperbaiki untuk support Volume
✅ Upload sekarang lebih stabil dengan timeout 10 menit
✅ Database dan video akan persistent setelah redeploy

**Setelah setup Volume, push code ke GitHub dan Railway akan auto-deploy!**
