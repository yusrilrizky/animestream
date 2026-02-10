# 📱 AnimeStream untuk Android

Panduan lengkap menjalankan AnimeStream di HP Android menggunakan Acode dan Termux.

## 🚀 Quick Start

### 1. Install Aplikasi
- **Termux**: [Download dari F-Droid](https://f-droid.org/packages/com.termux/)
- **Acode**: [Download dari Play Store](https://play.google.com/store/apps/details?id=com.foxdebug.acode)

### 2. Setup Termux
```bash
# Update packages
pkg update && pkg upgrade

# Install Node.js
pkg install nodejs

# Setup storage access
termux-setup-storage
```

### 3. Copy Project
```bash
# Navigate ke folder project
cd ~/storage/shared/AnimeStream

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### 4. Jalankan Server
```bash
# Menggunakan script helper
bash start-android.sh

# Atau manual
node server.js
```

### 5. Akses Aplikasi
Buka browser dan akses:
- **Local**: `http://localhost:3000`
- **Network**: `http://<your-ip>:3000`

**Login Default:**
- Username: `admin`
- Password: `admin123`

---

## 📋 Commands Cepat

### Start Server
```bash
bash start-android.sh
```

### Stop Server
```bash
bash stop-android.sh
```

### Restart Server
```bash
bash stop-android.sh && bash start-android.sh
```

### View Logs
```bash
tail -f server.log
```

---

## 🔧 Konfigurasi

### Edit .env
```bash
nano .env
```

Minimal configuration:
```env
PORT=3000
SESSION_SECRET=your-secret-key
BASE_URL=http://localhost:3000
```

### Permissions
```bash
# Berikan permission ke uploads folder
chmod 777 uploads

# Berikan permission ke scripts
chmod +x start-android.sh
chmod +x stop-android.sh
```

---

## 🌐 Akses dari Jaringan Lokal

### 1. Cek IP Address
```bash
ifconfig | grep "inet "
```

### 2. Update BASE_URL di .env
```env
BASE_URL=http://192.168.1.100:3000
```

### 3. Akses dari HP Lain
Buka browser di HP lain (dalam jaringan yang sama):
```
http://192.168.1.100:3000
```

---

## 🔄 Background Running

### Jalankan di Background
```bash
nohup node server.js > server.log 2>&1 &
```

### Cek Process
```bash
ps aux | grep node
```

### Stop Background Process
```bash
pkill node
```

---

## 📱 Tips Android

### 1. Keep Termux Running
- Jangan close Termux saat server berjalan
- Gunakan **Termux:Boot** untuk auto-start
- Install **Termux:Widget** untuk shortcut

### 2. Battery Optimization
- Disable battery optimization untuk Termux
- Settings → Apps → Termux → Battery → Unrestricted

### 3. Storage Access
Jika error akses file:
```bash
termux-setup-storage
# Izinkan akses saat diminta
```

### 4. Port Conflict
Jika port 3000 sudah digunakan:
```bash
PORT=8080 node server.js
```

---

## 🐛 Troubleshooting

### Error: Cannot find module
```bash
npm install
```

### Error: EACCES permission denied
```bash
chmod -R 755 .
chmod 777 uploads
```

### Error: Port already in use
```bash
# Kill process
pkill node

# Atau gunakan port lain
PORT=8080 node server.js
```

### Database locked
```bash
rm animestream.db-journal
node server.js
```

### Upload tidak berfungsi
```bash
mkdir -p uploads
chmod 777 uploads
```

---

## 📦 Update Project

### Pull dari Git
```bash
git pull origin main
npm install
```

### Backup Database
```bash
cp animestream.db animestream.db.backup
```

### Reset Admin Password
```bash
node reset-admin.js
```

---

## 🌍 Akses dari Internet (Ngrok)

### 1. Install Ngrok
```bash
pkg install wget unzip
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-arm64.zip
unzip ngrok-v3-stable-linux-arm64.zip
chmod +x ngrok
mv ngrok $PREFIX/bin/
```

### 2. Setup Token
```bash
ngrok config add-authtoken <your-token>
```

### 3. Start Tunnel
```bash
ngrok http 3000
```

### 4. Akses URL
```
https://xxxx-xx-xx-xx-xx.ngrok-free.app
```

---

## 📊 Monitoring

### Check Server Status
```bash
curl http://localhost:3000
```

### View Real-time Logs
```bash
tail -f server.log
```

### Check Memory Usage
```bash
free -h
```

### Check Disk Space
```bash
df -h
```

---

## 🔐 Security

### Production Checklist
- [ ] Ganti SESSION_SECRET di .env
- [ ] Ganti password admin default
- [ ] Setup HTTPS (Ngrok/Cloudflare)
- [ ] Backup database berkala
- [ ] Update dependencies reguler

### Backup Database
```bash
# Manual backup
cp animestream.db backup/animestream-$(date +%Y%m%d).db

# Restore backup
cp backup/animestream-20260210.db animestream.db
```

---

## 📝 File Structure

```
AnimeStream/
├── node_modules/          # Dependencies
├── public/               # Static files
│   ├── audio/           # Music files
│   ├── css/             # Stylesheets
│   ├── images/          # Images
│   └── js/              # JavaScript
├── uploads/             # Uploaded videos
├── views/               # EJS templates
├── .env                 # Environment config
├── database.js          # Database setup
├── server.js            # Main server
├── package.json         # NPM config
├── start-android.sh     # Start script
├── stop-android.sh      # Stop script
└── animestream.db       # SQLite database
```

---

## 🎯 Workflow Recommended

1. **Edit Code** → Gunakan Acode untuk edit
2. **Run Server** → Gunakan Termux untuk jalankan
3. **Test App** → Buka di Chrome/Browser
4. **Debug** → Lihat logs di Termux

---

## 📞 Support

### Check Logs
```bash
cat server.log
```

### Check Node Version
```bash
node --version
npm --version
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
```

---

## ⚡ Performance Tips

### 1. Clear Cache
```bash
npm cache clean --force
```

### 2. Optimize Database
```bash
sqlite3 animestream.db "VACUUM;"
```

### 3. Limit Upload Size
Edit `server.js`:
```javascript
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});
```

---

## 🎉 Selesai!

AnimeStream sekarang berjalan di HP Android kamu!

**Akses:**
- Local: `http://localhost:3000`
- Network: `http://<your-ip>:3000`

**Login:**
- Username: `admin`
- Password: `admin123`

**Dokumentasi Lengkap:**
- [ACODE_SETUP.md](ACODE_SETUP.md) - Setup detail
- [README.md](README.md) - Dokumentasi utama
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Deploy guide

---

Dibuat untuk AnimeStream © 2026
