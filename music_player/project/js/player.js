/**
 * Sets up the music player functionality
 * @param {Array} songs - Array of song objects
 * @returns {Object} - Player control methods
 */
export function setupPlayer(songs) {
  // Create audio element
  const audio = new Audio();
  
  // Player state
  let currentSongIndex = 0;
  let isPlaying = false;
  let volume = 0.7;
  let isMuted = false;
  let previousVolume = volume;
  
  // Set initial volume
  audio.volume = volume;
  
  // Add event listeners to audio element
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('ended', playNext);
  audio.addEventListener('canplay', updateDuration);
  
  // DOM elements
  const albumCover = document.getElementById('album-cover');
  const songTitle = document.getElementById('song-title');
  const songArtist = document.getElementById('song-artist');
  const songAlbum = document.getElementById('song-album');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const progressBar = document.querySelector('.progress');
  const progressContainer = document.querySelector('.progress-bar');
  const volumeBar = document.querySelector('.volume-level');
  
  /**
   * Load a song by index
   * @param {number} index - The index of the song to load
   */
  function loadSong(index) {
    if (index < 0) index = songs.length - 1;
    if (index >= songs.length) index = 0;
    
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    
    // Update the audio source
    audio.src = song.url;
    
    // Update the UI elements
    albumCover.src = song.cover;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songAlbum.textContent = song.album;
    
    // Update playlist active state
    updateActivePlaylistItem();
    
    // If playing, play the new song
    if (isPlaying) {
      playSong();
    }
  }
  
  /**
   * Play the current song
   */
  function playSong() {
    isPlaying = true;
    
    // Update UI
    const playButton = document.getElementById('play');
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Play the audio
    audio.play();
  }
  
  /**
   * Pause the current song
   */
  function pauseSong() {
    isPlaying = false;
    
    // Update UI
    const playButton = document.getElementById('play');
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    
    // Pause the audio
    audio.pause();
  }
  
  /**
   * Toggle play/pause
   */
  function togglePlay() {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
  
  /**
   * Play the next song
   */
  function playNext() {
    loadSong(currentSongIndex + 1);
    
    if (isPlaying) {
      playSong();
    }
  }
  
  /**
   * Play the previous song
   */
  function playPrevious() {
    loadSong(currentSongIndex - 1);
    
    if (isPlaying) {
      playSong();
    }
  }
  
  /**
   * Update the progress bar
   */
  function updateProgress() {
    const { currentTime, duration } = audio;
    
    if (duration) {
      // Update progress bar
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      
      // Update current time display
      currentTimeEl.textContent = formatTime(currentTime);
    }
  }
  
  /**
   * Update the duration display
   */
  function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
  }
  
  /**
   * Set the progress based on click position
   * @param {Event} e - Click event
   */
  function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
  }
  
  /**
   * Set the volume level
   * @param {number} level - Volume level (0-1)
   */
  function setVolume(level) {
    // Ensure level is between 0 and 1
    volume = Math.max(0, Math.min(1, level));
    
    // Update audio volume
    audio.volume = volume;
    
    // Update volume bar
    volumeBar.style.width = `${volume * 100}%`;
    
    // Update mute button icon
    updateVolumeIcon();
  }
  
  /**
   * Toggle mute state
   */
  function toggleMute() {
    isMuted = !isMuted;
    
    if (isMuted) {
      previousVolume = volume;
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
    
    updateVolumeIcon();
  }
  
  /**
   * Update the volume icon based on volume level
   */
  function updateVolumeIcon() {
    const muteButton = document.getElementById('mute');
    
    if (volume === 0 || isMuted) {
      muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
      muteButton.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  }
  
  /**
   * Format time in seconds to MM:SS format
   * @param {number} seconds - Time in seconds
   * @returns {string} - Formatted time string
   */
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  /**
   * Update active playlist item
   */
  function updateActivePlaylistItem() {
    // Remove active class from all playlist items
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current song
    const currentItem = document.querySelector(`.playlist-item[data-index="${currentSongIndex}"]`);
    if (currentItem) {
      currentItem.classList.add('active');
      
      // Scroll into view if needed
      currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  // Return public interface
  return {
    loadSong,
    playSong,
    pauseSong,
    togglePlay,
    playNext,
    playPrevious,
    setProgress,
    setVolume,
    toggleMute,
    getCurrentSongIndex: () => currentSongIndex,
    getIsPlaying: () => isPlaying
  };
}