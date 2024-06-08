<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getPlaylist, removeSong } from 'src/utils/playlist.js'
import MusicComponent from 'src/components/MusicComponent.vue'
import CategoryTitle from 'src/components/CategoryTitle.vue'

const route = useRoute()
const playlistName = computed(() => route.params.playlistName)
const songs = ref([])

const removeSongFromPlaylist = async (song) => {
  await removeSong(playlistName.value, song.id)
  songs.value = await getPlaylist(playlistName.value)
}

watchEffect(async () => {
  songs.value = await getPlaylist(playlistName.value)
})

</script>

<template>
  <div>
    <div class="nav">
      <q-icon name="fa-solid fa-arrow-left" @click="$router.push('/')" class="back-btn"/>
      <CategoryTitle :title="playlistName"/>
    </div>
    <div class="music-results">
      <MusicComponent v-for="(song, index) in songs" :isDeletable="true" :key="index" :song="song" @remove="removeSongFromPlaylist"/>
    </div>
  </div>
</template>

<style scoped>

.back-btn {
  cursor: pointer;
  background-color: var(--third-color);
  padding: 10px;
  border-radius: 50%;
}

.nav {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
}

.music-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}
</style>
