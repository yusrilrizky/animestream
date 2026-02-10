# 🐘 Setup PostgreSQL di Render (5 Menit)

## 🎯 Kenapa PostgreSQL?

**SQLite:**
- ❌ Data hilang setiap deploy
- ❌ Akun pengguna reset
- ❌ Tidak persistent

**PostgreSQL:**
- ✅ Data persistent (tidak hilang)
- ✅ Akun pengguna tetap ada
- ✅ Gratis di Render
- ✅ Production-ready

---

## 🚀 Setup (5 Menit)

### Step 1: Buat PostgreSQL Database

1. Login ke Render.com
2. Dashboard → Klik **"New +"**
3. Pilih **"PostgreSQL"**
4. Isi form:
   ```
   Name: animestream-db
   Database: animestream
   User: animestream
   Region: Singapore
   Plan: Free
   ```
5. Klik **"Create Database"**
6. Tunggu 2-3 menit

### Step 2: Copy Database URL

1. Database sudah dibuat
2. Scroll ke **"Connections"**
3. Copy **"Internal Database URL"**
   
   Contoh:
   ```
   postgresql://animestream:xxxxx@dpg-xxxxx-a.singapore-postgres.render.com/animestream
   ```

### Step 3: Set Environment Variable

1. Buka **Web Service** kamu (animestream)
2. Klik **"Environment"** (sidebar kiri)
3. Klik **"Add Environment Variable"**
4. Isi:
   ```
   Key: DATABASE_URL
   Value: (paste URL dari step 2)
   ```
5. Klik **"Save Changes"**

### Step 4: Redeploy

1. Klik **"Manual Deploy"**
2. Pilih **"Clear build cache & deploy"**
3. Tunggu 5-10 menit

### Step 5: Test!

1. Buka website
2. Login: `admin` / `admin123`
3. Register user baru
4. Logout & login lagi
5. **Akun tetap ada!** ✅

---

## ✅ Selesai!

Sekarang:
- ✅ Data persistent
- ✅ Akun tidak hilang saat deploy
- ✅ Production-ready
- ✅ Gratis!

---

## 🔄 Update Code

Code sudah support PostgreSQL otomatis!

**Cara kerja:**
- Jika ada `DATABASE_URL` → Pakai PostgreSQL
- Jika tidak ada → Pakai SQLite (local)

**Tidak perlu ubah code!**

---

## 📝 Checklist

- [ ] PostgreSQL database created
- [ ] Database URL copied
- [ ] DATABASE_URL added to environment
- [ ] Redeploy dengan clear cache
- [ ] Build successful
- [ ] Website accessible
- [ ] Login works
- [ ] Register user baru
- [ ] Logout & login lagi
- [ ] User tetap ada ✅

---

## ⚠️ Catatan

### Free Plan Limits:
- Storage: 1GB
- Connections: 100
- Expires: 90 days (auto-delete jika tidak aktif)

### Untuk Production:
Upgrade ke paid plan ($7/month) untuk:
- Storage unlimited
- No expiration
- Better performance

---

## 🆘 Troubleshooting

### Error: "Connection refused"
- Database belum ready
- Tunggu 2-3 menit lagi

### Error: "Invalid DATABASE_URL"
- URL salah
- Copy ulang dari Render Dashboard

### Error: "Table does not exist"
- Database belum ter-init
- Redeploy dengan clear cache

---

**© 2026 AnimeStream**
**Data kamu sekarang persistent! 🎉**
