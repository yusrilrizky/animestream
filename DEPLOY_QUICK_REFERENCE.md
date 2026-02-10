# 🚀 Quick Reference - Deploy AnimeStream

## 📋 Checklist Cepat

### GitHub (15 menit):
```bash
# 1. Install Git
# Download: https://git-scm.com/download/win

# 2. Buat GitHub account
# https://github.com → Sign up

# 3. Buat Personal Access Token
# Settings → Developer settings → Personal access tokens
# Generate token → Copy & simpan

# 4. Buat repository
# New repository → animestream → Create

# 5. Push code
cd C:\Users\Administrator\Downloads\ArtonNime
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main
# Username: github-username
# Password: PASTE-TOKEN (bukan password!)
```

### Render (15 menit):

#### 1. PostgreSQL Database:
```
Dashboard → New + → PostgreSQL

Name: animestream-db
Database: animestream
User: animestream
Region: Singapore
Plan: Free

→ Create Database
→ Copy "Internal Database URL"
```

#### 2. Web Service:
```
Dashboard → New + → Web Service
→ Connect GitHub → Select animestream

Name: animestream
Environment: Node
Region: Singapore
Branch: main

Build Command:
npm install --legacy-peer-deps && npm rebuild better-sqlite3

Start Command:
node server.js

Instance Type: Free
```

#### 3. Environment Variables:
```
NODE_ENV = production
SESSION_SECRET = random-string-ganti-ini-123456
PORT = 10000
BASE_URL = https://animestream.onrender.com
DATABASE_URL = (paste dari PostgreSQL)
```

#### 4. Deploy:
```
→ Create Web Service
→ Tunggu 5-10 menit
→ Buka: https://animestream.onrender.com
→ Login: admin / admin123
```

---

## 🧪 Test Data Persistent

```
1. Login: admin / admin123
2. Register user: testuser / test@test.com / test123
3. Logout
4. Render Dashboard → Manual Deploy
5. Tunggu deploy selesai
6. Login: testuser / test123
7. Berhasil? → Data persistent! ✅
```

---

## 🔄 Update Website

```bash
git add .
git commit -m "Update"
git push
# Render auto-deploy (2-5 menit)
```

---

## 📱 Buat APK

```
1. https://appsgeyser.com
2. Website → URL: https://your-app.onrender.com
3. Nama: AnimeStream
4. Download APK
5. Install di HP
```

---

## 🚨 Troubleshooting

### Build Failed:
- Cek Build Command (harus persis!)
- Clear build cache & deploy

### Internal Server Error:
- Cek Environment Variables (5 variables)
- Cek DATABASE_URL (copy ulang)
- Redeploy

### Data Hilang:
- DATABASE_URL belum diset
- Check logs: harus "Using PostgreSQL"
- Redeploy dengan clear cache

---

## 📞 Contact

**WA:** 082297706541

**Docs:**
- `DEPLOY_LENGKAP.md` - Panduan lengkap
- `POSTGRESQL_SETUP_SIMPLE.md` - Setup PostgreSQL
- `DEPLOY_STATUS.md` - Status code

---

**© 2026 AnimeStream**
