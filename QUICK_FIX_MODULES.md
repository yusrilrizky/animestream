# 🚀 Quick Fix: Module & Port Errors

## ❌ Problem 1: "Module Not Found"

### ⚡ Quick Fix (Windows):
```bash
npm install --legacy-peer-deps
```

### ⚡ Quick Fix (Android/Acode):
```bash
npm install --legacy-peer-deps
```

---

## ❌ Problem 2: "Port 3000 Already in Use"

### ⚡ Quick Fix (Windows):
```bash
# Double click file ini:
stop-server.bat

# Atau manual:
taskkill /F /IM node.exe
```

### ⚡ Quick Fix (Android/Termux):
```bash
lsof -ti:3000 | xargs kill -9
```

### ⚡ Quick Fix (Acode Terminal):
```bash
# Restart Termux atau:
lsof -ti:3000 | xargs kill -9
```

---

## ✅ Start Server (Recommended)

### Windows:
```bash
# Double click:
start-server.bat
```

### Android/Termux:
```bash
bash start-android.sh
```

### Acode Terminal:
```bash
node server.js
```

---

## 🔄 Reset Everything (Nuclear Option)

### Windows:
```bash
# 1. Stop all
taskkill /F /IM node.exe

# 2. Clean
rmdir /s /q node_modules
del package-lock.json

# 3. Reinstall
npm install --legacy-peer-deps

# 4. Start
node server.js
```

### Android/Termux:
```bash
# 1. Stop all
lsof -ti:3000 | xargs kill -9

# 2. Clean
rm -rf node_modules package-lock.json

# 3. Reinstall
npm install --legacy-peer-deps

# 4. Start
node server.js
```

---

## 📱 Access Server

After server starts:
- **Local**: http://localhost:3000
- **Login**: admin / admin123

---

**Need more help?** Check `TROUBLESHOOTING_MODULES.md`
