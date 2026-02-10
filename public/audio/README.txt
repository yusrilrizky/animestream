CARA MENAMBAHKAN MUSIK BACKGROUND
==================================

Musik sudah ditambahkan di 2 grup halaman:

GRUP 1 - SEBELUM LOGIN (login-music.mp3):
✅ Login (/login)
✅ Register (/register)

GRUP 2 - SETELAH LOGIN (dashboard-music.mp3):
✅ Homepage (/)
✅ Dashboard (/dashboard)
✅ Upload (/upload)
✅ Settings (/settings)
✅ Watch (/watch/:id)

LANGKAH-LANGKAH:

1. Siapkan 2 file musik MP3:
   - Musik untuk halaman sebelum login
   - Musik untuk halaman setelah login

2. Rename file musik:
   - File 1: login-music.mp3 (untuk login, register)
   - File 2: dashboard-music.mp3 (untuk homepage, dashboard, upload, dll)

3. Taruh kedua file di folder ini (public/audio/)

4. Restart server: node server.js

5. Test:
   - Buka halaman login → musik 1 play
   - Pindah ke register → musik 1 lanjut
   - Login ke dashboard → musik 2 play
   - Pindah ke upload/homepage → musik 2 lanjut

STRUKTUR FILE:
public/audio/
├── login-music.mp3       ← Musik untuk login & register
├── dashboard-music.mp3   ← Musik untuk dashboard & semua halaman setelah login
└── README.txt

FITUR:
- Musik otomatis play
- Loop terus menerus
- Volume: 50% (30% di halaman watch)
- Posisi musik tersimpan saat pindah halaman dalam grup yang sama
- Tidak ada tombol kontrol

CATATAN:
- Musik 1 akan lanjut saat pindah dari login ke register
- Musik 2 akan lanjut saat pindah dari dashboard ke upload/homepage/settings
- Saat login (pindah dari grup 1 ke grup 2), musik akan ganti

Selamat mencoba!
