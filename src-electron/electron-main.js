import { app, BrowserWindow } from 'electron'
import './utils/youtube'
import './utils/playlist'
import path from 'path'
import os from 'os'

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
