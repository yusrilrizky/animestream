# 💬 WhatsApp Contact Feature

## ✅ Fitur yang Ditambahkan

### Tombol WhatsApp Floating
Tombol hijau dengan icon 💬 yang selalu muncul di pojok kanan bawah setiap halaman.

**Nomor WhatsApp:** 082297706541
**Pesan Default:** "Hai"

---

## 📱 Lokasi Tombol

Tombol WhatsApp ditambahkan di semua halaman utama:

1. ✅ **Homepage** (index-new.ejs) - Floating button + Footer link
2. ✅ **Dashboard** (dashboard.ejs) - Floating button
3. ✅ **Login** (login-new.ejs) - Floating button
4. ✅ **Upload** (upload-new.ejs) - Floating button
5. ✅ **Settings** (settings.ejs) - Floating button
6. ✅ **Watch** (watch.ejs) - Floating button
7. ✅ **Trending** (trending.ejs) - Floating button
8. ✅ **New Releases** (new-releases.ejs) - Floating button
9. ✅ **Categories** (categories.ejs) - Floating button
10. ✅ **My Uploads** (my-uploads.ejs) - Floating button
11. ✅ **Favorites** (favorites.ejs) - Floating button
12. ✅ **History** (history.ejs) - Floating button

---

## 🎨 Design

### Desktop:

**Homepage & Login:**
- **Music Button:** Bottom-right (20px dari bawah, 90px dari kanan) - Kiri
- **WhatsApp Button:** Bottom-right (20px dari bawah, 20px dari kanan) - Kanan
- **Layout:** Bersebelahan horizontal

**Dashboard & Sub-pages:**
- **Music Button:** Bottom-right (80px dari bawah, 90px dari kanan) - Kiri atas
- **WhatsApp Button:** Bottom-right (80px dari bawah, 20px dari kanan) - Kanan atas
- **Bottom Nav:** Bottom (0px) - Tidak tertutup
- **Layout:** Bersebelahan horizontal di atas bottom nav

### Mobile:
- **Music Button:** Bottom-right (15px dari bawah, 75px dari kanan) - Kiri
- **WhatsApp Button:** Bottom-right (15px dari bawah, 15px dari kanan) - Kanan
- **Ukuran:** 50x50px (lebih kecil)
- **Layout:** Bersebelahan horizontal, tidak menutupi bottom nav

### Button Specs:
- **Ukuran Desktop:** 60x60px
- **Ukuran Mobile:** 50x50px
- **Music Icon:** 🔊/🔇 (24px desktop, 20px mobile)
- **WhatsApp Icon:** 💬 (28px desktop, 24px mobile)
- **Music Color:** Purple gradient (#a855f7 → #c084fc)
- **WhatsApp Color:** Green gradient (#25D366 → #128C7E)
- **Efek:** Hover scale 1.1x (WhatsApp only)

---

## 🔗 Link Format

```html
https://wa.me/6282297706541?text=Hai
```

**Penjelasan:**
- `6282297706541` - Nomor WhatsApp (format internasional tanpa +)
- `text=Hai` - Pesan default yang akan muncul

---

## 📝 Cara Mengubah

### Ganti Nomor WhatsApp:
Cari dan replace di semua file:
```
6282297706541
```
Ganti dengan nomor baru (format: 62xxx tanpa +)

### Ganti Pesan Default:
Cari dan replace:
```
?text=Hai
```
Ganti dengan:
```
?text=Pesan%20Baru
```
(Gunakan %20 untuk spasi)

---

## 🎯 Posisi Tombol

### Homepage (index-new.ejs):
- **Music button:** Bottom-right (20px, 90px) - Kiri
- **WhatsApp button:** Bottom-right (20px, 20px) - Kanan
- **Layout:** Bersebelahan horizontal
- **Footer link:** Di footer dengan button style

### Dashboard & Sub-pages:
- **Music button:** Bottom-right (80px, 90px) - Kiri atas
- **WhatsApp button:** Bottom-right (80px, 20px) - Kanan atas
- **Bottom nav:** Bottom (0px) - Tidak tertutup
- **Layout:** Bersebelahan horizontal di atas bottom nav

### Login:
- **Music button:** Bottom-right (20px, 90px) - Kiri
- **WhatsApp button:** Bottom-right (20px, 20px) - Kanan
- **Layout:** Bersebelahan horizontal

### Mobile (Semua Halaman):
- **Music button:** Bottom-right (15px, 75px) - Kiri
- **WhatsApp button:** Bottom-right (15px, 15px) - Kanan
- **Ukuran:** 50x50px (lebih kecil)
- **Gap:** 10px antara tombol

---

## 📱 Mobile Responsive

Kedua tombol otomatis menyesuaikan di mobile:
- **Music:** 50x50px di posisi (15px, 75px) - Kiri
- **WhatsApp:** 50x50px di posisi (15px, 15px) - Kanan
- **Layout:** Bersebelahan horizontal dengan gap 10px
- Tidak menutupi bottom navigation
- Tetap mudah diklik dengan jari

---

## 🎨 Customization

### Ubah Warna:
```css
background: linear-gradient(135deg, #25D366, #128C7E);
```
Ganti dengan warna lain.

### Ubah Icon:
```html
💬
```
Ganti dengan emoji lain (📞, 📱, ✉️, dll)

### Ubah Ukuran:
```css
width: 60px;
height: 60px;
font-size: 28px;
```

### Ubah Posisi:
```css
bottom: 20px;
right: 20px;
```

---

## ✅ Testing

Tombol sudah ditest dan berfungsi dengan baik:
- ✅ Klik tombol membuka WhatsApp
- ✅ Nomor terisi otomatis: 082297706541
- ✅ Pesan default: "Hai"
- ✅ Responsive di mobile
- ✅ Tidak menutupi elemen lain
- ✅ Hover effect smooth

---

## 📚 File yang Dimodifikasi

1. `views/index-new.ejs` - Homepage
2. `views/dashboard.ejs` - Dashboard
3. `views/login-new.ejs` - Login page
4. `views/upload-new.ejs` - Upload page
5. `views/settings.ejs` - Settings page
6. `views/watch.ejs` - Watch page
7. `views/trending.ejs` - Trending page
8. `views/new-releases.ejs` - New releases page
9. `views/categories.ejs` - Categories page
10. `views/my-uploads.ejs` - My uploads page
11. `views/favorites.ejs` - Favorites page
12. `views/history.ejs` - History page
13. `public/css/style.css` - Mobile responsive styles

---

**© 2026 AnimeStream**
**WhatsApp Contact: 082297706541**
