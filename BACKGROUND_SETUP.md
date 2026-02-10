# 🖼️ Panduan Setup Background Image

## Fitur Background Custom

Background image sudah ditambahkan di **banner homepage** (bagian "Selamat Datang di AnimeStream").

**Fitur Baru**: Support 2 gambar berbeda untuk HP dan PC!

## Cara Menambahkan Background Image

### 1. Siapkan 2 Gambar

**GAMBAR 1 - UNTUK HP (Mobile)**
- **Format**: JPG, PNG, atau WebP
- **Ukuran**: 800x400px atau 1080x540px (landscape)
- **Orientasi**: Horizontal/landscape
- **Ukuran file**: Maksimal 1MB
- **Tips**: Fokus ke karakter/objek utama (close-up)

**GAMBAR 2 - UNTUK PC (Desktop)**
- **Format**: JPG, PNG, atau WebP
- **Ukuran**: 1920x400px atau 1920x600px (landscape)
- **Orientasi**: Horizontal/landscape
- **Ukuran file**: Maksimal 2MB
- **Tips**: Gambar wide/panorama (landscape penuh)

### 2. Rename File
Ubah nama file gambar:
- Gambar HP: `banner-mobile.jpg`
- Gambar PC: `banner-desktop.jpg`

### 3. Copy ke Folder
Copy kedua file ke folder:
```
public/images/backgrounds/banner-mobile.jpg
public/images/backgrounds/banner-desktop.jpg
```

Struktur folder:
```
animestream/
├── public/
│   ├── images/
│   │   └── backgrounds/
│   │       ├── banner-mobile.jpg   ← Gambar untuk HP
│   │       ├── banner-desktop.jpg  ← Gambar untuk PC
│   │       └── README.txt
│   ├── audio/
│   └── css/
├── views/
└── server.js
```

### 4. Refresh Halaman
- Buka homepage: `http://localhost:3000`
- Refresh browser (Ctrl+R atau F5)
- Test di HP dan PC untuk lihat perbedaan

## Cara Kerja

### Responsive Background
- **Di HP** (layar < 768px): Pakai `banner-mobile.jpg`
- **Di PC** (layar > 768px): Pakai `banner-desktop.jpg`
- **Tanpa gambar**: Pakai gradient biru default

### Dengan Background Image
Jika file ada:
- Gambar akan muncul sebagai background
- Ada overlay gradient transparan (biru) di atas gambar
- Teks tetap terbaca dengan text-shadow yang kuat

### Tanpa Background Image
Jika file tidak ada:
- Akan pakai gradient default (biru)
- Tampilan tetap bagus tanpa gambar

## Tips Memilih Gambar

### ✅ Gambar Mobile (HP):
- Close-up karakter anime
- Fokus ke 1-2 karakter
- Komposisi center atau sedikit ke kiri
- Warna cerah tapi tidak terlalu terang

### ✅ Gambar Desktop (PC):
- Wide shot/panorama
- Scene anime dengan banyak detail
- Landscape penuh
- Komposisi horizontal

### ❌ Hindari:
- Gambar terlalu gelap (teks tidak terbaca)
- Gambar terlalu terang/putih (teks tidak kontras)
- Gambar portrait/vertikal (akan terpotong)
- File terlalu besar (loading lambat)

## Contoh Penggunaan

### Skenario 1: Anime Action
- **Mobile**: Close-up wajah karakter utama
- **Desktop**: Scene battle dengan banyak karakter

### Skenario 2: Anime Slice of Life
- **Mobile**: Karakter utama dengan background blur
- **Desktop**: Scene sekolah/kota dengan view luas

### Skenario 3: Anime Fantasy
- **Mobile**: Karakter dengan magic effect
- **Desktop**: Landscape fantasy world

## Contoh Sumber Gambar

### Gratis & Legal:
1. **Unsplash** - https://unsplash.com/ (cari "anime" atau "japan")
2. **Pexels** - https://www.pexels.com/
3. **Pixabay** - https://pixabay.com/
4. **Wallpaper Anime** - Cari di Google dengan filter "labeled for reuse"

### Anime Official:
- Screenshot dari anime favorit (untuk personal use)
- Official artwork dari website anime
- Wallpaper resmi dari studio anime

## Troubleshooting

### Gambar Tidak Muncul
1. Pastikan nama file **PERSIS**:
   - `banner-mobile.jpg` (huruf kecil semua)
   - `banner-desktop.jpg` (huruf kecil semua)
2. Pastikan file ada di folder: `public/images/backgrounds/`
3. Cek format file (JPG, PNG, atau WebP)
4. Refresh browser dengan Ctrl+Shift+R (hard refresh)
5. Cek console browser (F12) untuk error
6. Pastikan server sudah restart

### Gambar Terpotong
- Gunakan gambar landscape (horizontal)
- Mobile: Minimal 800x400px
- Desktop: Minimal 1920x400px
- Gambar akan auto-crop ke center

### Teks Tidak Terbaca
- Pilih gambar dengan warna yang tidak terlalu terang
- Atau edit gambar: tambahkan overlay gelap/blur
- CSS sudah ada text-shadow kuat untuk keterbacaan

### Gambar Berbeda Tidak Muncul
- Pastikan kedua file ada (mobile DAN desktop)
- Test di browser dengan resize window
- Di HP: Buka dengan browser mobile
- Di PC: Buka dengan browser desktop

## Ganti Background

Untuk ganti background:
1. Hapus file lama: `banner-mobile.jpg` dan `banner-desktop.jpg`
2. Copy file baru dengan nama yang sama
3. Refresh browser

## Hapus Background

Untuk kembali ke gradient default:
1. Hapus atau rename kedua file
2. Refresh browser
3. Banner akan pakai gradient biru default

## Test Responsive

### Di Browser Desktop:
1. Buka homepage
2. Tekan F12 (DevTools)
3. Klik icon mobile (Ctrl+Shift+M)
4. Pilih device: iPhone, Samsung, dll
5. Lihat gambar mobile muncul

### Di HP Asli:
1. Buka browser di HP
2. Akses: `http://[IP-KOMPUTER]:3000`
3. Lihat gambar mobile muncul

## Status Implementasi

✅ Background image support di banner homepage
✅ 2 gambar berbeda (mobile & desktop)
✅ Responsive dengan media query
✅ Gradient overlay untuk keterbacaan teks
✅ Fallback ke gradient default jika no image
✅ Text shadow kuat untuk kontras
✅ Auto center & cover

## Ukuran File Recommended

| Device  | Ukuran Gambar | Ukuran File | Kualitas |
|---------|---------------|-------------|----------|
| Mobile  | 800x400px     | < 500KB     | 80%      |
| Desktop | 1920x400px    | < 1.5MB     | 85%      |

## Tools untuk Resize/Compress

1. **TinyPNG** - https://tinypng.com/ (compress)
2. **Squoosh** - https://squoosh.app/ (resize & compress)
3. **Photopea** - https://www.photopea.com/ (edit online)
4. **GIMP** - Free desktop editor

---

**Catatan**: Pastikan gambar yang digunakan tidak melanggar copyright. Gunakan gambar dengan lisensi yang sesuai atau gambar milik sendiri.
