<script setup>
import CategoryTitle from 'src/components/CategoryTitle.vue'
import MusicComponent from 'src/components/MusicComponent.vue'
import { useMusicStore } from 'src/store/music'
import { ref, watchEffect } from 'vue'
import { getPlaylist } from 'src/utils/playlist.js'

const musicStore = useMusicStore()
const lastPlayed = ref([])
const liked = ref([])

watchEffect(async () => {
  liked.value = await getPlaylist('Liked Songs')
  lastPlayed.value = musicStore.getHistory().reverse()
})

</script>

<template>
  <div>
    <CategoryTitle class="page-title" title="Home"/>
    <CategoryTitle title="Last Played" v-if="lastPlayed.length != 0" />
    <div class="music-line">
      <MusicComponent
        v-for="(result, index) in lastPlayed"
        :song="result"
        :key="index"
      />
    </div>
    <CategoryTitle title="Liked" v-if="liked.length != 0" />
    <div class="music-line">
      <MusicComponent
        v-for="(result, index) in liked"
        :song="result"
        :key="index"
      />
    </div>
  </div>
</template>

<style>
.page-title {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  font-size: x-large;
}

.music-line {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  margin-bottom: 20px;
  margin-top: 20px;
}

.music-line::-webkit-scrollbar {
  height: 8px;
}
</style>
