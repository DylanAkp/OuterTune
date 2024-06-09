import { ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import os from 'os'

let playlists = {}
const playlistsFilePath = path.join(os.homedir(), 'playlists.json')

function loadPlaylists () {
  if (fs.existsSync(playlistsFilePath)) {
    const data = fs.readFileSync(playlistsFilePath)
    playlists = JSON.parse(data)
  }
  if (!playlists['Liked Songs']) {
    playlists['Liked Songs'] = []
    savePlaylists()
  }
}

function savePlaylists () {
  const orderedPlaylists = { 'Liked Songs': playlists['Liked Songs'], ...playlists }
  fs.writeFileSync(playlistsFilePath, JSON.stringify(orderedPlaylists, null, 2))
}

loadPlaylists()

// Playlists

ipcMain.handle('getPlaylists', (event, arg) => {
  const orderedPlaylists = { 'Liked Songs': playlists['Liked Songs'], ...playlists }
  return orderedPlaylists
})

// PlayList

ipcMain.handle('isSongInPlaylist', (event, { name, songId }) => {
  if (playlists[name] && Array.isArray(playlists[name])) {
    return playlists[name].some(song => song.id === songId)
  }
  return false
})

ipcMain.handle('getPlaylist', (event, name) => {
  if (!playlists[name]) {
    playlists[name] = []
  }
  return playlists[name]
})

ipcMain.handle('createPlaylist', (event, name) => {
  if (playlists[name]) return
  playlists[name] = []
  savePlaylists()
})

ipcMain.handle('deletePlaylist', (event, name) => {
  if (name !== 'Liked Songs') {
    delete playlists[name]
    savePlaylists()
  }
})

// Songs

ipcMain.handle('addSong', (event, { name, song }) => {
  if (playlists[name]) {
    const songExists = playlists[name].some(existingSong => existingSong.id === song.id)
    if (!songExists) {
      playlists[name].push(song)
      savePlaylists()
    }
  }
})

ipcMain.handle('removeSong', (event, { name, songId }) => {
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
