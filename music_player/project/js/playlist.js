/**
 * Creates the playlist UI
 * @param {Array} songs - Array of song objects
 * @param {Object} player - Player control methods
 */
export function createPlaylist(songs, player) {
  const playlistEl = document.getElementById('playlist');
  
  // Clear any existing playlist items
  playlistEl.innerHTML = '';
  
  // Create playlist items
  songs.forEach((song, index) => {
    const playlistItem = document.createElement('li');
    playlistItem.classList.add('playlist-item');
    playlistItem.setAttribute('data-index', index);
    
    // Add active class to current song
    if (index === player.getCurrentSongIndex()) {
      playlistItem.classList.add('active');
    }
    
    // Create playlist item HTML
    playlistItem.innerHTML = `
      <div class="playlist-item-thumbnail">
        <img src="${song.cover}" alt="${song.title}">
      </div>
      <div class="playlist-item-info">
        <div class="playlist-item-title">${song.title}</div>
        <div class="playlist-item-artist">${song.artist}</div>
      </div>
    `;
    
    // Add click event to play the song
    playlistItem.addEventListener('click', () => {
      player.loadSong(index);
      player.playSong();
    });
    
    // Add to playlist
    playlistEl.appendChild(playlistItem);
  });
}