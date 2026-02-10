// Background Music Player - Continuous across pages
(function() {
  // Determine which music to play based on page
  const isLoginPage = window.location.pathname === '/login' || 
                      window.location.pathname === '/register' ||
                      window.location.pathname === '/forgot-password';
  
  const musicFile = isLoginPage ? '/audio/login-music.mp3' : '/audio/dashboard-music.mp3';
  const storageKey = isLoginPage ? 'loginMusicTime' : 'dashboardMusicTime';
  
  // Create audio element
  const bgMusic = new Audio(musicFile);
  bgMusic.loop = true;
  bgMusic.volume = 0.5;
  bgMusic.preload = 'auto';
  
  let isPlaying = false;
  
  // Restore position
  function restorePosition() {
    const savedTime = localStorage.getItem(storageKey);
    if (savedTime && !isNaN(parseFloat(savedTime))) {
      const time = parseFloat(savedTime);
      if (time > 0) {
        bgMusic.currentTime = time;
      }
    }
  }
  
  // Save position
  function savePosition() {
    if (!bgMusic.paused && bgMusic.currentTime > 0) {
      localStorage.setItem(storageKey, bgMusic.currentTime.toString());
    }
  }
  
  // Play music
  function playMusic() {
    if (isPlaying) return;
    
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        console.log('Music playing:', musicFile);
      }).catch(err => {
        console.log('Autoplay blocked');
        isPlaying = false;
      });
    }
  }
  
  // Initialize
  bgMusic.addEventListener('loadedmetadata', () => {
    restorePosition();
    playMusic();
  });
  
  // Try on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      restorePosition();
      playMusic();
    });
  } else {
    restorePosition();
    playMusic();
  }
  
  // Fallback: play on first click
  document.addEventListener('click', () => {
    if (!isPlaying) playMusic();
  }, { once: true });
  
  // Save position every second
  setInterval(savePosition, 1000);
  
  // Save before leaving
  window.addEventListener('beforeunload', savePosition);
  window.addEventListener('pagehide', savePosition);
  
})();
