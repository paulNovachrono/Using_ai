/**
 * Sets up the UI interactions
 * @param {Object} player - Player control methods
 */
export function setupUI(player) {
  // DOM elements
  const playButton = document.getElementById('play');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const muteButton = document.getElementById('mute');
  const progressContainer = document.querySelector('.progress-bar');
  const volumeContainer = document.querySelector('.volume-bar');
  
  // Play/Pause button
  playButton.addEventListener('click', () => {
    player.togglePlay();
  });
  
  // Previous button
  prevButton.addEventListener('click', () => {
    player.playPrevious();
  });
  
  // Next button
  nextButton.addEventListener('click', () => {
    player.playNext();
  });
  
  // Mute button
  muteButton.addEventListener('click', () => {
    player.toggleMute();
  });
  
  // Progress bar click
  progressContainer.addEventListener('click', (e) => {
    player.setProgress(e);
  });
  
  // Volume bar click
  volumeContainer.addEventListener('click', (e) => {
    const width = volumeContainer.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    
    player.setVolume(volume);
  });
  
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case ' ':
        // Space - Play/Pause
        e.preventDefault();
        player.togglePlay();
        break;
      case 'ArrowRight':
        // Right arrow - Next
        player.playNext();
        break;
      case 'ArrowLeft':
        // Left arrow - Previous
        player.playPrevious();
        break;
      case 'ArrowUp':
        // Up arrow - Volume up
        e.preventDefault();
        const currentVolume = document.querySelector('.volume-level').style.width || '70%';
        const newVolume = Math.min(1, parseFloat(currentVolume) / 100 + 0.1);
        player.setVolume(newVolume);
        break;
      case 'ArrowDown':
        // Down arrow - Volume down
        e.preventDefault();
        const currentVol = document.querySelector('.volume-level').style.width || '70%';
        const newVol = Math.max(0, parseFloat(currentVol) / 100 - 0.1);
        player.setVolume(newVol);
        break;
      case 'm':
        // M - Mute
        player.toggleMute();
        break;
    }
  });
  
  // Add album hover animation
  const albumArt = document.querySelector('.album-art');
  
  albumArt.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = albumArt.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    albumArt.style.transform = `
      perspective(1000px)
      rotateY(${x * 10}deg)
      rotateX(${y * -10}deg)
      translateZ(10px)
    `;
  });
  
  albumArt.addEventListener('mouseleave', () => {
    albumArt.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
  });
}