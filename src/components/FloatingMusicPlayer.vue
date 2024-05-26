<script setup>
import CategoryTitle from './CategoryTitle.vue'
import { computed, ref, watchEffect } from 'vue'
import { useMusicStore } from 'src/store/music.js'
import DurationSlider from './DurationSlider.vue'
import * as playlist from 'src/utils/playlist.js'

const showDialog = ref(false)
const playlists = ref([])

const openDialog = async () => {
  showDialog.value = true
  const playlistsObject = await playlist.getPlaylists()
  playlists.value = Object.entries(playlistsObject).map(([name, songs]) => ({ name, songs }))
}

const addSongToPlaylist = async (playlistName) => {
  const song = await musicStore.song
  playlist.addSong(playlistName, JSON.parse(JSON.stringify(song)))
  console.log(playlistName)
  console.log(song)
  showDialog.value = false
}

const musicStore = useMusicStore()
const playMusic = () => musicStore.pauseManager()
const previous = () => musicStore.playPrevious()
const next = () => musicStore.playNext()
const isPlaying = computed(() => musicStore.isPlaying)
const title = computed(() => musicStore.song && musicStore.song.title ? musicStore.song.title : 'Nothing is playing')
const artist = computed(() => musicStore.song && musicStore.song.artists && musicStore.song.artists.length > 0 ? musicStore.song.artists[0].name : '')
const artwork = computed(() => musicStore.song && musicStore.song.artworks && musicStore.song.artworks.length > 0 ? musicStore.song.artworks[musicStore.song.artworks.length - 1].url : '')
const shareIcon = ref('fas fa-link')
const liked = ref(false)

watchEffect(async () => {
  if (musicStore.song && musicStore.song.id) {
    liked.value = await playlist.isSongInPlaylist('Liked Songs', musicStore.song.id)
  }
})

const likedColor = computed(() => liked.value ? 'red' : '')

const toggleLike = () => {
  if (liked.value) {
    playlist.unlikeSong(musicStore.song.id)
    liked.value = false
  } else {
    playlist.likeSong(musicStore.song)
    liked.value = true
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  shareIcon.value = 'fas fa-check'
  setTimeout(() => {
    shareIcon.value = 'fas fa-link'
  }, 1000)
}
</script>

<template>
  <div class="floating-player" :style="{ backgroundImage: `url(${artwork})` }">
    <CategoryTitle class="music-title" :title="title"></CategoryTitle>
    <CategoryTitle class="artist" :title="artist"></CategoryTitle>
    <div class="control-btns">
      <q-icon class="ctrl-btn" size="20px" name="fa-solid fa-backward" @click="previous"></q-icon>
      <q-icon v-if="!isPlaying" class="ctrl-btn" size="20px" name="fa-solid fa-play" @click="playMusic"></q-icon>
      <q-icon v-else class="ctrl-btn" size="20px" name="fa-solid fa-pause" @click="playMusic"></q-icon>
      <q-icon class="ctrl-btn" size="20px" name="fa-solid fa-forward" @click="next"></q-icon>
    </div>
    <DurationSlider class="duration"/>
  </div>
  <div class="control-btns bottom-btns" v-if="artist != ''">
    <q-icon class="ctrl-btn" size="20px" :color="likedColor" name="fa-solid fa-heart" @click="toggleLike"></q-icon>
    <q-icon class="ctrl-btn" size="20px" name="fa-solid fa-plus" @click="openDialog"></q-icon>
    <q-icon class="ctrl-btn" size="20px" :name="shareIcon" @click="copyToClipboard(`https://music.youtube.com/watch?v=${musicStore.song.id}`)"></q-icon>
  </div>
  <q-dialog v-model="showDialog" class="custom-dialog">
    <q-card>
      <q-card-section class="column q-gutter-sm">
        <q-btn v-for="(playlist, index) in playlists" :key="index" :label="playlist.name" @click="addSongToPlaylist(playlist.name)"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>

.custom-dialog .q-card {
  border-radius: 25px;
  background-color: var(--main-color);
}

.custom-dialog .q-btn {
  background-color: var(--third-color);
  border-radius: 25px;
  color: var(--text-color);
}

.selector {
  position: absolute;
}

.bottom-btns {
  margin-top: 10px;
}

.duration {
  width: 85%;
}

.music-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  background-color: var(--third-color);
}

.artist {
  font-size: 16px;
  font-weight: 600;
  background-color: var(--third-color);
}

.control-btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.ctrl-btn {
  color: var(--text-color);
  background-color: var(--third-color);
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.floating-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-size: cover;
  background-color: var(--third-color);
  height: 220px;
  width: 340px;
  border-radius: 25px;
}
</style>
