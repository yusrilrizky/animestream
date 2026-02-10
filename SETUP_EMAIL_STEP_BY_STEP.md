# 📧 Setup Email Step-by-Step (Kirim ke Gmail User)

## Kenapa Perlu Setup Email?

Saat ini, kode reset password hanya muncul di console/terminal. Dengan setup email, kode akan **dikirim langsung ke Gmail user** yang lupa password.

## 🎯 Langkah-Langkah Setup

### Step 1: Aktifkan 2-Step Verification Gmail

1. Buka browser, login ke Gmail kamu
2. Buka: https://myaccount.google.com/security
3. Scroll ke bawah, cari **"2-Step Verification"** atau **"Verifikasi 2 Langkah"**
4. Klik **"Get Started"** atau **"Mulai"**
5. Ikuti petunjuk:
   - Masukkan password Gmail
   - Verifikasi dengan nomor HP (SMS/Call)
   - Klik **"Turn On"**

✅ **2-Step Verification sekarang aktif!**

---

### Step 2: Generate App Password

1. Masih di https://myaccount.google.com/security
2. Scroll ke bawah, cari **"App passwords"** atau **"Sandi aplikasi"**
   - Jika tidak ada, pastikan 2-Step Verification sudah aktif
3. Klik **"App passwords"**
4. Mungkin diminta password lagi, masukkan password Gmail
5. Di halaman App passwords:
   - **Select app:** Pilih **"Mail"**
   - **Select device:** Pilih **"Other (Custom name)"**
   - Ketik nama: **AnimeStream**
6. Klik **"Generate"**
7. Akan muncul **16 karakter password** dalam kotak kuning
   
   Contoh: `abcd efgh ijkl mnop`

8. **COPY password ini!** (Klik tombol copy atau select & copy manual)

⚠️ **PENTING:** Password ini hanya muncul sekali! Jika hilang, harus generate ulang.

---

### Step 3: Update File .env

1. Buka project AnimeStream di editor/notepad
2. Buka file **`.env`** (di root folder)
3. Cari bagian ini:

   ```env
   # Email Configuration (untuk reset password)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   ```

4. **Ganti** dengan email dan app password kamu:

   ```env
   # Email Configuration (untuk reset password)
   EMAIL_USER=emailkamu@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```

   **Contoh nyata:**
   ```env
   EMAIL_USER=animestream2024@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```

5. **Hapus semua spasi** di app password!
   - ❌ Salah: `abcd efgh ijkl mnop`
   - ✅ Benar: `abcdefghijklmnop`

6. **Save** file `.env`

---

### Step 4: Test Email Configuration

1. Buka terminal/command prompt
2. Stop server jika masih jalan:
   ```bash
   taskkill /F /IM node.exe
   ```

3. Jalankan test email:
   ```bash
   node test-email.js
   ```

4. Tunggu beberapa detik...

5. **Jika berhasil**, akan muncul:
   ```
   ✅ Email berhasil terkirim!
   📬 Cek inbox email: emailkamu@gmail.com
   🎉 Email service siap digunakan untuk reset password!
   ```

6. **Cek Gmail kamu:**
   - Buka inbox
   - Cari email dengan subject: **"Test Email - AnimeStream"**
   - Jika tidak ada di inbox, cek folder **Spam/Junk**

7. **Jika ada email**, berarti setup berhasil! ✅

---

### Step 5: Restart Server

```bash
node server.js
```

Output:
```
✅ Database tables initialized
Server berjalan di http://localhost:3000
```

---

## 🎉 Test Reset Password (Kirim ke Gmail)

Sekarang test fitur reset password:

1. **Buka browser:** `http://localhost:3000/login`

2. **Klik:** "Lupa password?"

3. **Masukkan email** user yang terdaftar:
   - Contoh: `admin@animestream.com`
   - Atau email user lain yang sudah register

4. **Klik:** "Kirim Link Reset"

5. **Cek Gmail user tersebut:**
   - Buka inbox
   - Cari email dengan subject: **"Reset Password - AnimeStream"**
   - Jika tidak ada, cek folder **Spam**

6. **Buka email**, klik tombol **"Reset Password"**

7. **Masukkan password baru** (2x)

8. **Klik:** "Reset Password"

9. **Login** dengan password baru!

✅ **Email berhasil terkirim ke Gmail user!**

---

## ❌ Troubleshooting

### Error: "Invalid login"

**Penyebab:** App password salah atau 2-Step belum aktif

**Solusi:**
1. Pastikan 2-Step Verification aktif
2. Generate app password baru
3. Copy dengan benar (tanpa spasi)
4. Update `.env` lagi

### Error: "Connection timeout"

**Penyebab:** Koneksi internet bermasalah

**Solusi:**
1. Cek koneksi internet
2. Coba lagi beberapa saat
3. Pastikan firewall tidak block port 587

### Email masuk ke Spam

**Solusi:**
1. Tandai email sebagai "Not Spam"
2. Tambahkan sender ke contact list
3. Untuk production, gunakan email service profesional (SendGrid, Mailgun)

### Email tidak terkirim sama sekali

**Solusi:**
1. Jalankan test email:
   ```bash
   node test-email.js
   ```
2. Lihat error message
3. Pastikan EMAIL_USER dan EMAIL_PASSWORD benar di `.env`
4. Generate app password baru

---

## 📝 Checklist Setup

- [ ] 2-Step Verification aktif di Gmail
- [ ] App password sudah di-generate
- [ ] File `.env` sudah diupdate dengan EMAIL_USER dan EMAIL_PASSWORD
- [ ] Tidak ada spasi di app password
- [ ] Test email berhasil (`node test-email.js`)
- [ ] Server sudah direstart
- [ ] Test reset password berhasil kirim email

---

## 🎯 Hasil Akhir

Setelah setup selesai:

✅ User klik "Lupa password"
✅ Masukkan email mereka
✅ Email otomatis terkirim ke Gmail mereka
✅ User klik link di email
✅ Reset password
✅ Login dengan password baru

**Tidak perlu lagi copy link dari console!**

---

## 💡 Tips Production

Untuk website yang sudah online (hosting):

1. **Gunakan email service profesional:**
   - SendGrid (free 100 email/day)
   - Mailgun (free 5,000 email/month)
   - AWS SES ($0.10 per 1,000 emails)

2. **Keuntungan:**
   - Tidak masuk spam
   - Deliverability tinggi
   - Analytics & tracking
   - Rate limiting built-in

3. **Setup di hosting:**
   - Set environment variables di hosting panel
   - Jangan commit `.env` ke Git
   - Gunakan email domain sendiri (lebih profesional)

---

**Butuh bantuan?** Lihat [EMAIL_SETUP.md](EMAIL_SETUP.md) atau [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
