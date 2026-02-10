# 📱 Build APK dengan Android Studio

## 📋 Persiapan

### 1. Install Android Studio
1. Download: https://developer.android.com/studio
2. Install (butuh ~5GB space)
3. Setup Android SDK

### 2. Website Sudah Online
Website harus sudah di-hosting, contoh:
```
https://animestream.onrender.com
```

---

## 🚀 Langkah-Langkah

### Step 1: Buat Project Baru
1. Buka Android Studio
2. **File** → **New** → **New Project**
3. Pilih **"Empty Activity"**
4. Konfigurasi:
   ```
   Name: AnimeStream
   Package: com.animestream.app
   Language: Java
   Minimum SDK: API 21 (Android 5.0)
   ```
5. Klik **Finish**

---

### Step 2: Edit MainActivity.java

File: `app/src/main/java/com/animestream/app/MainActivity.java`

```java
package com.animestream.app;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://animestream.onrender.com");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```

---

### Step 3: Edit activity_main.xml

File: `app/src/main/res/layout/activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>
```

---

### Step 4: Edit AndroidManifest.xml

File: `app/src/main/AndroidManifest.xml`

Tambahkan permission:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Tambahkan di `<application>`:
```xml
android:usesCleartextTraffic="true"
```

---

### Step 5: Tambahkan Icon

1. Klik kanan folder `res`
2. **New** → **Image Asset**
3. Upload icon AnimeStream
4. Generate

---

### Step 6: Build APK

1. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Tunggu proses build (2-5 menit)
3. Klik **"locate"** untuk buka folder APK

APK ada di:
```
app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 Build Release APK (Untuk Publish)

### Step 1: Generate Keystore
1. **Build** → **Generate Signed Bundle / APK**
2. Pilih **APK**
3. **Create new...**
4. Isi:
   ```
   Key store path: animestream-keystore.jks
   Password: (buat password)
   Alias: animestream
   Validity: 25 years
   ```
5. **OK**

### Step 2: Build Release
1. Pilih **release**
2. **Finish**
3. APK ada di: `app/release/app-release.apk`

---

## 🎨 Customization

### Ubah Nama App
File: `app/src/main/res/values/strings.xml`
```xml
<string name="app_name">AnimeStream</string>
```

### Ubah Warna Theme
File: `app/src/main/res/values/colors.xml`
```xml
<color name="purple_500">#A855F7</color>
<color name="purple_700">#8A2BE2</color>
```

### Ubah URL Website
File: `MainActivity.java`
```java
webView.loadUrl("https://animestream.onrender.com");
```

---

## 📱 Test APK

### Di Emulator:
1. **Tools** → **AVD Manager**
2. Create Virtual Device
3. Run app

### Di HP Real:
1. Enable **Developer Options**
2. Enable **USB Debugging**
3. Connect HP ke PC
4. Run app

### Install APK Manual:
1. Copy APK ke HP
2. Install (allow unknown sources)
3. Buka app

---

## ✅ Checklist

- [ ] Android Studio terinstall
- [ ] Website sudah online
- [ ] Project dibuat
- [ ] MainActivity.java diedit
- [ ] activity_main.xml diedit
- [ ] AndroidManifest.xml diedit
- [ ] Icon ditambahkan
- [ ] APK berhasil di-build
- [ ] APK ditest di HP

---

**© 2026 AnimeStream**
