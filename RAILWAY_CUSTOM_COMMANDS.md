# 🔧 Railway Custom Build & Start Commands

## ❓ Apa itu Custom Build & Start?

### Custom Build Command
Perintah untuk **build** aplikasi sebelum deploy.

### Custom Start Command
Perintah untuk **start** aplikasi setelah build.

---

## 🎯 Untuk Project Ini: TIDAK PERLU!

### Kenapa?

Karena kita pakai **Dockerfile**, Railway otomatis:
1. Build dari Dockerfile
2. Start dari Dockerfile

**Dockerfile sudah handle semuanya!**

---

## 📋 Kapan Perlu Custom Commands?

### Kalau TIDAK Pakai Dockerfile:

Railway perlu tahu cara build & start aplikasi.

#### Contoh 1: Node.js Biasa (Tanpa Docker)

**Custom Build Command:**
```bash
npm install
```

**Custom Start Command:**
```bash
node server.js
```

#### Contoh 2: Node.js dengan Build Step

**Custom Build Command:**
```bash
npm install && npm run build
```

**Custom Start Command:**
```bash
npm start
```

#### Contoh 3: TypeScript

**Custom Build Command:**
```bash
npm install && npm run build
```

**Custom Start Command:**
```bash
node dist/server.js
```

---

## 🐳 Dengan Dockerfile (Project Ini)

### Tidak Perlu Custom Commands!

Railway baca dari **Dockerfile**:

```dockerfile
# Build commands ada di sini
RUN npm install --production

# Start command ada di sini
CMD ["node", "server.js"]
```

**Railway otomatis jalankan Dockerfile!**

---

## 🔍 Cara Setting di Railway

### Kalau Mau Set Manual (Tidak Recommended):

1. Railway dashboard → Project
2. Tab "Settings"
3. Scroll ke "Build & Deploy"
4. Isi:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

### Tapi Untuk Project Ini:

**KOSONGKAN!** Biarkan Railway pakai Dockerfile.

---

## ✅ Konfigurasi Project Ini

### File: `railway.json`

```json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  }
}
```

**Artinya:** Railway pakai Dockerfile, bukan custom commands.

### File: `Dockerfile`

```dockerfile
# Build commands
COPY package*.json ./
RUN npm install --production

# Start command
CMD ["node", "server.js"]
```

**Semua sudah ada di Dockerfile!**

---

## 🎯 Kesimpulan

### Untuk Project Ini:

| Setting | Value | Keterangan |
|---------|-------|------------|
| **Builder** | DOCKERFILE | Pakai Dockerfile |
| **Build Command** | (kosong) | Dari Dockerfile |
| **Start Command** | (kosong) | Dari Dockerfile |

### Railway Akan:

1. ✅ Detect Dockerfile
2. ✅ Build Docker image
3. ✅ Run `npm install` (dari Dockerfile)
4. ✅ Start `node server.js` (dari Dockerfile)

**Tidak perlu setting apapun!**

---

## 💡 Tips

### 1. Pakai Dockerfile (Recommended)
- ✅ Lebih reliable
- ✅ Consistent environment
- ✅ Tidak perlu custom commands

### 2. Kalau Tidak Pakai Docker
- Set custom build: `npm install`
- Set custom start: `node server.js`

### 3. Cek Logs
Railway dashboard → Deployments → View Logs

Lihat command apa yang dijalankan.

---

## 🐛 Troubleshooting

### Railway Tidak Detect Dockerfile?

**Solusi:**
1. Pastikan file `Dockerfile` ada di root project
2. Pastikan `railway.json` ada:
   ```json
   {
     "build": {
       "builder": "DOCKERFILE"
     }
   }
   ```
3. Redeploy

### Build Failed?

**Cek Logs:**
- Railway dashboard → Deployments → Build Logs
- Lihat error message

**Common Issues:**
- Dockerfile syntax error
- Dependencies missing
- Build timeout

### Start Failed?

**Cek Logs:**
- Railway dashboard → Deployments → Deploy Logs
- Lihat error message

**Common Issues:**
- Port not configured (sudah fix)
- Database error (sudah fix)
- Missing files

---

## 📚 Referensi

### Railway Docs:
- https://docs.railway.app/deploy/builds
- https://docs.railway.app/deploy/dockerfiles

### Project Files:
- `Dockerfile` - Build & start config
- `railway.json` - Railway config
- `.dockerignore` - Exclude files

---

## ✅ Summary

**Untuk project ini:**

❌ **TIDAK PERLU** custom build command
❌ **TIDAK PERLU** custom start command

✅ **Dockerfile sudah handle semuanya!**

**Tinggal push ke GitHub → Deploy di Railway → Done!**

---

## 🚀 Quick Deploy

```bash
# 1. Push ke GitHub
git add .
git commit -m "Deploy to Railway"
git push

# 2. Deploy di Railway
# - Buka railway.app
# - New Project → Deploy from GitHub
# - Pilih repo animestream
# - Railway otomatis detect Dockerfile
# - Done!
```

**Tidak perlu setting custom commands!**
