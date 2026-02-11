# 📱 Cara Build APK AnimeStream

## 🎯 Langkah-Langkah Build APK

### 1. Install Flutter

**Windows:**
1. Download Flutter SDK: https://docs.flutter.dev/get-started/install/windows
2. Extract ke `C:\flutter`
3. Tambahkan ke PATH: `C:\flutter\bin`
4. Buka CMD dan jalankan: `flutter doctor`

**Atau pakai Chocolatey:**
```cmd
choco install flutter
```

### 2. Install Android Studio

1. Download Android Studio: https://developer.android.com/studio
2. Install Android Studio
3. Buka Android Studio → Settings → Plugins → Install "Flutter" plugin
4. Install Android SDK (otomatis saat install Android Studio)

### 3. Setup Android SDK

1. Buka Android Studio → Settings → Appearance & Behavior → System Settings → Android SDK
2. Install:
   - Android SDK Platform 34 (Android 14)
   - Android SDK Build-Tools 34
   - Android SDK Command-line Tools
   - Android SDK Platform-Tools

### 4. Accept Android Licenses

Buka CMD dan jalankan:
```cmd
flutter doctor --android-licenses
```

Tekan `y` untuk accept semua licenses.

### 5. Update URL Website

Edit file `flutter_app/lib/main.dart` baris 149:

```dart
// GANTI INI DENGAN URL RAILWAY KAMU!
final String websiteUrl = 'https://your-railway-app.railway.app';
```

Ganti dengan URL Railway kamu, contoh:
```dart
final String websiteUrl = 'https://animestream-production.up.railway.app';
```

### 6. Build APK

Buka CMD di folder `flutter_app` dan jalankan:

```cmd
cd flutter_app
flutter pub get
flutter build apk --release
```

### 7. APK Siap!

APK akan ada di:
```
flutter_app/build/app/outputs/flutter-apk/app-release.apk
```

Copy APK ke HP dan install!

---

## 🚀 Build APK Otomatis (Script)

Aku sudah buatkan script otomatis! Tinggal jalankan:

### Windows:
```cmd
cd flutter_app
build_apk.bat
```

### Linux/Mac:
```bash
cd flutter_app
chmod +x build_apk.sh
./build_apk.sh
```

Script akan otomatis:
1. Check Flutter installed
2. Get dependencies
3. Build APK
4. Copy APK ke folder `output/`

---

## 📦 Ukuran APK

- APK Release: ~20-30 MB
- APK Debug: ~40-50 MB

Pakai release untuk distribusi!

---

## 🎨 Customize App

### Ganti Nama App:
Edit `flutter_app/android/app/src/main/AndroidManifest.xml`:
```xml
android:label="AnimeStream"
```

### Ganti Package Name:
Edit `flutter_app/android/app/build.gradle`:
```gradle
applicationId "com.animestream.app"
```

### Ganti Icon:
Replace file di:
```
flutter_app/android/app/src/main/res/mipmap-*/ic_launcher.png
```

Atau pakai tool: https://icon.kitchen/

---

## ❓ Troubleshooting

### Error: Flutter not found
**Solusi:** Install Flutter dan tambahkan ke PATH

### Error: Android SDK not found
**Solusi:** Install Android Studio dan setup SDK

### Error: License not accepted
**Solusi:** Jalankan `flutter doctor --android-licenses`

### Error: Gradle build failed
**Solusi:** 
1. Hapus folder `flutter_app/build`
2. Jalankan `flutter clean`
3. Build lagi

### APK tidak bisa install di HP
**Solusi:** 
1. Enable "Install from Unknown Sources" di HP
2. Pastikan APK tidak corrupt (download ulang)

---

## 📱 Install APK di HP

1. Copy `app-release.apk` ke HP (via USB, WhatsApp, atau Google Drive)
2. Buka file APK di HP
3. Klik "Install"
4. Kalau ada warning "Unknown Source", enable "Install from Unknown Sources"
5. Selesai! Buka app AnimeStream

---

## 🎉 Fitur App

✅ WebView full website AnimeStream
✅ Splash screen dengan logo
✅ Check koneksi internet
✅ Back button navigation
✅ Refresh button
✅ Home button
✅ Handle WhatsApp links
✅ Handle external links (Google Drive)
✅ Progress bar loading
✅ Error handling
✅ Exit confirmation dialog
✅ Support landscape mode untuk nonton video
✅ Cache enabled untuk loading lebih cepat

---

## 📞 Butuh Bantuan?

WhatsApp: https://wa.me/6282297706541

---

**© 2026 AnimeStream - Streaming Anime Gratis**
