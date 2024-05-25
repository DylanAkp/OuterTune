<script setup>
import { computed } from 'vue'
import MusicComponent from 'src/components/MusicComponent.vue'
import SearchBar from 'src/components/SearchBar.vue'
import { useMusicStore } from 'src/store/music.js'
import CategoryTitle from 'src/components/CategoryTitle.vue'

const musicStore = useMusicStore()
const resultsMusics = computed(() => musicStore.resultsMusics)
</script>

<template>
  <div class="homepage">
    <SearchBar />
    <CategoryTitle v-if="resultsMusics.length != 0" class="margin-bottom" title="Songs" />
    <div class="music-results">
      <MusicComponent
        v-for="(result, index) in resultsMusics"
        :song="result"
        :key="index"
      />
    </div>
  </div>
</template>

<style>
.margin-bottom {
  margin-bottom: 20px;
}

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
