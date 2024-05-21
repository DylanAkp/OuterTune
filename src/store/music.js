import { defineStore } from 'pinia'

const state = () => ({
  audio: null,
  results: [],
  song: [],
  isPlaying: false
})

const getters = {
}

const actions = {
  setVolume (volume) {
    if (this.audio) {
      this.audio.volume = volume
    }
  },
  async setSong (id) {
    try {
      this.song = await window.ytmusic.getSong(id)
    } catch (error) {
      console.error(error)
    }
  },
  async playMusic (id) {
    try {
      const result = await window.ytmusic.download(id, 'mp3')
      await this.setSong(id)
      if (this.audio) {
        this.audio.src = result.url
        this.audio.load()
      } else {
        this.audio = new Audio(result.url)
        this.audio.onended = () => {
          this.isPlaying = false
          this.song = []
        }
      }
      this.audio.play()
      this.isPlaying = !this.audio.paused
    } catch (error) {
      console.error(error)
    }
  },
  pauseManager () {
    if (this.audio) {
      this.audio.paused ? this.audio.play() : this.audio.pause()
      this.isPlaying = !this.audio.paused
    }
  },
  async search (query) {
    try {
      const results = await window.ytmusic.search(query)
      this.results = results
    } catch (error) {
      console.error(error)
    }
  }
}

export const useMusicStore = defineStore('music', {
  state,
  getters,
  actions
})
