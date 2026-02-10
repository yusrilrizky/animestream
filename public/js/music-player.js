// Global Background Music Player
(function() {
  const bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;
  
  let isPlaying = false;
  let hasInteracted = false;
  
  // Set volume
  bgMusic.volume = 0.5;
  
  // Restore position from localStorage
  function restorePosition() {
    try {
      const savedTime = localStorage.getItem('musicTime');
      const savedDuration = localStorage.getItem('musicDuration');
      
      if (savedTime && !isNaN(parseFloat(savedTime))) {
        const time = parseFloat(savedTime);
        // Only restore if time is valid and not too close to end
        if (time > 0 && time < (bgMusic.duration - 1)) {
          bgMusic.currentTime = time;
        }
      }
    } catch (e) {
      console.log('Could not restore music position:', e);
    }
  }
  
  // Save position
  function savePosition() {
    try {
      if (bgMusic && !bgMusic.paused && bgMusic.currentTime > 0) {
        localStorage.setItem('musicTime', bgMusic.currentTime.toString());
        localStorage.setItem('musicDuration', bgMusic.duration.toString());
      }
    } catch (e) {
      console.log('Could not save music position:', e);
    }
  }
  
  // Try to play music
  function tryPlay() {
    if (isPlaying) return;
    
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        console.log('Music playing');
      }).catch(error => {
        console.log('Autoplay blocked, waiting for user interaction');
        isPlaying = false;
      });
    }
  }
  
  // Initialize music
  function initMusic() {
    // Wait for metadata to load
    if (bgMusic.readyState >= 2) {
      restorePosition();
      tryPlay();
    } else {
      bgMusic.addEventListener('loadedmetadata', () => {
        restorePosition();
        tryPlay();
      }, { once: true });
    }
  }
  
  // Start on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusic);
  } else {
    initMusic();
  }
  
  // Fallback: try on first user interaction
  function handleFirstInteraction() {
    if (!isPlaying && hasInteracted === false) {
      hasInteracted = true;
      tryPlay();
    }
  }
  
  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('keydown', handleFirstInteraction, { once: true });
  
  // Save position periodically
  setInterval(savePosition, 1000);
  
  // Save before leaving page
  window.addEventListener('beforeunload', savePosition);
  window.addEventListener('pagehide', savePosition);
  
  // Handle visibility change (tab switching)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      savePosition();
    } else {
      if (!isPlaying) {
        tryPlay();
      }
    }
  });
  
})();
