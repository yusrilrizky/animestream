# 🚂 AnimeStream - Railway Deployment

## ⚡ Quick Deploy (5 Menit)

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "Deploy to Railway"
git remote add origin https://github.com/USERNAME/animestream.git
git push -u origin main
```

### 2. Deploy di Railway
1. Buka https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub repo
4. Pilih repo `animestream`
5. Tunggu 2-3 menit
6. ✅ DONE!

### 3. Test
- Health: `https://your-app.railway.app/health`
- Login: `https://your-app.railway.app/login`
- Username: `admin` / Password: `admin123`

---

## 🔧 Local Testing

```bash
# Install dependencies
npm install

# Start server
npm start

# Test health check
npm run test-health

# Test Railway config
npm run test-railway
```

---

## 📚 Documentation

- **Quick Start:** `DEPLOY_SEKARANG.md`
- **Full Guide:** `RAILWAY_DEPLOY.md`
- **Troubleshooting:** `PERBAIKAN_RAILWAY.md`
- **Quick Reference:** `RAILWAY_QUICK_FIX.txt`

---

## ✅ Features

- ✨ **FREE** hosting ($5/month credit)
- 💾 **Persistent data** (database & videos)
- 🚀 **Auto-deploy** from GitHub
- 📊 **Logs & monitoring**
- 🔒 **HTTPS** enabled
- 🌐 **Custom domain** support

---

## 🐛 Troubleshooting

### Server Offline?
1. Cek logs di Railway dashboard
2. Tunggu 1-2 menit (server starting)
3. Test health: `/health`

### Build Failed?
1. Cek `nixpacks.toml` ada
2. Cek `railway.toml` ada
3. Redeploy

### Database Error?
Set env var: `DATABASE_PATH=/tmp/animestream.db`

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

---

## 🎯 Next Steps

1. ✅ Deploy to Railway
2. ✅ Test all features
3. ✅ Change admin password
4. ✅ Share URL
5. 📱 Build APK (optional)

**Happy Streaming! 🎉**
