<template>
  <div class="music-container" @mouseover="hovering = true" @mouseleave="hovering = false">
    <div class="artwork-container">
      <div v-if="loading" class="artwork-loader"></div>
      <img v-show="!loading" class="artwork" :src="props.artwork" alt="Music Artwork" @load="loading = false">
      <q-icon name="fas fa-play" class="play-button" v-show="hovering"></q-icon>
    </div>
    <div class="music-info">
      <div class="title" :class="{ 'scroll': isOverflowingTitle && hovering }" ref="titleRef">{{ props.title }}</div>
      <div class="artist" :class="{ 'scroll': isOverflowingArtist && hovering }" ref="artistRef">{{ props.artist }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  artwork: String,
  title: String,
  artist: String,
  id: String
})

const isOverflowingTitle = ref(false)
const isOverflowingArtist = ref(false)
const hovering = ref(false)
const loading = ref(true)

const titleRef = ref(null)
const artistRef = ref(null)

watchEffect(async () => {
  if (titleRef.value && artistRef.value) {
    isOverflowingTitle.value = titleRef.value.offsetWidth < titleRef.value.scrollWidth
    isOverflowingArtist.value = artistRef.value.offsetWidth < artistRef.value.scrollWidth
  }
})
</script>

<style scoped>
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
  0% { text-indent: 100% }
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
  cursor: pointer;
  position: relative;
}
</style>
