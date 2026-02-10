# 📱 Cara Membuat APK dari Website AnimeStream

## Metode 1: Menggunakan Capacitor (Recommended)

### 1. Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
```

Isi konfigurasi:
- App name: AnimeStream
- App ID: com.animestream.app
- Web directory: public

### 2. Build untuk Android
```bash
npx cap add android
npx cap sync
npx cap open android
```

### 3. Build APK di Android Studio
- Buka Android Studio yang terbuka otomatis
- Pilih Build > Build Bundle(s) / APK(s) > Build APK(s)
- APK akan tersimpan di `android/app/build/outputs/apk/`

---

## Metode 2: Menggunakan PWA Builder (Lebih Mudah)

### 1. Deploy Website ke Hosting
Deploy website ke hosting gratis seperti:
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Railway: https://railway.app

### 2. Generate APK
1. Buka https://www.pwabuilder.com/
2. Masukkan URL website yang sudah di-deploy
3. Klik "Start" dan tunggu analisis
4. Pilih "Android" dan klik "Generate"
5. Download APK yang sudah jadi

---

## Metode 3: Menggunakan Cordova

### 1. Install Cordova
```bash
npm install -g cordova
cordova create animestream com.animestream.app AnimeStream
cd animestream
```

### 2. Copy file website
Copy semua file dari folder `public`, `views`, dan `server.js` ke folder `www`

### 3. Build APK
```bash
cordova platform add android
cordova build android --release
```

APK akan tersimpan di `platforms/android/app/build/outputs/apk/`

---

## Metode 4: Menggunakan WebView2APK (Online, Paling Mudah)

### 1. Buka Website Generator
- https://appsgeyser.com/
- https://websitetoapk.com/
- https://gonative.io/

### 2. Masukkan URL Website
Masukkan URL website yang sudah di-deploy

### 3. Kustomisasi
- Upload icon (512x512 px)
- Atur nama aplikasi
- Pilih warna tema

### 4. Download APK
Download APK yang sudah jadi dan install di Android

---

## Tips untuk APK yang Lebih Baik

### 1. Tambahkan Service Worker untuk Offline Support
Buat file `public/sw.js`:
```javascript
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('animestream-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/css/style.css',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
```

### 2. Buat Icon untuk APK
Buat icon dengan ukuran:
- 192x192 px (icon-192.png)
- 512x512 px (icon-512.png)

Simpan di folder `public/images/`

### 3. Update manifest.json
Sudah tersedia di `public/manifest.json`

---

## Rekomendasi

Untuk pemula, gunakan **Metode 2 (PWA Builder)** karena:
- ✅ Paling mudah dan cepat
- ✅ Tidak perlu install software tambahan
- ✅ Hasil APK sudah optimized
- ✅ Support auto-update

Untuk developer yang ingin kontrol penuh, gunakan **Metode 1 (Capacitor)** karena:
- ✅ Akses penuh ke native API Android
- ✅ Bisa tambahkan plugin native
- ✅ Performa lebih baik
- ✅ Lebih profesional

---

## Catatan Penting

1. **Backend Server**: Website ini butuh backend Node.js. Untuk APK, ada 2 opsi:
   - Deploy backend ke cloud (Heroku, Railway, Vercel)
   - Gunakan Firebase/Supabase sebagai backend alternatif

2. **Upload File**: Untuk APK, upload file video sebaiknya ke cloud storage:
   - Firebase Storage
   - AWS S3
   - Cloudinary

3. **Database**: Ganti array di memory dengan database real:
   - Firebase Firestore
   - MongoDB Atlas
   - Supabase

4. **Testing**: Test APK di berbagai device Android sebelum publish ke Play Store
