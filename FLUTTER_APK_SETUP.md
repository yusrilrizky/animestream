# 📱 Setup Flutter & Build APK AnimeStream - Lengkap!

## 🎯 Overview

Panduan lengkap untuk build APK AnimeStream dari website kamu. APK ini adalah WebView app yang wrap website Railway kamu jadi aplikasi Android.

---

## 📋 Yang Perlu Diinstall

### 1. Flutter SDK
### 2. Android Studio
### 3. Java JDK (otomatis dari Android Studio)

---

## 🚀 Step-by-Step Installation

### STEP 1: Install Flutter SDK

#### Windows:

1. **Download Flutter**
   - Buka: https://docs.flutter.dev/get-started/install/windows
   - Download Flutter SDK (zip file)
   - Extract ke `C:\flutter`

2. **Tambahkan ke PATH**
   - Buka "Environment Variables"
   - Edit "Path" di System Variables
   - Tambahkan: `C:\flutter\bin`
   - Klik OK

3. **Verify Installation**
   ```cmd
   flutter --version
   flutter doctor
   ```

#### Atau Pakai Chocolatey (Lebih Mudah):

```cmd
choco install flutter
```

---

### STEP 2: Install Android Studio

1. **Download Android Studio**
   - Buka: https://developer.android.com/studio
   - Download Android Studio
   - Install dengan default settings

2. **Install Flutter Plugin**
   - Buka Android Studio
   - File → Settings → Plugins
   - Search "Flutter"
   - Install plugin "Flutter"
   - Restart Android Studio

3. **Install Android SDK**
   - Buka Android Studio
   - File → Settings → Appearance & Behavior → System Settings → Android SDK
   - Tab "SDK Platforms": Install "Android 14.0 (API 34)"
   - Tab "SDK Tools": Install:
     - Android SDK Build-Tools 34
     - Android SDK Command-line Tools
     - Android SDK Platform-Tools
     - Android Emulator (optional)
   - Klik Apply → OK

---

### STEP 3: Accept Android Licenses

Buka CMD dan jalankan:

```cmd
flutter doctor --android-licenses
```

Tekan `y` untuk accept semua licenses.

---

### STEP 4: Verify Setup

Jalankan:

```cmd
flutter doctor
```

Output harus seperti ini:

```
[✓] Flutter (Channel stable, 3.x.x)
[✓] Android toolchain - develop for Android devices (Android SDK version 34.0.0)
[✓] Android Studio (version 2023.x)
[✓] Connected device (1 available)
[✓] Network resources
```

Kalau ada [!] atau [✗], fix dulu sebelum lanjut.

---

## 🔧 Setup Project Flutter

### STEP 5: Update Website URL

1. Buka file: `flutter_app/lib/main.dart`
2. Cari baris 149:
   ```dart
   final String websiteUrl = 'https://your-railway-app.railway.app';
   ```
3. Ganti dengan URL Railway kamu:
   ```dart
   final String websiteUrl = 'https://animestream-production.up.railway.app';
   ```

**PENTING:** Pastikan URL benar! Kalau salah, app akan error.

---

### STEP 6: Get Dependencies

Buka CMD di folder `flutter_app`:

```cmd
cd flutter_app
flutter pub get
```

Tunggu sampai selesai download dependencies.

---

## 🏗️ Build APK

### Option 1: Build Manual

```cmd
cd flutter_app
flutter build apk --release
```

Tunggu 5-10 menit (tergantung spek laptop).

APK akan ada di:
```
flutter_app/build/app/outputs/flutter-apk/app-release.apk
```

### Option 2: Build Otomatis (Pakai Script)

**Windows:**
```cmd
cd flutter_app
build_apk.bat
```

**Linux/Mac:**
```bash
cd flutter_app
chmod +x build_apk.sh
./build_apk.sh
```

Script akan otomatis:
1. Check Flutter installed
2. Get dependencies
3. Clean previous build
4. Build APK release
5. Copy APK ke folder `output/`

APK akan ada di:
```
flutter_app/output/AnimeStream.apk
```

---

## 📱 Install APK di HP

### STEP 7: Transfer APK ke HP

**Option 1: USB Cable**
1. Hubungkan HP ke laptop via USB
2. Copy `app-release.apk` atau `AnimeStream.apk` ke HP
3. Buka file manager di HP
4. Cari file APK

**Option 2: WhatsApp/Telegram**
1. Kirim APK ke diri sendiri via WhatsApp/Telegram
2. Download di HP

**Option 3: Google Drive**
1. Upload APK ke Google Drive
2. Download di HP

### STEP 8: Install APK

1. Buka file APK di HP
2. Klik "Install"
3. Kalau ada warning "Install from Unknown Sources":
   - Klik "Settings"
   - Enable "Allow from this source"
   - Kembali dan klik "Install" lagi
4. Tunggu install selesai
5. Klik "Open"

### STEP 9: Selesai! 🎉

App AnimeStream sudah terinstall di HP!

---

## 🎨 Customization (Optional)

### Ganti Nama App

Edit `flutter_app/android/app/src/main/AndroidManifest.xml`:
```xml
<application
    android:label="AnimeStream"
    ...>
```

Ganti "AnimeStream" dengan nama yang kamu mau.

### Ganti Package Name

Edit `flutter_app/android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.animestream.app"
    ...
}
```

Ganti "com.animestream.app" dengan package name kamu.

### Ganti Icon App

1. Buat icon 512x512 px (PNG)
2. Buka: https://icon.kitchen/
3. Upload icon kamu
4. Download icon pack
5. Extract dan replace files di:
   ```
   flutter_app/android/app/src/main/res/mipmap-*/ic_launcher.png
   ```

