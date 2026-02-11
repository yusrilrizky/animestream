# 🚂 Deploy ke Railway - LENGKAP & PASTI BERHASIL!

Railway.app adalah platform hosting terbaik untuk aplikasi ini.

## ✅ Keuntungan Railway

- 💰 **$5 kredit gratis/bulan** (~500 jam runtime)
- 💾 **Data persisten** (database & video tidak hilang)
- 🚀 **Auto-deploy** dari GitHub
- 📊 **Logs & monitoring** lengkap
- 🔧 **Easy setup** (10 menit)

---

## 📋 Persiapan

### 1. Install Git (kalau belum ada)
```bash
git --version
```

Kalau belum ada, download di: https://git-scm.com/

### 2. Buat Akun GitHub
- Buka https://github.com
- Sign up (gratis)

### 3. Buat Akun Railway
- Buka https://railway.app
- Sign in with GitHub

---

## 🚀 Langkah Deploy (10 Menit)

### Step 1: Push ke GitHub (5 menit)

#### A. Initialize Git
```bash
# Di folder project
git init
git add .
git commit -m "Initial commit for Railway"
```

#### B. Buat Repository di GitHub
1. Buka https://github.com/new
2. Repository name: `animestream`
3. Public atau Private (terserah)
4. **JANGAN** centang "Add README"
5. Klik "Create repository"

#### C. Push ke GitHub
```bash
# Ganti USERNAME dengan username GitHub kamu
git remote add origin https://github.com/USERNAME/animestream.git
git branch -M main
git push -u origin main
```

**Kalau diminta login:**
- Username: username GitHub kamu
- Password: pakai Personal Access Token (bukan password biasa)
  - Buat token di: https://github.com/settings/tokens
  - Pilih: Generate new token (classic)
  - Centang: repo
  - Generate & copy token

---

### Step 2: Deploy di Railway (5 menit)

#### A. Buka Railway
1. Buka https://railway.app
2. Klik **"Login"**
3. Pilih **"Login with GitHub"**
4. Authorize Railway

#### B. Create New Project
1. Klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository **"animestream"**
4. Railway akan otomatis:
   - Detect Dockerfile
   - Build Docker image
   - Deploy aplikasi
   - Generate domain

#### C. Tunggu Build (3-5 menit)
Railway akan:
1. ✅ Clone repository
2. ✅ Build Docker image
3. ✅ Install dependencies
4. ✅ Start server
5. ✅ Generate URL

**Progress bisa dilihat di tab "Deployments"**

---

### Step 3: Buka Website (1 menit)

#### A. Get URL
1. Di Railway dashboard
2. Klik project "animestream"
3. Tab "Settings"
4. Scroll ke "Domains"
5. Klik "Generate Domain"
6. Copy URL: `https://animestream-production-xxxx.up.railway.app`

#### B. Test Website
1. Buka URL di browser
2. Akan redirect ke `/login`
3. Login:
   - Username: `admin`
   - Password: `admin123`

---

## ✅ Checklist Sukses

Setelah deploy, cek:

- [ ] Website bisa dibuka
- [ ] Login page muncul
- [ ] Bisa login dengan admin/admin123
- [ ] Dashboard muncul
- [ ] Bisa upload video
- [ ] Video bisa diputar
- [ ] Data tidak hilang setelah refresh

---

## 🔧 Configuration (Opsional)

### Environment Variables

Railway auto-set yang penting, tapi bisa tambah manual:

1. Railway dashboard → Project
2. Tab "Variables"
3. Add variable:

```
SESSION_SECRET=your-random-secret-key-here
NODE_ENV=production
```

4. Redeploy otomatis

---

## 🐛 Troubleshooting

### 1. Build Failed

**Gejala:** Build error di Railway logs

**Solusi:**
```bash
# Test build lokal dulu
docker build -t animestream .
docker run -p 3000:3000 animestream

# Kalau lokal berhasil, push ulang
git add .
git commit -m "Fix build"
git push
```

### 2. Application Crashed

**Gejala:** "Application failed to respond"

**Solusi:**
1. Cek logs di Railway dashboard
2. Tab "Deployments" → Latest → View Logs
3. Cari error message
4. Biasanya:
   - Port issue (sudah fix)
   - Database issue (sudah fix)
   - Missing dependencies (sudah fix)

### 3. Database Reset

**Gejala:** Data hilang setelah redeploy

**Solusi:**
Railway punya persistent storage, tapi kalau tetap reset:
1. Railway dashboard → Project
2. Tab "Data"
3. Pastikan volume mounted
4. Path: `/app/animestream.db`

### 4. Upload Error

**Gejala:** Upload video error

**Solusi:**
1. Pastikan folder `uploads/` ada
2. Dockerfile sudah create folder (sudah fix)
3. Railway volume sudah mounted

---

## 🔄 Update Aplikasi

Setiap kali update code:

```bash
# 1. Edit code
# 2. Commit & push
git add .
git commit -m "Update feature"
git push

# 3. Railway auto-redeploy
# 4. Tunggu 3-5 menit
# 5. Done!
```

**Data & video TIDAK HILANG saat update!**

---

## 📊 Monitor Usage

### Cek Kredit & Usage:
1. Railway dashboard
2. Tab "Usage"
3. Lihat:
   - CPU time used
   - Memory usage
   - Network bandwidth
   - Remaining credit

### Tips Hemat Kredit:
- Matikan app saat tidak dipakai (Settings → Sleep)
- Optimize video size
- Limit concurrent users

---

## 💾 Backup Database

### Download Database:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Download database
railway run cat animestream.db > backup.db
```

### Restore Database:
```bash
# Upload database
railway run "cat > animestream.db" < backup.db
```

---

## 🎯 Custom Domain (Opsional)

### Pakai Domain Sendiri:
1. Beli domain (Namecheap, GoDaddy, dll)
2. Railway dashboard → Settings → Domains
3. Add custom domain
4. Update DNS records di domain provider:
   ```
   Type: CNAME
   Name: @
   Value: animestream-production-xxxx.up.railway.app
   ```
5. Tunggu propagasi (5-30 menit)

---

## 📞 Support

### Railway Error?
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app

### Aplikasi Error?
- Cek logs di Railway dashboard
- Test lokal: `npm start`
- Cek Dockerfile: `docker build -t animestream .`

---

## ✅ Summary

**Langkah Deploy:**
1. ✅ Push ke GitHub (5 menit)
2. ✅ Deploy di Railway (5 menit)
3. ✅ Test website (1 menit)

**Total: 10 menit!**

**Hasil:**
- ✅ Website online
- ✅ Data persisten
- ✅ Upload video bisa
- ✅ Bisa diakses dari mana saja

---

## 🎉 Selesai!

Website sudah online di Railway!

**URL:** `https://animestream-production-xxxx.up.railway.app`

**Login:**
- Username: `admin`
- Password: `admin123`

**Ganti password admin setelah login pertama!**

---

**Happy Streaming! 🎬**
