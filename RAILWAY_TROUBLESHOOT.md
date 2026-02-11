# 🔧 Railway Troubleshooting Guide

## Error: Failed to lookup view 'login-new' in views directory '/app/views'

### Penyebab
Views folder tidak ter-copy dengan benar ke Docker container saat build.

### Solusi

#### 1. Pastikan views folder ada di local
```bash
dir views
```
Harus ada file: `login-new.ejs`, `dashboard.ejs`, dll.

#### 2. Cek .dockerignore
Pastikan `views` TIDAK ada di file `.dockerignore`

#### 3. Dockerfile sudah diperbaiki
Dockerfile sekarang sudah include explicit copy untuk views folder:
```dockerfile
# Copy application files
COPY . .

# Explicitly ensure views folder is copied
COPY views ./views
```

#### 4. Redeploy ke Railway

**Cara 1: Push ke GitHub (Recommended)**
```bash
git add .
git commit -m "Fix views folder in Docker"
git push
```
Railway akan auto-deploy.

**Cara 2: Railway CLI**
```bash
railway up
```

#### 5. Verifikasi di Railway Logs
Setelah deploy, cek logs di Railway dashboard:
- Klik project → Deployments → Latest deployment → View Logs
- Pastikan tidak ada error saat build
- Coba akses website lagi

### Troubleshooting Lainnya

#### Build Failed
- Cek Railway logs untuk error message
- Pastikan `package.json` dependencies lengkap
- Cek apakah ada syntax error di code

#### Health Check Failed
- Railway butuh waktu 30-60 detik untuk start
- Pastikan PORT environment variable sudah diset (Railway auto-set)
- Cek logs untuk error saat server start

#### Database Error
- Railway menggunakan SQLite (file-based)
- Database akan dibuat otomatis saat pertama kali run
- Data akan hilang jika tidak pakai Volume (lihat DEPLOY_INFO.md)

#### Upload Tidak Berfungsi
- Pastikan folder `uploads` ada
- Railway perlu Volume untuk persistent storage
- Lihat DEPLOY_INFO.md untuk setup Volume

### Tips
- Selalu cek Railway logs untuk error details
- Test di local dulu sebelum deploy: `npm start`
- Gunakan Railway CLI untuk debug: `railway logs`
- Jika masih error, coba redeploy dari scratch

### Kontak Support
Jika masih ada masalah, hubungi via WhatsApp di tombol floating button di website.
