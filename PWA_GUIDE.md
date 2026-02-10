# 📱 PWA (Progressive Web App) Guide

## 🎯 Apa itu PWA?

PWA = Website yang bisa di-install seperti aplikasi!

**Kelebihan:**
- ✅ Tidak perlu APK
- ✅ Install langsung dari browser
- ✅ Auto update
- ✅ Ringan
- ✅ Work offline (dengan service worker)

**Kekurangan:**
- ⚠️ Tidak di Play Store
- ⚠️ Fitur lebih terbatas dari native app

---

## ✅ Status PWA AnimeStream

File `manifest.json` sudah ada di project!

File: `public/manifest.json`

---

## 🚀 Cara Install PWA

### Di Android (Chrome):
1. Buka website di Chrome
2. Klik menu (⋮)
3. Pilih **"Add to Home screen"**
4. Klik **"Install"**
5. App muncul di home screen!

### Di iPhone (Safari):
1. Buka website di Safari
2. Klik tombol Share
3. Pilih **"Add to Home Screen"**
4. Klik **"Add"**

### Di Desktop (Chrome):
1. Buka website di Chrome
2. Klik icon install di address bar
3. Klik **"Install"**

---

## 🔧 Setup Service Worker (Offline Mode)

Tambahkan file ini untuk offline support:

### File: `public/sw.js`
```javascript
const CACHE_NAME = 'animestream-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/css/auth.css',
  '/js/background-music.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### Register Service Worker

Tambahkan di `views/index-new.ejs` sebelum `</body>`:
```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW error', err));
  }
</script>
```

---

## 🎨 Customize Manifest

Edit `public/manifest.json`:

```json
{
  "name": "AnimeStream",
  "short_name": "AnimeStream",
  "description": "Platform streaming anime terbaik",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f0f1e",
  "theme_color": "#a855f7",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 📱 Buat Icon PWA

Buat 2 icon:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

Simpan di: `public/images/`

---

## ✅ Test PWA

### 1. Lighthouse (Chrome DevTools)
1. Buka website
2. F12 → **Lighthouse**
3. Pilih **Progressive Web App**
4. Klik **Generate report**
5. Lihat score (target: >90)

### 2. Manual Test
1. Buka website di HP
2. Coba install
3. Buka app dari home screen
4. Test offline mode

---

## 🌐 Deploy PWA

PWA otomatis aktif setelah:
1. Website di-hosting (HTTPS wajib!)
2. manifest.json ada
3. Service worker registered

User bisa langsung install!

---

## 📊 PWA vs APK

| Fitur | PWA | APK |
|-------|-----|-----|
| Install | Browser | File APK |
| Update | Auto | Manual/Auto |
| Size | Kecil | Besar |
| Play Store | ❌ | ✅ |
| Offline | ✅ (dengan SW) | ✅ |
| Push Notif | ✅ | ✅ |
| Native API | Terbatas | Full |

---

## 🎯 Rekomendasi

**Gunakan PWA jika:**
- Mau cepat
- Tidak perlu Play Store
- Target user tech-savvy

**Gunakan APK jika:**
- Mau di Play Store
- Butuh fitur native
- Target user umum

**Atau gunakan KEDUANYA!** 🎉

---

**© 2026 AnimeStream**
