import { ipcMain } from 'electron'
import fs from 'fs'

let playlists = {}

function loadPlaylists () {
  if (fs.existsSync('playlists.json')) {
    const data = fs.readFileSync('playlists.json')
    playlists = JSON.parse(data)
  }
}

function savePlaylists () {
  fs.writeFileSync('playlists.json', JSON.stringify(playlists, null, 2))
}

loadPlaylists()

// Getters

ipcMain.handle('getAllPlaylists', (event, arg) => {
  return playlists
})

ipcMain.handle('getPlaylist', (event, name) => {
  return playlists[name]
})

ipcMain.handle('getLikedSongs', (event, arg) => {
  return playlists['Liked Songs']
})

// Setters

ipcMain.handle('createPlaylist', (event, name) => {
  playlists[name] = []
  savePlaylists()
})

ipcMain.handle('addSongToPlaylist', (event, { name, song }) => {
  if (playlists[name]) {
    playlists[name].push(song)
    savePlaylists()
  }
})

ipcMain.handle('addLikedSong', (event, song) => {
  playlists['Liked Songs'].push(song)
  savePlaylists()
})

// Deleters

ipcMain.handle('deleteLikedSong', (event, songId) => {
  playlists['Liked Songs'] = playlists['Liked Songs'].filter(song => song.id !== songId)
  savePlaylists()
})

ipcMain.handle('deletePlaylist', (event, name) => {
  if (name !== 'Liked Songs') {
    delete playlists[name]
    savePlaylists()
  }
})

ipcMain.handle('deleteSongFromPlaylist', (event, { name, songId }) => {
  if (playlists[name]) {
    playlists[name] = playlists[name].filter(song => song.id !== songId)
    savePlaylists()
  }
})

// Export / imports

ipcMain.handle('exportPlaylist', (event, name) => {
  if (playlists[name]) {
    fs.writeFileSync(`${name}.json`, JSON.stringify(playlists[name], null, 2))
  }
})

ipcMain.handle('importPlaylist', (event, { name, filePath }) => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath)
    playlists[name] = JSON.parse(data)
    savePlaylists()
  }
})
