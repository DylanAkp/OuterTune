<script setup>
import { computed } from 'vue'
import MusicComponent from 'src/components/MusicComponent.vue'
import SearchBar from 'src/components/SearchBar.vue'
import { useMusicStore } from 'src/store/music.js'

const musicStore = useMusicStore()
const results = computed(() => musicStore.results)
</script>

<template>
  <div class="homepage">
    <SearchBar />
    <div class="music-results">
      <MusicComponent
        v-for="(result, index) in results"
        :key="index"
        :title="result.title"
        :artist="result.artists[0].name"
        :artwork="result.artworks[result.artworks.length - 1].url"
        @click="musicStore.playMusic(result.id)"
      />
    </div>
  </div>
</template>

<style>
.music-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.homepage {
  width: 100%;
  margin-left: 50px;
  margin-top: 50px;
  scrollbar-width: none;
  padding-bottom: 70px;
  overflow: auto;
}

.homepage::-webkit-scrollbar {
  display: none;
}
</style>
