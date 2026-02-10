# 📧 Setup Email untuk Reset Password

## Cara Setup Gmail untuk Kirim Email

### 1. Buat Gmail App Password

1. Buka https://myaccount.google.com/
2. Pilih **"Security"** di sidebar kiri
3. Scroll ke bawah, cari **"2-Step Verification"**
4. Aktifkan 2-Step Verification jika belum aktif
5. Setelah aktif, kembali ke Security
6. Cari **"App passwords"** (di bagian bawah)
7. Klik **"App passwords"**
8. Pilih:
   - App: **Mail**
   - Device: **Other (Custom name)**
   - Nama: **AnimeStream**
9. Klik **"Generate"**
10. Copy **16-digit password** yang muncul

### 2. Update File .env

Buka file `.env` dan update:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

Ganti dengan:
- `EMAIL_USER`: Email Gmail kamu
- `EMAIL_PASSWORD`: 16-digit app password (tanpa spasi)

Contoh:
```env
EMAIL_USER=animestream@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

### 3. Restart Server

```bash
# Stop server
taskkill /F /IM node.exe

# Start server
node server.js
```

### 4. Test Reset Password

1. Buka `http://localhost:3000/login`
2. Klik **"Lupa password?"**
3. Masukkan email yang terdaftar
4. Klik **"Kirim Link Reset"**
5. Cek inbox email (atau folder spam)
6. Klik link di email
7. Masukkan password baru
8. Login dengan password baru

## Mode Development (Tanpa Email)

Jika belum setup email, sistem akan tetap berfungsi dalam mode development:

1. Saat klik "Lupa password" dan submit email
2. Link reset password akan muncul di **console/terminal**
3. Copy link tersebut dan paste di browser
4. Reset password seperti biasa

Contoh output di console:
```
🔐 Reset password link untuk user@example.com:
http://localhost:3000/reset-password?token=abc123...
```

## Troubleshooting

### Error: "Invalid login"

- Pastikan 2-Step Verification sudah aktif
- Pastikan menggunakan App Password, bukan password Gmail biasa
- Pastikan tidak ada spasi di app password

### Email tidak terkirim

- Cek EMAIL_USER dan EMAIL_PASSWORD di .env
- Cek koneksi internet
- Cek console untuk error message
- Coba generate app password baru

### Email masuk ke spam

- Tandai email sebagai "Not Spam"
- Tambahkan sender ke contact list
- Untuk production, gunakan email service profesional (SendGrid, Mailgun, dll)

## Alternative Email Services

Selain Gmail, bisa juga pakai:

### SendGrid (Recommended untuk Production)

```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-api-key
```

### Mailgun

```env
EMAIL_SERVICE=mailgun
MAILGUN_API_KEY=your-api-key
MAILGUN_DOMAIN=your-domain
```

### SMTP Custom

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
```

## Security Notes

⚠️ **PENTING:**

1. **Jangan commit** file `.env` ke Git
2. **Jangan share** app password ke orang lain
3. **Revoke** app password jika tidak dipakai
4. **Gunakan** email service profesional untuk production
5. **Enable** rate limiting untuk prevent spam

## Production Setup

Untuk production, disarankan menggunakan email service profesional:

1. **SendGrid** - Free tier 100 email/day
2. **Mailgun** - Free tier 5,000 email/month
3. **AWS SES** - $0.10 per 1,000 emails
4. **Postmark** - Free tier 100 email/month

Keuntungan:
- ✅ Deliverability lebih baik
- ✅ Tidak masuk spam
- ✅ Analytics & tracking
- ✅ Template management
- ✅ Rate limiting built-in

---

**Dokumentasi lengkap:** https://nodemailer.com/
