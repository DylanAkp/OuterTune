// Playlists

function getPlaylists () {
  return window.playlist.getPlaylists()
}

// Playlist

function getPlaylist (playlist) {
  return window.playlist.getPlaylist(playlist)
}

function createPlaylist (name) {
  return window.playlist.createPlaylist(name)
}

function deletePlaylist (playlist) {
  return window.playlist.deletePlaylist(playlist)
}

// Songs

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
  getPlaylists,
  getPlaylist,
  createPlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  exportPlaylist,
  importPlaylist
}
