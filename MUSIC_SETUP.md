# 🎵 Panduan Setup Background Music

## Fitur yang Sudah Ditambahkan

Background music dengan kontrol play/pause sudah ditambahkan ke:
- ✅ Halaman Login (`/login`)
- ✅ Halaman Homepage (`/`)

## Cara Menambahkan File Musik

### 1. Siapkan File Musik
- Format yang didukung: **MP3** (recommended), WAV, OGG
- Ukuran file: Maksimal 5MB untuk performa optimal
- Durasi: 2-5 menit (akan diloop otomatis)

### 2. Rename File Musik
Ubah nama file musik kamu menjadi:
```
background-music.mp3
```

### 3. Copy File ke Folder Audio
Copy file `background-music.mp3` ke folder:
```
public/audio/background-music.mp3
```

Struktur folder:
```
animestream/
├── public/
│   ├── audio/
│   │   └── background-music.mp3  ← Taruh file musik di sini
│   └── css/
├── views/
└── server.js
```

### 4. Restart Server
Setelah file musik ditambahkan, restart server:
```bash
node server.js
```

## Cara Kerja Fitur Musik

### Tombol Kontrol Musik
- **Lokasi**: Pojok kanan bawah halaman
- **Icon**: 
  - 🔇 = Musik mati/pause
  - 🔊 = Musik nyala/playing
- **Animasi**: Tombol akan beranimasi pulse saat musik playing

### Autoplay
- Musik akan otomatis play saat halaman dimuat
- Jika browser block autoplay, user harus klik tombol musik untuk play
- Musik akan loop terus menerus

### Toggle Play/Pause
- Klik tombol musik untuk pause/play
- Status musik tersimpan selama user di halaman yang sama

## Troubleshooting

### Musik Tidak Muncul
1. Pastikan file ada di `public/audio/background-music.mp3`
2. Pastikan nama file **PERSIS** sama: `background-music.mp3`
3. Restart server dengan `node server.js`

### Musik Tidak Autoplay
- Ini normal! Browser modern block autoplay untuk user experience
- User harus klik tombol musik untuk play pertama kali
- Setelah itu musik akan play otomatis

### Musik Terlalu Keras/Pelan
Edit file `views/login-new.ejs` dan `views/index-new.ejs`, tambahkan volume:
```javascript
bgMusic.volume = 0.3; // 0.0 - 1.0 (30% volume)
```

Tambahkan setelah baris:
```javascript
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.3; // Tambahkan ini
```

## Rekomendasi File Musik

### Sumber Musik Gratis (Bebas Copyright)
1. **YouTube Audio Library** - https://studio.youtube.com/
2. **Free Music Archive** - https://freemusicarchive.org/
3. **Incompetech** - https://incompetech.com/
4. **Bensound** - https://www.bensound.com/

### Tips Memilih Musik
- Pilih musik instrumental (tanpa vokal)
- Pilih musik yang tidak terlalu ramai/berisik
- Pilih musik dengan tempo sedang (tidak terlalu cepat/lambat)
- Pastikan musik cocok dengan tema anime

## Contoh Implementasi

File musik sudah disetup di:
- `views/login-new.ejs` - Halaman login
- `views/index-new.ejs` - Halaman homepage

Jika ingin menambahkan ke halaman lain (dashboard, upload, dll), copy paste kode berikut sebelum `</body>`:

```html
<!-- Background Music -->
<audio id="bgMusic" loop>
  <source src="/audio/background-music.mp3" type="audio/mpeg">
</audio>

<!-- Music Control Button -->
<button class="music-control" id="musicBtn" onclick="toggleMusic()">
  <span id="musicIcon">🔇</span>
</button>

<style>
  .music-control {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    background: rgba(0, 161, 214, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .music-control:hover {
    background: rgba(0, 181, 229, 0.9);
    transform: scale(1.1);
  }

  .music-control.playing {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 4px 12px rgba(0,161,214,0.3); }
    50% { box-shadow: 0 4px 20px rgba(0,161,214,0.6); }
  }
</style>

<script>
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  window.addEventListener('load', () => {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
    }).catch(() => {
      isPlaying = false;
      musicIcon.textContent = '🔇';
      musicBtn.classList.remove('playing');
    });
  });

  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '🔇';
      musicBtn.classList.remove('playing');
      isPlaying = false;
    } else {
      bgMusic.play();
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
      isPlaying = true;
    }
  }
</script>
```

## Status Implementasi

✅ Background music control sudah ditambahkan
✅ Tombol play/pause dengan animasi
✅ Autoplay dengan fallback
✅ Loop musik otomatis
⏳ Menunggu user menambahkan file musik ke `public/audio/background-music.mp3`

---

**Catatan**: Setelah menambahkan file musik, test di browser untuk memastikan musik berfungsi dengan baik!
