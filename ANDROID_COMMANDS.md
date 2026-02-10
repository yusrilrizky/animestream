# 📱 AnimeStream - Android Commands Cheat Sheet

## 🚀 Quick Commands

### Start Server
```bash
npm run android
# atau
bash start-android.sh
# atau
node server.js
```

### Stop Server
```bash
npm run stop
# atau
bash stop-android.sh
# atau
pkill node
```

### Restart Server
```bash
npm run stop && npm run android
```

---

## 📦 Installation

### First Time Setup
```bash
# 1. Setup Termux
bash .termux-setup.sh

# 2. Navigate to project
cd ~/storage/shared/AnimeStream

# 3. Install dependencies
npm install

# 4. Setup environment
cp .env.example .env
nano .env

# 5. Start server
npm run android
```

---

## 🔧 Configuration

### Edit Environment
```bash
nano .env
```

### Edit Server Config
```bash
nano server.js
```

### Edit Database
```bash
sqlite3 animestream.db
```

---

## 📊 Monitoring

### View Logs
```bash
tail -f server.log
```

### Check Process
```bash
ps aux | grep node
```

### Check Port
```bash
netstat -tulpn | grep 3000
```

### Check Memory
```bash
free -h
```

### Check Disk
```bash
df -h
```

---

## 🗄️ Database

### Initialize Database
```bash
npm run init-db
```

### Reset Admin
```bash
npm run reset-admin
```

### Backup Database
```bash
npm run backup-db
# atau
cp animestream.db backup/animestream-$(date +%Y%m%d).db
```

### Restore Database
```bash
npm run restore-db
# atau
cp backup/animestream-20260210.db animestream.db
```

### View Database
```bash
sqlite3 animestream.db
.tables
.schema users
SELECT * FROM users;
.quit
```

---

## 📁 File Management

### Create Uploads Folder
```bash
mkdir -p uploads
chmod 777 uploads
```

### Clear Uploads
```bash
rm -rf uploads/*
```

### Check Folder Size
```bash
du -sh uploads/
```

### List Files
```bash
ls -lah uploads/
```

---

## 🌐 Network

### Get IP Address
```bash
ifconfig | grep "inet "
# atau
ip addr show
```

### Test Connection
```bash
curl http://localhost:3000
```

### Check Open Ports
```bash
netstat -tulpn
```

---

## 🔄 Updates

### Pull from Git
```bash
git pull origin main
```

### Update Dependencies
```bash
npm update
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
```

### Clear NPM Cache
```bash
npm cache clean --force
```

---

## 🐛 Debugging

### Check Node Version
```bash
node --version
npm --version
```

### Check Errors
```bash
cat server.log | grep ERROR
```

### Test Email
```bash
npm run test-email
```

### Verbose Logging
```bash
DEBUG=* node server.js
```

---

## 🔐 Security

### Change Admin Password
```bash
node reset-admin.js
```

### Generate Secret Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check Permissions
```bash
ls -la
```

### Fix Permissions
```bash
chmod -R 755 .
chmod 777 uploads
```

---

## 📱 Termux Specific

### Keep Awake
```bash
termux-wake-lock
```

### Release Wake Lock
```bash
termux-wake-unlock
```

### Battery Info
```bash
termux-battery-status
```

### Notification
```bash
termux-notification --title "Server Started" --content "AnimeStream is running"
```

### Toast Message
```bash
termux-toast "Server started successfully"
```

---

## 🌍 Ngrok (Internet Access)

### Start Ngrok
```bash
ngrok http 3000
```

### Start with Custom Domain
```bash
ngrok http 3000 --domain=your-domain.ngrok-free.app
```

### Ngrok Status
```bash
curl http://localhost:4040/api/tunnels
```

---

## 🔄 Background Running

### Run in Background
```bash
nohup node server.js > server.log 2>&1 &
```

### Check Background Process
```bash
jobs
ps aux | grep node
```

### Bring to Foreground
```bash
fg
```

### Kill Background Process
```bash
pkill node
# atau
kill -9 $(pgrep -f "node server.js")
```

---

## 📝 Shortcuts

### Create Alias (Add to ~/.bashrc)
```bash
echo 'alias anime-start="cd ~/storage/shared/AnimeStream && npm run android"' >> ~/.bashrc
echo 'alias anime-stop="cd ~/storage/shared/AnimeStream && npm run stop"' >> ~/.bashrc
echo 'alias anime-logs="cd ~/storage/shared/AnimeStream && tail -f server.log"' >> ~/.bashrc
source ~/.bashrc
```

### Use Aliases
```bash
anime-start   # Start server
anime-stop    # Stop server
anime-logs    # View logs
```

---

## 🎯 Common Tasks

### Full Restart
```bash
pkill node && rm -rf node_modules && npm install && npm run android
```

### Clean Start
```bash
pkill node && rm server.log && npm run android
```

### Update and Restart
```bash
git pull && npm install && pkill node && npm run android
```

### Backup Everything
```bash
tar -czf animestream-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=uploads \
  .
```

---

## 📞 Help

### View Help
```bash
node server.js --help
```

### Check Documentation
```bash
cat README_ANDROID.md
cat ACODE_SETUP.md
```

---

## ⚡ Performance

### Clear Logs
```bash
> server.log
```

### Optimize Database
```bash
sqlite3 animestream.db "VACUUM;"
```

### Check Node Memory
```bash
node --max-old-space-size=512 server.js
```

---

## 🎉 Quick Reference

| Command | Description |
|---------|-------------|
| `npm run android` | Start server |
| `npm run stop` | Stop server |
| `npm run init-db` | Initialize database |
| `npm run reset-admin` | Reset admin password |
| `npm run backup-db` | Backup database |
| `tail -f server.log` | View logs |
| `pkill node` | Kill all node processes |
| `ifconfig` | Get IP address |
| `nano .env` | Edit config |

---

Dibuat untuk AnimeStream © 2026
