import { useMusicStore } from 'src/store/music'

const LIKED_SONGS = 'Liked Songs'

// Playlists

export function getPlaylists () {
  return window.playlist.getPlaylists()
}

// Playlist

export async function setPlaylist (playlistName) {
  const musicStore = useMusicStore()
  const playlist = await getPlaylist(playlistName).then((playlist) => {
    musicStore.replaceQueue(playlist)
  })
  return playlist
}

export function getPlaylist (playlist) {
  return window.playlist.getPlaylist(playlist)
}

export function getLikedSongs () {
  return window.playlist.getPlaylist(LIKED_SONGS)
}

export function createPlaylist (name) {
  return window.playlist.createPlaylist(name)
}

export function deletePlaylist (playlist) {
  return window.playlist.deletePlaylist(playlist)
}

// Songs

export function likeSong (song) {
  return window.playlist.addSong(LIKED_SONGS, JSON.parse(JSON.stringify(song)))
}

export function unlikeSong (song) {
  return window.playlist.removeSong(LIKED_SONGS, JSON.parse(JSON.stringify(song)))
}

export function addSong (playlist, song) {
  console.log('playlist', playlist)
  console.log('song', song)
  return window.playlist.addSong(playlist, song)
}

export function removeSong (playlist, song) {
  return window.playlist.removeSong(playlist, song)
}

export function isSongInPlaylist (playlist, songid) {
  return window.playlist.isSongInPlaylist(playlist, songid)
}

// Get JSON

export function exportPlaylist (playlist, name) {
  return window.playlist.exportPlaylist(playlist, name)
}

export function importPlaylist (name) {
  return window.playlist.importPlaylist(name)
}
