# 🚂 Deploy ke Railway.app - GRATIS & DATA PERSISTEN

Railway.app memberikan **$5 kredit gratis per bulan** yang cukup untuk hosting aplikasi kecil dengan data dan video yang tersimpan permanen.

## ✅ Keuntungan Railway
- ✨ **GRATIS** $5/bulan (cukup untuk ~500 jam runtime)
- 💾 **Data persisten** (database & video tidak hilang)
- 🚀 **Auto-deploy** dari GitHub
- 📊 **Logs & monitoring** lengkap
- 🔧 **Easy setup** (5 menit)

---

## 📋 Langkah Deploy

### 1️⃣ Push ke GitHub

```bash
# Jika belum ada git
git init
git add .
git commit -m "Deploy to Railway"

# Buat repo di GitHub, lalu:
git remote add origin https://github.com/USERNAME/animestream.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy di Railway

1. Buka **https://railway.app**
2. Sign in dengan GitHub
3. Klik **"New Project"**
4. Pilih **"Deploy from GitHub repo"**
5. Pilih repository **animestream**
6. Railway akan otomatis:
   - Detect Node.js
   - Install dependencies
   - Build better-sqlite3
   - Start server
   - Generate domain

### 3️⃣ Cek Deployment

Tunggu 2-3 menit, lalu:

1. **Cek Logs** di Railway dashboard
2. **Test Health Check**: `https://your-app.railway.app/health`
3. **Buka Website**: `https://your-app.railway.app/login`
4. **Login**: username `admin`, password `admin123`

---

## 🔧 Environment Variables (Opsional)

Railway auto-generate yang penting, tapi bisa tambah manual:

| Variable | Default | Keterangan |
|----------|---------|------------|
| `PORT` | Auto | Railway set otomatis |
| `SESSION_SECRET` | Auto-generated | Untuk session security |
| `DATABASE_PATH` | `./animestream.db` | Path database SQLite |
| `NODE_ENV` | `production` | Environment mode |

**Cara set:**
1. Buka project di Railway
2. Klik tab **"Variables"**
3. Add variable baru
4. Redeploy otomatis

---

## 🐛 Troubleshooting

### ❌ Server Offline / Error 503

**Cek Logs:**
1. Buka Railway dashboard
2. Klik project → **"Deployments"**
3. Klik deployment terakhir
4. Lihat **"Build Logs"** dan **"Deploy Logs"**

**Masalah Umum:**

#### 1. Build Failed (better-sqlite3)
```
Error: Cannot find module 'better-sqlite3'
```

**Solusi:** Railway sudah dikonfigurasi untuk rebuild. Jika masih error:
- Cek `nixpacks.toml` ada
- Cek `railway.toml` ada
- Redeploy

#### 2. Database Error
```
Error: SQLITE_CANTOPEN: unable to open database file
```

**Solusi:** 
- Railway volume sudah auto-mounted
- Database akan dibuat otomatis di `/app/animestream.db`
- Jika masih error, set env var: `DATABASE_PATH=/tmp/animestream.db`

#### 3. Port Already in Use
```
Error: EADDRINUSE: address already in use
```

**Solusi:**
- Railway auto-set PORT
- Jangan hardcode port di code
- Server sudah pakai `process.env.PORT`

#### 4. Health Check Failed
```
Health check timeout
```

**Solusi:**
- Tunggu 30-60 detik setelah deploy
- Cek `/health` endpoint: `curl https://your-app.railway.app/health`
- Jika timeout, increase di `railway.toml`: `healthcheckTimeout = 300`

---

## 📊 Monitor Usage

**Cek kredit & usage:**
1. Railway dashboard → **"Usage"**
2. Lihat:
   - CPU time used
   - Memory usage
   - Network bandwidth
   - Remaining credit

**Tips hemat kredit:**
- Matikan app saat tidak dipakai (Settings → Sleep)
- Optimize video size (compress sebelum upload)
- Limit concurrent users

---

## 🔄 Update Aplikasi

Setiap kali push ke GitHub, Railway auto-deploy:

```bash
git add .
git commit -m "Update feature"
git push
```

Railway akan:
1. Detect changes
2. Rebuild
3. Redeploy
4. Keep data & videos (tidak hilang!)

---

## 🎯 Custom Domain (Opsional)

Railway kasih domain gratis: `your-app.railway.app`

**Pakai domain sendiri:**
1. Beli domain (Namecheap, GoDaddy, dll)
2. Railway dashboard → **"Settings"** → **"Domains"**
3. Add custom domain
4. Update DNS records di domain provider
5. Tunggu propagasi (5-30 menit)

---

## 💡 Tips

1. **Backup Database:**
   - Download `animestream.db` dari Railway CLI
   - Atau setup auto-backup ke cloud storage

2. **Video Storage:**
   - Railway volume terbatas (~1GB free)
   - Untuk banyak video, pakai cloud storage (Cloudinary, AWS S3)

3. **Performance:**
   - Railway auto-scale
   - Untuk traffic tinggi, upgrade plan

4. **Security:**
   - Ganti password admin setelah deploy
   - Set `SESSION_SECRET` yang kuat
   - Enable HTTPS (Railway auto-enable)

---

## 📞 Support

**Railway Error?**
- Cek logs di dashboard
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

**Aplikasi Error?**
- Cek `/health` endpoint
- Lihat server logs
- Test local dulu: `npm start`

---

## ✅ Checklist Deploy

- [ ] Code di-push ke GitHub
- [ ] Railway project dibuat
- [ ] Deployment success (cek logs)
- [ ] Health check OK (`/health` return 200)
- [ ] Login page bisa dibuka
- [ ] Bisa login dengan admin/admin123
- [ ] Upload video berhasil
- [ ] Video bisa diputar
- [ ] Data persisten (tidak hilang setelah redeploy)

**Selamat! Aplikasi sudah online! 🎉**

Login: `https://your-app.railway.app/login`
- Username: `admin`
- Password: `admin123`
