# 📱 AnimeStream Mobile App

Flutter WebView app untuk AnimeStream - Streaming Anime Gratis

## 🎯 Fitur

- ✅ Full website AnimeStream dalam app
- ✅ Splash screen dengan logo
- ✅ Check koneksi internet otomatis
- ✅ Back button navigation (kembali ke halaman sebelumnya)
- ✅ Refresh button (reload halaman)
- ✅ Home button (kembali ke homepage)
- ✅ Support landscape mode untuk nonton video
- ✅ Handle WhatsApp links (buka di WhatsApp)
- ✅ Handle external links (Google Drive, dll)
- ✅ Loading progress bar
- ✅ Error handling dengan dialog
- ✅ Exit confirmation dialog
- ✅ Cache enabled untuk loading lebih cepat
- ✅ Purple theme sesuai website

## 📦 Requirements

- Flutter SDK 3.0.0 atau lebih baru
- Android Studio dengan Android SDK
- Java JDK 8 atau lebih baru

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd flutter_app
flutter pub get
```

### 2. Update Website URL

Edit `lib/main.dart` baris 149:

```dart
final String websiteUrl = 'https://your-railway-app.railway.app';
```

Ganti dengan URL Railway kamu!

### 3. Build APK

**Manual:**
```bash
flutter build apk --release
```

**Otomatis (Windows):**
```cmd
build_apk.bat
```

**Otomatis (Linux/Mac):**
```bash
chmod +x build_apk.sh
./build_apk.sh
```

### 4. Install APK

APK akan ada di:
- Manual: `build/app/outputs/flutter-apk/app-release.apk`
- Script: `output/AnimeStream.apk`

Copy ke HP dan install!

## 📱 Screenshots

### Splash Screen
- Logo AnimeStream
- Gradient purple background
- Loading indicator
- Check internet connection

### Main Screen
- Full website dalam WebView
- Floating buttons (Refresh & Home)
- Progress bar saat loading
- Back button navigation

## 🎨 Customization

### Ganti Nama App

Edit `android/app/src/main/AndroidManifest.xml`:
```xml
android:label="AnimeStream"
```

### Ganti Package Name

Edit `android/app/build.gradle`:
```gradle
applicationId "com.animestream.app"
```

### Ganti Icon

Replace files di:
```
android/app/src/main/res/mipmap-*/ic_launcher.png
```

Atau pakai tool: https://icon.kitchen/

### Ganti Warna Theme

Edit `lib/main.dart`:
```dart
theme: ThemeData(
  primarySwatch: Colors.purple,
  scaffoldBackgroundColor: const Color(0xFF1a1a2e),
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFF8a2be2),
  ),
),
```

## 🔧 Troubleshooting

### Flutter not found
Install Flutter: https://flutter.dev/docs/get-started/install

### Android SDK not found
Install Android Studio: https://developer.android.com/studio

### License not accepted
```bash
flutter doctor --android-licenses
```

### Build failed
```bash
flutter clean
flutter pub get
flutter build apk --release
```

### APK tidak bisa install
Enable "Install from Unknown Sources" di HP

## 📚 Documentation

- [BUILD_APK.md](BUILD_APK.md) - Panduan lengkap build APK
- [QUICK_START.txt](QUICK_START.txt) - Quick reference

## 🛠️ Tech Stack

- Flutter 3.0+
- flutter_inappwebview ^6.0.0 - WebView engine
- connectivity_plus ^5.0.2 - Check internet connection
- url_launcher ^6.2.1 - Launch external URLs
- permission_handler ^11.0.1 - Handle permissions

## 📦 APK Size

- Release APK: ~20-30 MB
- Debug APK: ~40-50 MB

## 🎯 Target

- Minimum SDK: 21 (Android 5.0 Lollipop)
- Target SDK: 34 (Android 14)

## 📄 License

© 2026 AnimeStream - Streaming Anime Gratis

## 📞 Support

WhatsApp: https://wa.me/6282297706541

---

**Happy Streaming! 🎬**
