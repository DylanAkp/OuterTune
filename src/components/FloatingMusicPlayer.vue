<script>
import { computed } from 'vue'
import CategoryTitle from './CategoryTitle.vue'
import { useMusicStore } from 'src/store/music.js'

export default {
  components: {
    CategoryTitle
  },
  setup () {
    const musicStore = useMusicStore()

    return {
      isPlaying: computed(() => musicStore.isPlaying),
      title: computed(() => musicStore.song && musicStore.song.title ? musicStore.song.title : 'Nothing is playing'),
      artist: computed(() => musicStore.song && musicStore.song.artists && musicStore.song.artists.length > 0 ? musicStore.song.artists[0].name : ''),
      artwork: computed(() => musicStore.song && musicStore.song.artworks && musicStore.song.artworks.length > 0 ? musicStore.song.artworks[musicStore.song.artworks.length - 1].url : ''),
      playMusic: () => musicStore.pauseManager()
    }
  }
}
</script>

<template>
  <div class="floating-player" :style="{ backgroundImage: `url(${artwork})` }">
    <CategoryTitle class="music-title" :title="title"></CategoryTitle>
    <CategoryTitle class="artist" :title="artist"></CategoryTitle>
    <div class="control-btns">
      <q-icon class="ctrl-btn" size="20px" name="fa-solid fa-backward"></q-icon>
      <q-icon v-if="!isPlaying" class="ctrl-btn" size="20px" name="fa-solid fa-play"></q-icon>
      <q-icon v-else class="ctrl-btn" size="20px" name="fa-solid fa-pause" @click="playMusic"></q-icon>
      <q-icon class="ctrl-btn" size="20px" name="fa-solid fa-forward"></q-icon>
    </div>
  </div>
</template>

<style scoped>
.music-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
  background-color: var(--third-color);
}

.artist {
  font-size: 16px;
  margin-bottom: 10px;
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
  width: 340px;
  height: 200px;
  padding: 20px 50px;
  border-radius: 25px;
}
</style>
