import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import os from 'os'
import { searchManager, downloadManager } from 'ytmusic_api_unofficial'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    minWidth: 1000,
    height: 600,
    minHeight: 600,
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.handle('search', async (event, query) => {
  try {
    const response = await searchManager.search(query, 'MUSIC', true)
    return JSON.parse(JSON.stringify(response))
  } catch (error) {
    console.error('Search Error:', error)
    throw error
  }
})

ipcMain.handle('download', async (event, id) => {
  try {
    return await downloadManager.download(id, 'mp3')
  } catch (error) {
    console.error('Download Error:', error)
    throw error
  }
})

ipcMain.handle('getSong', async (event, id) => {
  try {
    const song = await searchManager.get(id)
    return JSON.parse(JSON.stringify(song))
  } catch (error) {
    console.error('Get Song Error:', error)
    throw error
  }
})
