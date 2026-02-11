# 📱 Build APK Manual - AnimeStream

## ⚠️ Catatan Penting

Build APK pertama kali akan memakan waktu **10-20 menit** karena perlu download:
- Gradle 8.11.1 (~150MB)
- Android SDK Build Tools (~100MB)
- Android NDK (~500MB)
- Dependencies lainnya

Ini normal! Setelah pertama kali, build berikutnya akan lebih cepat (2-5 menit).

---

## 🚀 Cara Build APK (Step-by-Step)

### 1. Buka CMD/PowerShell

Buka CMD atau PowerShell di folder project:
```cmd
cd C:\Users\Administrator\Downloads\ArtonNime\flutter_app
```

### 2. Clean Previous Build (Optional)

```cmd
flutter clean
```

### 3. Get Dependencies

```cmd
flutter pub get
```

### 4. Build APK Release

```cmd
flutter build apk --release
```

**PENTING:** Jangan tutup CMD! Biarkan berjalan sampai selesai (10-20 menit).

Kamu akan lihat output seperti ini:
```
Running Gradle task 'assembleRelease'...
Downloading https://services.gradle.org/distributions/gradle-8.11.1-all.zip
Installing Android SDK Build-Tools 34
Installing Android SDK Platform 33
Installing NDK 25.1.8937393
...
```

Tunggu sampai muncul:
```
✓ Built build\app\outputs\flutter-apk\app-release.apk (XX.XMB)
```

### 5. APK Siap!

APK akan ada di:
```
C:\Users\Administrator\Downloads\ArtonNime\flutter_app\build\app\outputs\flutter-apk\app-release.apk
```

---

## 🎯 Alternatif: Pakai Script Otomatis

Aku sudah buatkan script yang otomatis build dan copy APK ke folder `output/`:

### Windows:
```cmd
cd C:\Users\Administrator\Downloads\ArtonNime\flutter_app
build_apk.bat
```

Script akan:
1. Check Flutter installed
2. Get dependencies
3. Clean previous build
4. Build APK release
5. Copy APK ke folder `output/AnimeStream.apk`

---

## 📱 Install APK di HP

### 1. Copy APK ke HP

**Option A: USB Cable**
1. Hubungkan HP ke laptop via USB
2. Copy `app-release.apk` ke HP (folder Downloads)

**Option B: WhatsApp**
1. Kirim APK ke diri sendiri via WhatsApp
2. Download di HP

**Option C: Google Drive**
1. Upload APK ke Google Drive
2. Download di HP

### 2. Install APK

1. Buka file APK di HP (File Manager → Downloads)
2. Klik "Install"
3. Kalau ada warning "Install from Unknown Sources":
   - Klik "Settings"
   - Enable "Allow from this source"
   - Kembali dan klik "Install" lagi
4. Tunggu install selesai
5. Klik "Open"

### 3. Selesai! 🎉

App AnimeStream sudah terinstall!

---

## ⚙️ Troubleshooting

### Build Stuck/Lama Banget

**Normal!** Build pertama kali memang lama (10-20 menit) karena download SDK components.

Cek apakah masih berjalan:
- Lihat di CMD, ada progress bar atau loading animation
- Lihat di Task Manager, ada proses "java.exe" atau "gradle"

Kalau stuck lebih dari 30 menit:
1. Tekan Ctrl+C untuk stop
2. Jalankan lagi: `flutter build apk --release`

### Error: Gradle Build Failed

```cmd
flutter clean
flutter pub get
flutter build apk --release
```

### Error: SDK Not Found

Install Android Studio dan setup SDK:
1. Buka Android Studio
2. Settings → Android SDK
3. Install Android SDK Platform 34
4. Install Android SDK Build-Tools 34

### Error: License Not Accepted

```cmd
flutter doctor --android-licenses
```

Tekan `y` untuk semua.

### APK Tidak Bisa Install

1. Enable "Install from Unknown Sources" di HP
2. Pastikan APK tidak corrupt (download ulang)
3. Cek storage HP (minimal 50MB free)

---

## 📊 Info Build

### Ukuran APK:
- Release: ~20-30 MB
- Debug: ~40-50 MB

### Waktu Build:
- Pertama kali: 10-20 menit
- Build berikutnya: 2-5 menit

### Requirements:
- Flutter 3.0+
- Android SDK 34
- Gradle 8.11.1
- NDK 25.1.8937393

---

## 🎯 URL Website

URL Railway sudah diupdate di app:
```
https://animestream-production-95b2.up.railway.app
```

Kalau mau ganti URL, edit file:
```
flutter_app/lib/main.dart
```

Baris 149:
```dart
final String websiteUrl = 'https://animestream-production-95b2.up.railway.app';
```

Setelah ganti, build ulang APK.

---

## 📞 Butuh Bantuan?

WhatsApp: https://wa.me/6282297706541

---

## 🎉 Summary

**Yang Perlu Dilakukan:**

1. ✅ Flutter sudah terinstall
2. ✅ URL website sudah diupdate
3. ✅ Dependencies sudah ready
4. ⏳ Tinggal build APK (10-20 menit)

**Command:**
```cmd
cd C:\Users\Administrator\Downloads\ArtonNime\flutter_app
flutter build apk --release
```

**Atau pakai script:**
```cmd
build_apk.bat
```

**Tunggu sampai selesai, lalu copy APK ke HP dan install!**

---

**© 2026 AnimeStream - Streaming Anime Gratis**
