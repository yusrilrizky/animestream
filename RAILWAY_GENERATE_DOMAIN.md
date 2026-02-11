# 🌐 Railway - Generate Domain (Link Website)

## ❓ Masalah: Link Website Tidak Muncul

Railway tidak otomatis generate domain. Harus di-generate manual.

---

## ✅ Cara Generate Domain:

### Step 1: Buka Railway Dashboard
1. Buka https://railway.app
2. Login
3. Klik project **"animestream"**

### Step 2: Cek Deployment Status
1. Tab **"Deployments"**
2. Cek deployment terakhir
3. Status harus: **"Success"** atau **"Active"**

**Kalau masih "Building" atau "Deploying":**
- Tunggu sampai selesai (3-5 menit)
- Refresh page

### Step 3: Generate Domain
1. Tab **"Settings"** (di sidebar kiri)
2. Scroll ke bawah ke section **"Networking"** atau **"Domains"**
3. Klik **"Generate Domain"** atau **"Add Domain"**
4. Railway akan generate URL otomatis

**Format URL:**
```
https://animestream-production-xxxx.up.railway.app
```

### Step 4: Copy & Test URL
1. Copy URL yang di-generate
2. Paste di browser
3. Tunggu 10-30 detik (DNS propagation)
4. Website harus muncul!

---

## 🔍 Troubleshooting:

### 1. Tombol "Generate Domain" Tidak Ada

**Kemungkinan:**
- Deployment belum selesai
- Project belum active

**Solusi:**
1. Cek tab "Deployments"
2. Pastikan status "Success"
3. Refresh page
4. Coba lagi

### 2. Domain Sudah Di-generate Tapi Tidak Bisa Dibuka

**Error:** "This site can't be reached"

**Solusi:**
1. Tunggu 1-2 menit (DNS propagation)
2. Refresh browser
3. Cek Railway logs:
   - Tab "Deployments" → View Logs
   - Cari "Server berjalan di..."

### 3. Domain Buka Tapi "Application failed to respond"

**Penyebab:** Server crash atau tidak listen di port yang benar

**Solusi:**
1. Cek logs di Railway
2. Cari error message
3. Server harus log: "Server berjalan di http://0.0.0.0:3000"

### 4. Domain Tidak Muncul di Settings

**Kemungkinan:** Railway UI berubah

**Alternatif Lokasi:**
- Tab "Settings" → "Networking"
- Tab "Settings" → "Domains"
- Tab "Settings" → "Public Networking"
- Klik project name → "Settings"

---

## 📊 Cek Status Deployment:

### Railway Dashboard → Deployments

**Status yang Benar:**
```
✅ Success
✅ Active
✅ Running
```

**Status yang Salah:**
```
❌ Failed
❌ Crashed
⚠️ Building (tunggu selesai)
⚠️ Deploying (tunggu selesai)
```

---

## 🔧 Kalau Deployment Failed:

### Cek Logs:
1. Tab "Deployments"
2. Klik deployment yang failed
3. View "Build Logs" atau "Deploy Logs"
4. Cari error message

### Common Errors:

**"Cannot find module..."**
- Dependencies issue
- Fix: Cek package.json

**"OAuth2Strategy requires..."**
- Sudah di-fix!
- Push code terbaru

**"Database error..."**
- Database issue
- Sudah di-fix!

---

## 🎯 Checklist Generate Domain:

- [ ] Deployment status: **Success**
- [ ] Tab "Settings" dibuka
- [ ] Section "Domains" atau "Networking" ditemukan
- [ ] Klik "Generate Domain"
- [ ] URL di-generate
- [ ] URL di-copy
- [ ] URL dibuka di browser
- [ ] Website muncul!

---

## 📸 Screenshot Lokasi (Referensi):

### Railway Dashboard:
```
┌─────────────────────────────────────┐
│ Project: animestream                │
├─────────────────────────────────────┤
│ Sidebar:                            │
│  • Deployments                      │
│  • Metrics                          │
│  • Variables                        │
│  • Settings  ← KLIK INI             │
└─────────────────────────────────────┘
```

### Settings Page:
```
┌─────────────────────────────────────┐
│ Settings                            │
├─────────────────────────────────────┤
│ General                             │
│ Environment                         │
│ Networking / Domains  ← CARI INI    │
│  ┌───────────────────────────────┐  │
│  │ Generate Domain  ← KLIK INI   │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 💡 Tips:

### 1. Tunggu Deployment Selesai
Jangan generate domain sebelum deployment success.

### 2. Refresh Page
Kalau tombol tidak muncul, refresh page.

### 3. Cek Multiple Tabs
Railway kadang taruh "Domains" di tab berbeda.

### 4. Custom Domain (Opsional)
Kalau mau pakai domain sendiri:
- Settings → Domains → "Add Custom Domain"
- Masukkan domain (contoh: animestream.com)
- Update DNS records di domain provider

---

## 🚀 Setelah Domain Di-generate:

### Test Website:
```
https://animestream-production-xxxx.up.railway.app
```

**Harus redirect ke:**
```
https://animestream-production-xxxx.up.railway.app/login
```

**Login:**
- Username: `admin`
- Password: `admin123`

---

## ✅ Summary:

**Langkah Generate Domain:**
1. ✅ Deployment success
2. ✅ Settings → Domains/Networking
3. ✅ Generate Domain
4. ✅ Copy URL
5. ✅ Buka di browser
6. ✅ Website muncul!

**Kalau masih tidak muncul:**
- Cek deployment logs
- Pastikan server jalan
- Tunggu DNS propagation (1-2 menit)

---

## 📞 Masih Tidak Bisa?

### Cek:
1. **Deployment status** - Harus "Success"
2. **Logs** - Cari "Server berjalan di..."
3. **Domain** - Sudah di-generate?
4. **Browser** - Refresh atau clear cache

### Alternatif:
Kalau Railway UI membingungkan, coba:
- Logout & login ulang
- Buka di browser berbeda
- Clear browser cache

---

**Generate domain dulu, baru website bisa diakses! 🌐**
