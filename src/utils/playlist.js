const LIKED_SONGS = 'Liked Songs'

// Playlists

function getPlaylists () {
  return window.playlist.getPlaylists()
}

// Playlist

function getPlaylist (playlist) {
  return window.playlist.getPlaylist(playlist)
}

function getLikedSongs () {
  return window.playlist.getPlaylist(LIKED_SONGS)
}

function createPlaylist (name) {
  return window.playlist.createPlaylist(name)
}

function deletePlaylist (playlist) {
  return window.playlist.deletePlaylist(playlist)
}

// Songs

function likeSong (song) {
  return window.playlist.addSong(LIKED_SONGS, song)
}

function unlikeSong (song) {
  return window.playlist.unlikeSong(LIKED_SONGS, song)
}

function addSong (playlist, song) {
  return window.playlist.addSong(playlist, song)
}

function removeSong (playlist, song) {
  return window.playlist.removeSong(playlist, song)
}

// Get JSON

function exportPlaylist (playlist, name) {
  return window.playlist.exportPlaylist(playlist, name)
}

function importPlaylist (name) {
  return window.playlist.importPlaylist(name)
}

// Export

export default {
  getLikedSongs,
  likeSong,
  unlikeSong,
  getPlaylists,
  getPlaylist,
  createPlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  exportPlaylist,
  importPlaylist
}
