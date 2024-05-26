/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.js you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('youtube', {
  search: (query, type) => {
    return ipcRenderer.invoke('search', query, type)
  },
  download: (id, format) => {
    return ipcRenderer.invoke('download', id, format)
  },
  getSong: (id) => {
    return ipcRenderer.invoke('getSong', id)
  },
  getRelatives: (id) => {
    return ipcRenderer.invoke('getRelatives', id)
  }
})

contextBridge.exposeInMainWorld('playlist', {
  getAllPlaylists: () => {
    return ipcRenderer.invoke('getAllPlaylists')
  },
  getPlaylist: (name) => {
    return ipcRenderer.invoke('getPlaylist', name)
  },
  getLikedSongs: () => {
    return ipcRenderer.invoke('getLikedSongs')
  },
  createPlaylist: (name) => {
    return ipcRenderer.invoke('createPlaylist', name)
  },
  addSongToPlaylist: (name, song) => {
    return ipcRenderer.invoke('addSongToPlaylist', { name, song })
  },
  addLikedSong: (song) => {
    return ipcRenderer.invoke('addLikedSong', song)
  },
  deleteLikedSong: (songId) => {
    return ipcRenderer.invoke('deleteLikedSong', songId)
  },
  deletePlaylist: (name) => {
    return ipcRenderer.invoke('deletePlaylist', name)
  },
  deleteSongFromPlaylist: (name, songId) => {
    return ipcRenderer.invoke('deleteSongFromPlaylist', { name, songId })
  },
  exportPlaylist: (name) => {
    return ipcRenderer.invoke('exportPlaylist', name)
  },
  importPlaylist: (name, filePath) => {
    return ipcRenderer.invoke('importPlaylist', { name, filePath })
  }
})
