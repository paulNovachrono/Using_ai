import { songs } from './data.js';
import { createPlaylist } from './playlist.js';
import { setupPlayer } from './player.js';
import { setupUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the music player components
  const player = setupPlayer(songs);
  
  // Create the playlist UI
  createPlaylist(songs, player);
  
  // Set up the UI elements and interactions
  setupUI(player);
  
  // Load the first song by default
  player.loadSong(0);
});