<template>
  <div class="music-container" @mouseover="hovering = true" @mouseleave="hovering = false">
    <div class="artwork-container">
      <div v-if="loading" class="artwork-loader"></div>
      <img v-show="!loading" class="artwork" :src="song.artworks.find(artwork => artwork.width >= 200)?.url || song.artworks[0]?.url" alt="Music Artwork" @error="loading = true" @load="loading = false">
      <q-icon name="fas fa-play" class="icon play-button" v-show="hovering" @click="musicStore.playMusic(song, true)"></q-icon>
      <q-icon :name="shareIcon" class="icon share-button" v-show="hovering" @click="copyToClipboard(`https://music.youtube.com/watch?v=${song.id}`)"></q-icon>
    </div>
    <div class="music-info">
      <div class="title" :class="{ 'scroll': isOverflowingTitle && hovering }" ref="titleRef">{{ song.title }}</div>
      <div class="artist" :class="{ 'scroll': isOverflowingArtist && hovering }" ref="artistRef">{{ song.artists[0].name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useMusicStore } from 'src/store/music.js'

const musicStore = useMusicStore()

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  shareIcon.value = 'fas fa-check'
  setTimeout(() => {
    shareIcon.value = 'fas fa-link'
  }, 1000)
}

const shareIcon = ref('fas fa-link')

defineProps({
  song: {
    type: Object,
    required: true
  }
})

const isOverflowingTitle = ref(false)
const isOverflowingArtist = ref(false)
const hovering = ref(false)
const loading = ref(true)
const titleRef = ref(null)
const artistRef = ref(null)

watchEffect(() => {
  if (titleRef.value && artistRef.value) {
    isOverflowingTitle.value = titleRef.value.offsetWidth < titleRef.value.scrollWidth
    isOverflowingArtist.value = artistRef.value.offsetWidth < artistRef.value.scrollWidth
  }
})
</script>

<style scoped>
.icon {
  cursor: pointer;
}

.artwork-loader {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.artwork-container {
  position: relative;
}

.artwork {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  position: relative;
  z-index: 1;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: white;
  z-index: 2;
  display: none;
}

.share-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: white;
  z-index: 2;
}

.music-container:hover .play-button {
  display: block;
}

.music-container:hover .artwork {
  filter: brightness(50%);
}

.title, .artist {
  font-weight: bold;
  font-size: large;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}

.title.scroll, .artist.scroll {
  text-overflow: clip;
  animation: scroll 5s linear infinite;
}

@keyframes scroll {
  0% { text-indent: 0 }
  100% { text-indent: -100% }
}

.music-info {
  justify-content: center;
  align-items: center;
  width: 150px;
  text-align: center;
}

.music-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 260px;
  background-color: var(--secondary-color);
  border-radius: 20px;
  position: relative;
}
</style>
