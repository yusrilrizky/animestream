# ℹ️ Info Deploy ke Railway

## ❓ Apakah Perlu Push `node_modules`?

### ❌ TIDAK PERLU!

Railway akan **install otomatis** saat build.

---

## 📋 Yang Di-Push ke GitHub:

### ✅ Yang Perlu:
- `server.js`
- `database.js`
- `package.json` ← **PENTING!** (list dependencies)
- `package-lock.json` ← **PENTING!** (lock versions)
- `Dockerfile`
- `.dockerignore`
- `railway.json`
- `public/` (CSS, JS, images)
- `views/` (EJS templates)
- `.env.example` (template config)

### ❌ Yang TIDAK Perlu:
- `node_modules/` ← Railway install sendiri
- `uploads/` ← Video lokal (Railway buat folder baru)
- `animestream.db` ← Database lokal (Railway buat baru)
- `.env` ← Config lokal (Railway set sendiri)
- `*.log` ← Log files

---

## 🔧 Bagaimana Railway Install Dependencies?

### Proses Build Railway:

```dockerfile
# 1. Railway clone repo (tanpa node_modules)
git clone https://github.com/USERNAME/animestream.git

# 2. Railway build Docker image
docker build -t animestream .

# 3. Di dalam Dockerfile:
COPY package*.json ./
RUN npm install --production  ← Install di sini!

# 4. Copy application files
COPY . .

# 5. Start server
CMD ["node", "server.js"]
```

**Railway install `node_modules` di server, bukan dari GitHub!**

---

## 📦 File `package.json` - PENTING!

Railway baca `package.json` untuk tahu dependencies apa yang perlu di-install:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "better-sqlite3": "^12.6.2",
    "bcryptjs": "^2.4.3",
    ...
  }
}
```

Railway akan run:
```bash
npm install --production
```

Dan install semua dependencies yang ada di `package.json`.

---

## 🎯 Kenapa Tidak Push `node_modules`?

### 1. **Ukuran Besar**
- `node_modules` bisa 100-500MB
- Push ke GitHub lama
- Clone repo lama

### 2. **Platform Berbeda**
- Lokal: Windows/Mac/Linux
- Railway: Linux (Docker)
- `better-sqlite3` perlu compile ulang untuk Linux

### 3. **Best Practice**
- `.gitignore` exclude `node_modules`
- Railway install fresh dependencies
- Lebih aman & reliable

---

## ✅ Checklist Sebelum Push:

### File yang HARUS ada:
- [ ] `package.json` (dengan dependencies)
- [ ] `package-lock.json` (lock versions)
- [ ] `server.js` (main app)
- [ ] `database.js` (database)
- [ ] `Dockerfile` (build config)
- [ ] `.dockerignore` (exclude node_modules)
- [ ] `.gitignore` (exclude node_modules)

### File yang TIDAK perlu:
- [ ] `node_modules/` (Railway install sendiri)
- [ ] `animestream.db` (Railway buat baru)
- [ ] `uploads/*.mp4` (video lokal)
- [ ] `.env` (config lokal)

---

## 🚀 Command Deploy:

```bash
# 1. Check .gitignore (pastikan node_modules excluded)
cat .gitignore

# 2. Add files (node_modules otomatis di-skip)
git add .

# 3. Commit
git commit -m "Deploy to Railway"

# 4. Push (tanpa node_modules!)
git push -u origin main
```

**Git otomatis skip `node_modules` karena ada di `.gitignore`!**

---

## 📊 Ukuran Push:

### Dengan `node_modules`:
- ❌ ~500MB
- ❌ Push 10-30 menit
- ❌ Clone lama

### Tanpa `node_modules`:
- ✅ ~5-10MB
- ✅ Push 1-2 menit
- ✅ Clone cepat

---

## 🔍 Cara Cek:

### Cek apa yang akan di-push:
```bash
git status
```

**Kalau muncul `node_modules/`, berarti `.gitignore` belum benar!**

### Cek .gitignore:
```bash
cat .gitignore
```

Harus ada:
```
node_modules/
```

---

## 💡 Tips:

### 1. Selalu Exclude `node_modules`
```bash
# .gitignore
node_modules/
```

### 2. Push `package.json` & `package-lock.json`
Railway butuh ini untuk install dependencies.

### 3. Test Lokal Dulu
```bash
# Hapus node_modules
rm -rf node_modules

# Install ulang
npm install

# Test
npm start
```

Kalau lokal berhasil, Railway pasti berhasil!

---

## ✅ Summary:

**Push ke GitHub:**
- ✅ `package.json` (list dependencies)
- ✅ `package-lock.json` (lock versions)
- ✅ Source code (server.js, database.js, dll)
- ❌ `node_modules` (Railway install sendiri)

**Railway akan:**
1. Clone repo (tanpa node_modules)
2. Build Docker image
3. Run `npm install` (install dependencies)
4. Start server

**Hasil:**
- ✅ Dependencies ter-install
- ✅ App jalan
- ✅ No error

---

**Jadi: TIDAK PERLU push `node_modules`! Railway install otomatis! 🎉**
