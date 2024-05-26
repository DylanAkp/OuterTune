import { searchManager, downloadManager } from 'ytmusic_api_unofficial'
import { ipcMain } from 'electron'

ipcMain.handle('search', async (event, query, type) => {
  try {
    const response = await searchManager.search(query, type, true)
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

ipcMain.handle('getRelatives', async (event, id) => {
  try {
    const relatives = await searchManager.relative(id)
    return JSON.parse(JSON.stringify(relatives))
  } catch (error) {
    console.error('Get Relatives Error:', error)
    throw error
  }
})
