<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPlaylist } from 'src/utils/playlist.js'
import MusicComponent from 'src/components/MusicComponent.vue'
import CategoryTitle from 'src/components/CategoryTitle.vue'

const route = useRoute()
const playlistName = computed(() => route.params.playlistName)
const songs = ref([])

watch(playlistName, async (newPlaylistName) => {
  songs.value = await getPlaylist(newPlaylistName)
}, { immediate: true })

</script>

<template>
  <div class="homepage">
    <div class="nav margin-bottom">
      <q-icon name="fa-solid fa-arrow-left" @click="$router.push('/')" class="back-btn"/>
      <CategoryTitle :title="playlistName"/>
    </div>
    <div class="music-results">
      <MusicComponent v-for="(song, index) in songs" :key="index" :song="song"/>
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

.homepage {
  width: 100%;
  margin-left: 50px;
  margin-top: 50px;
  padding-bottom: 70px;
  overflow: auto;
}

.margin-bottom {
  margin-bottom: 30px;
}
</style>
