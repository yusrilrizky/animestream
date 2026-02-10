# 🔐 Setup OAuth Google & Facebook

## Setup Google OAuth

### 1. Buat Project di Google Cloud Console
1. Buka https://console.cloud.google.com/
2. Klik "Select a project" → "New Project"
3. Beri nama project: "AnimeStream"
4. Klik "Create"

### 2. Enable Google+ API
1. Di sidebar, pilih "APIs & Services" → "Library"
2. Cari "Google+ API"
3. Klik dan pilih "Enable"

### 3. Buat OAuth Credentials
1. Di sidebar, pilih "APIs & Services" → "Credentials"
2. Klik "Create Credentials" → "OAuth client ID"
3. Pilih "Configure consent screen" jika diminta
   - User Type: External
   - App name: AnimeStream
   - User support email: email Anda
   - Developer contact: email Anda
   - Klik "Save and Continue"
4. Kembali ke "Credentials" → "Create Credentials" → "OAuth client ID"
5. Application type: "Web application"
6. Name: "AnimeStream Web"
7. Authorized redirect URIs:
   - http://localhost:3000/auth/google/callback
   - (Tambahkan URL production nanti)
8. Klik "Create"
9. Copy **Client ID** dan **Client Secret**

### 4. Update .env File
```env
GOOGLE_CLIENT_ID=paste-client-id-disini
GOOGLE_CLIENT_SECRET=paste-client-secret-disini
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

## Setup Facebook OAuth

### 1. Buat App di Facebook Developers
1. Buka https://developers.facebook.com/
2. Klik "My Apps" → "Create App"
3. Pilih "Consumer" → "Next"
4. App name: "AnimeStream"
5. App contact email: email Anda
6. Klik "Create App"

### 2. Setup Facebook Login
1. Di Dashboard, cari "Facebook Login" → "Set Up"
2. Pilih "Web"
3. Site URL: http://localhost:3000
4. Klik "Save" → "Continue"

### 3. Configure OAuth Settings
1. Di sidebar, pilih "Facebook Login" → "Settings"
2. Valid OAuth Redirect URIs:
   - http://localhost:3000/auth/facebook/callback
   - (Tambahkan URL production nanti)
3. Klik "Save Changes"

### 4. Get App Credentials
1. Di sidebar, pilih "Settings" → "Basic"
2. Copy **App ID** dan **App Secret** (klik "Show")

### 5. Update .env File
```env
FACEBOOK_APP_ID=paste-app-id-disini
FACEBOOK_APP_SECRET=paste-app-secret-disini
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
```

---

## Testing OAuth

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Test Login
1. Buka http://localhost:3000/login
2. Klik tombol "Google" atau "Facebook"
3. Login dengan akun Google/Facebook
4. Anda akan diarahkan ke halaman beranda

---

## Production Setup

### Untuk Deploy ke Production:

1. **Update Authorized Redirect URIs** di Google Cloud Console:
   - https://yourdomain.com/auth/google/callback

2. **Update Valid OAuth Redirect URIs** di Facebook Developers:
   - https://yourdomain.com/auth/facebook/callback

3. **Update .env di Server Production**:
```env
GOOGLE_CALLBACK_URL=https://yourdomain.com/auth/google/callback
FACEBOOK_CALLBACK_URL=https://yourdomain.com/auth/facebook/callback
BASE_URL=https://yourdomain.com
```

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Pastikan URL callback di .env sama persis dengan yang di Google/Facebook Console
- Jangan lupa tambahkan http:// atau https://

### Error: "App Not Setup"
- Pastikan Facebook Login sudah di-setup di Facebook Developers
- Pastikan Valid OAuth Redirect URIs sudah disimpan

### Error: "Access Denied"
- Pastikan Google+ API sudah di-enable
- Pastikan OAuth consent screen sudah dikonfigurasi

### User tidak bisa login
- Cek console browser untuk error
- Cek terminal server untuk error log
- Pastikan credentials di .env sudah benar

---

## Security Notes

⚠️ **PENTING:**
- Jangan commit file `.env` ke Git
- File `.env` sudah ada di `.gitignore`
- Gunakan `.env.example` sebagai template
- Ganti credentials di production dengan yang berbeda
- Aktifkan HTTPS di production

---

## Alternative: Testing Tanpa OAuth

Jika belum setup OAuth, Anda masih bisa login dengan:
- Username: `admin`
- Password: `admin123`

Atau buat akun baru melalui halaman Register.
