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
  <div>
    <SearchBar/>
    <CategoryTitle v-if="resultsMusics.length != 0" title="Songs" />
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

.music-results {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0));
  gap: 20px;
  justify-content: space-around;
}
</style>
