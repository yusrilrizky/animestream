# ⚡ Render Quick Fix - Internal Server Error

## 🎯 Fix Tercepat (5 Menit)

### Step 1: Update Build Command

Di Render Dashboard → Settings:

**Build Command:**
```
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

**Start Command:**
```
node server.js
```

### Step 2: Set Environment Variables

Di Render Dashboard → Environment, tambahkan:

```
NODE_ENV=production
SESSION_SECRET=animestream-secret-2024
PORT=10000
```

### Step 3: Redeploy

1. Klik **"Manual Deploy"** → **"Clear build cache & deploy"**
2. Tunggu 5-10 menit
3. Cek logs untuk error

---

## 🔍 Cek Logs

Di Render Dashboard → Logs:

### Jika muncul "better-sqlite3":
```
✅ Build command sudah benar
⏳ Tunggu build selesai
```

### Jika muncul "Database":
```
✅ Normal, database akan dibuat otomatis
```

### Jika muncul "EADDRINUSE":
```
❌ Port conflict
✅ Set PORT=10000 di environment
```

---

## ✅ Checklist

- [ ] Build command: `npm install --legacy-peer-deps && npm rebuild better-sqlite3`
- [ ] Start command: `node server.js`
- [ ] Environment: `NODE_ENV=production`
- [ ] Environment: `SESSION_SECRET=animestream-secret-2024`
- [ ] Environment: `PORT=10000`
- [ ] Manual deploy dengan clear cache
- [ ] Tunggu build selesai
- [ ] Cek logs tidak ada error
- [ ] Test website

---

## 🆘 Masih Error?

### Error: "Module not found"
```bash
# Build command:
npm install --legacy-peer-deps && npm rebuild better-sqlite3
```

### Error: "Port in use"
```bash
# Environment:
PORT=10000
```

### Error: "Database locked"
```
⚠️ SQLite tidak cocok untuk Render
✅ Gunakan PostgreSQL (gratis)
📖 Baca: RENDER_POSTGRESQL.md
```

---

## 📱 Test Website

Setelah deploy berhasil:
```
https://your-app.onrender.com
```

Login:
- Username: `admin`
- Password: `admin123`

---

## ⚠️ Catatan

**SQLite di Render:**
- Data akan reset setiap deploy
- Hanya untuk testing
- Untuk production, gunakan PostgreSQL

**Baca:**
- `RENDER_TROUBLESHOOTING.md` - Troubleshooting detail
- `RENDER_POSTGRESQL.md` - Setup PostgreSQL

---

**© 2026 AnimeStream**
**WA: 082297706541**