### Ganti Warna Theme

Edit `flutter_app/lib/main.dart`:
```dart
theme: ThemeData(
  primarySwatch: Colors.purple, // Ganti warna
  scaffoldBackgroundColor: const Color(0xFF1a1a2e), // Ganti background
  appBarTheme: const AppBarTheme(
    backgroundColor: Color(0xFF8a2be2), // Ganti warna appbar
  ),
),
```

Setelah ganti, build ulang APK.

---

## 📊 Informasi APK

### Ukuran APK:
- Release APK: ~20-30 MB
- Debug APK: ~40-50 MB

### Target Android:
- Minimum: Android 5.0 (API 21)
- Target: Android 14 (API 34)

### Permissions:
- Internet (untuk load website)
- Network State (untuk check koneksi)
- Storage (untuk cache)

---

## ❓ Troubleshooting

### Error: Flutter not found
**Solusi:**
1. Install Flutter dari https://flutter.dev
2. Tambahkan `C:\flutter\bin` ke PATH
3. Restart CMD
4. Jalankan `flutter --version`

### Error: Android SDK not found
**Solusi:**
1. Install Android Studio
2. Buka Android Studio → Settings → Android SDK
3. Install Android SDK Platform 34
4. Jalankan `flutter doctor`

### Error: cmdline-tools component is missing
**Solusi:**
1. Buka Android Studio → Settings → Android SDK
2. Tab "SDK Tools"
3. Install "Android SDK Command-line Tools"
4. Klik Apply

### Error: License not accepted
**Solusi:**
```cmd
flutter doctor --android-licenses
```
Tekan `y` untuk semua.

### Error: Gradle build failed
**Solusi:**
```cmd
cd flutter_app
flutter clean
flutter pub get
flutter build apk --release
```

### Error: Unable to locate Android SDK
**Solusi:**
1. Buat file `flutter_app/android/local.properties`
2. Isi dengan:
   ```
   sdk.dir=C:\\Users\\[USERNAME]\\AppData\\Local\\Android\\Sdk
   ```
   Ganti [USERNAME] dengan username Windows kamu.

### APK tidak bisa install di HP
**Solusi:**
1. Enable "Install from Unknown Sources" di HP
2. Pastikan APK tidak corrupt (download ulang)
3. Cek storage HP (minimal 50MB free)

### App crash saat dibuka
**Solusi:**
1. Cek URL website di `main.dart` sudah benar
2. Cek koneksi internet HP
3. Cek website Railway masih online

### Video tidak bisa play di app
**Solusi:**
1. Video dari Cloudinary/Streamable/Vimeo akan work
2. Video dari Streamtape/Doodstream mungkin ada iklan
3. Rotate HP ke landscape untuk fullscreen

---

## 🎯 Fitur App

✅ **WebView Full Website**
- Load website Railway kamu dalam app
- Support semua fitur website (login, upload, watch, dll)

✅ **Splash Screen**
- Logo AnimeStream
- Gradient purple background
- Loading indicator
- Check internet connection

✅ **Navigation**
- Back button: Kembali ke halaman sebelumnya
- Home button: Kembali ke homepage
- Refresh button: Reload halaman

✅ **Video Player**
- Support landscape mode
- Fullscreen video
- Support semua platform (Cloudinary, Streamtape, dll)

✅ **External Links**
- WhatsApp links buka di WhatsApp
- Google Drive links buka di browser
- External links buka di browser

✅ **Error Handling**
- No internet dialog
- Error page dialog
- Exit confirmation dialog

✅ **Performance**
- Cache enabled (loading lebih cepat)
- Progress bar loading
- Smooth navigation

---

## 📚 File Structure

```
flutter_app/
├── lib/
│   └── main.dart              # Main app code
├── android/
│   ├── app/
│   │   ├── build.gradle       # Android config
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── kotlin/
│   │       └── res/           # Icons & resources
│   ├── build.gradle
│   └── settings.gradle
├── pubspec.yaml               # Dependencies
├── build_apk.bat              # Build script (Windows)
├── build_apk.sh               # Build script (Linux/Mac)
├── BUILD_APK.md               # Build guide
├── QUICK_START.txt            # Quick reference
└── README.md                  # Documentation
```

---

## 🎓 Tips & Tricks

### 1. Build APK Lebih Cepat
```cmd
flutter build apk --release --split-per-abi
```
Ini akan generate 3 APK (arm64, armeabi, x86). Pilih yang sesuai HP kamu.

### 2. Build APK Lebih Kecil
Edit `flutter_app/android/app/build.gradle`:
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

### 3. Test di Emulator
```cmd
flutter emulators --launch <emulator_id>
flutter run
```

### 4. Debug di HP Real
1. Enable "Developer Options" di HP
2. Enable "USB Debugging"
3. Hubungkan HP via USB
4. Jalankan:
   ```cmd
   flutter devices
   flutter run
   ```

### 5. Build APK Split
```cmd
flutter build apk --release --split-per-abi
```
Generate APK terpisah untuk setiap architecture (lebih kecil).

---

## 📞 Butuh Bantuan?

WhatsApp: https://wa.me/6282297706541

---

## 🎉 Selesai!

Sekarang kamu punya APK AnimeStream yang bisa diinstall di HP!

**Next Steps:**
1. Test APK di HP
2. Share ke teman-teman
3. Upload ke Google Drive untuk distribusi
4. (Optional) Publish ke Google Play Store

**Happy Streaming! 🎬**

---

**© 2026 AnimeStream - Streaming Anime Gratis**
