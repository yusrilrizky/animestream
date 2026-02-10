CARA MENAMBAHKAN BACKGROUND IMAGE
===================================

Folder ini untuk menyimpan gambar background banner di halaman homepage.
Sekarang support 2 gambar berbeda untuk HP dan PC!

LANGKAH-LANGKAH:

1. Siapkan 2 gambar background:
   
   GAMBAR 1 - UNTUK HP (Mobile):
   - Format: JPG, PNG, atau WebP
   - Ukuran: 800x400px (landscape)
   - Orientasi: Horizontal/landscape
   - Ukuran file: Maksimal 1MB
   
   GAMBAR 2 - UNTUK PC (Desktop):
   - Format: JPG, PNG, atau WebP
   - Ukuran: 1920x400px (landscape)
   - Orientasi: Horizontal/landscape
   - Ukuran file: Maksimal 2MB

2. Rename file gambar:
   - Gambar HP: banner-mobile.jpg
   - Gambar PC: banner-desktop.jpg

3. Taruh kedua file di folder ini:
   public/images/backgrounds/banner-mobile.jpg
   public/images/backgrounds/banner-desktop.jpg

4. Refresh halaman homepage - background akan otomatis muncul!

STRUKTUR FILE:
public/images/backgrounds/
├── banner-mobile.jpg    ← Gambar untuk HP (800x400px)
├── banner-desktop.jpg   ← Gambar untuk PC (1920x400px)
└── README.txt

CARA KERJA:
- Di HP (layar < 768px): Pakai banner-mobile.jpg
- Di PC (layar > 768px): Pakai banner-desktop.jpg
- Jika tidak ada gambar: Pakai gradient biru default

TIPS:
- Gunakan gambar dengan warna yang tidak terlalu terang
- Pastikan teks "Selamat Datang" tetap terbaca
- Gambar akan otomatis cover dan center
- Untuk HP: Gunakan gambar portrait atau square yang di-crop landscape
- Untuk PC: Gunakan gambar landscape penuh

CONTOH GAMBAR:
- HP: Fokus ke karakter/objek utama (close-up)
- PC: Gambar wide/panorama (landscape penuh)

Selamat mencoba!
