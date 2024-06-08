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
    <div class="music-grid">
      <MusicComponent
        v-for="(result, index) in resultsMusics"
        :song="result"
        :key="index"
      />
    </div>
  </div>
</template>

<style>
</style>
