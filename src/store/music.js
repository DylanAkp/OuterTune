import { defineStore } from 'pinia'

const state = () => ({
  audio: null,
  results: [],
  song: [],
  isPlaying: false,
  queue: [],
  currentQueueIndex: -1
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
  async getSuggestions (id) {
    if (this.queue.length === 0) {
      this.queue.push(id)
      const relatives = await window.ytmusic.getRelatives(id)
      this.queue.push(...relatives.map(rel => rel.id))
      this.currentQueueIndex = 0
    } else if (this.currentQueueIndex === this.queue.length - 1) {
      const relatives = await window.ytmusic.getRelatives(id)
      this.queue.push(...relatives.map(rel => rel.id))
    }
    if (this.queue.length > 500) {
      const Remove = this.queue.length - 500
      this.queue.splice(0, Remove)
    }
  },
  async playMusic (id, eraseQueue = false) {
    try {
      if (eraseQueue) {
        this.queue = []
      }
      await this.setSong(id)
      await this.getSuggestions(id)
      const result = await window.ytmusic.download(id, 'mp3')
      if (this.audio) {
        this.audio.src = result.url
        this.audio.load()
      } else {
        this.audio = new Audio(result.url)
        this.audio.onended = () => {
          this.isPlaying = false
          this.song = []
          this.playNext()
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
  },
  addToQueue (id) {
    if (!this.queue.includes(id)) {
      this.queue.push(id)
    }
  },
  playNext () {
    if (this.currentQueueIndex < this.queue.length - 1) {
      this.currentQueueIndex++
      this.playMusic(this.queue[this.currentQueueIndex])
    }
  },
  playPrevious () {
    if (this.currentQueueIndex > 0) {
      this.currentQueueIndex--
      this.playMusic(this.queue[this.currentQueueIndex])
    }
  }
}

export const useMusicStore = defineStore('music', {
  state,
  getters,
  actions
})
