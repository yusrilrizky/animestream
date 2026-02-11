# 🔧 FIX APK FILE UPLOAD - PANDUAN LENGKAP

## ✅ PERUBAHAN YANG SUDAH DILAKUKAN

### 1. AndroidManifest.xml - Permissions Ditambahkan
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" android:minSdkVersion="33"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

### 2. File Upload UI - Button "Buka Galeri" Ditambahkan
- Button visible yang bisa diklik untuk buka galeri
- Accept attribute dengan MIME types spesifik
- Tap highlight optimization untuk mobile

### 3. WebView Configuration - File Upload Support
- Import `webview_flutter_android` untuk Android-specific config
- Enable media playback tanpa user gesture
- Dependency `webview_flutter_android: ^3.16.0` ditambahkan

## 📋 LANGKAH REBUILD APK

### STEP 1: Install Dependencies
```bash
cd flutter_app
flutter pub get
```

### STEP 2: Clean Build
```bash
flutter clean
flutter pub get
```

### STEP 3: Build APK
```bash
flutter build apk --release
```

### STEP 4: Lokasi APK
APK akan tersimpan di:
```
flutter_app/build/app/outputs/flutter-apk/app-release.apk
```

## 🧪 TESTING CHECKLIST

Setelah install APK baru, test:

1. ✅ Buka halaman Upload
2. ✅ Klik tab "Upload File"
3. ✅ Klik button "Buka Galeri"
4. ✅ Pilih video dari galeri
5. ✅ Isi form (judul, episode, dll)
6. ✅ Klik "Upload Video"
7. ✅ Progress bar muncul
8. ✅ Upload berhasil

## ⚠️ TROUBLESHOOTING

### Jika File Picker Masih Tidak Muncul:

#### SOLUSI 1: Tambah Permission Handler
```bash
cd flutter_app
flutter pub add permission_handler
```

Edit `pubspec.yaml`:
```yaml
dependencies:
  permission_handler: ^11.0.0
```

Edit `main.dart` - tambah di initState:
```dart
import 'package:permission_handler/permission_handler.dart';

// Request permissions
await Permission.storage.request();
await Permission.videos.request();
```

#### SOLUSI 2: Gunakan File Picker Plugin
```bash
flutter pub add file_picker
```

Ganti file input dengan native file picker:
```dart
import 'package:file_picker/file_picker.dart';

FilePickerResult? result = await FilePicker.platform.pickFiles(
  type: FileType.video,
  allowMultiple: false,
);
```

#### SOLUSI 3: Check Android Version
- Android 13+ butuh `READ_MEDIA_VIDEO` permission (sudah ditambahkan)
- Android 10-12 butuh `READ_EXTERNAL_STORAGE` (sudah ditambahkan)
- Android 6-9 butuh runtime permission request

## 📱 ANDROID VERSION COMPATIBILITY

| Android Version | Permission Required | Status |
|----------------|---------------------|--------|
| Android 13+ (API 33+) | READ_MEDIA_VIDEO | ✅ Added |
| Android 10-12 (API 29-32) | READ_EXTERNAL_STORAGE | ✅ Added |
| Android 6-9 (API 23-28) | READ_EXTERNAL_STORAGE + Runtime | ⚠️ Need runtime request |

## 🚀 QUICK FIX COMMANDS

```bash
# 1. Masuk ke folder flutter_app
cd flutter_app

# 2. Clean dan get dependencies
flutter clean
flutter pub get

# 3. Build APK
flutter build apk --release

# 4. Copy APK ke folder output
copy build\app\outputs\flutter-apk\app-release.apk output\animestream-v1.0.0-file-upload-fix.apk
```

## 📝 CATATAN PENTING

1. **WebView File Upload**: `webview_flutter` plugin seharusnya support file upload otomatis di Android
2. **Permissions**: Semua permissions sudah ditambahkan di AndroidManifest.xml
3. **UI Button**: Button "Buka Galeri" visible dan clickable
4. **Testing**: HARUS test di device Android fisik, bukan emulator

## 🔄 NEXT STEPS JIKA MASIH GAGAL

Jika setelah rebuild APK masih tidak bisa:

1. Test di Android device fisik (bukan emulator)
2. Check Android version device (Android 6+)
3. Manually grant permissions di Settings > Apps > AnimeStream > Permissions
4. Implement native file picker dengan `file_picker` plugin
5. Add runtime permission request dengan `permission_handler`

## 📞 SUPPORT

Jika masih ada masalah, cek:
- Android version device
- Storage permissions di Settings
- File size (max 500MB)
- Internet connection untuk upload

---

**STATUS**: Ready to rebuild APK
**LAST UPDATE**: 2026-02-11
