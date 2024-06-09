<script setup>
import CategoryTitle from 'src/components/CategoryTitle.vue'
import MusicComponent from 'src/components/MusicComponent.vue'
import { useMusicStore } from 'src/store/music'
import { onMounted, ref } from 'vue'

const musicStore = useMusicStore()

const history = ref([])

onMounted(() => {
  history.value = []
  history.value = musicStore.getHistory()
})

const clearHistory = () => {
  musicStore.clearHistory()
  history.value = []
}
</script>

<template>
  <div>
    <div class="topbar">
      <CategoryTitle title="History" />
      <div class="icon-container" @click="clearHistory">
        <q-icon name="fa-solid fa-trash" size="20px" />
      </div>
    </div>
    <div class="music-grid">
      <MusicComponent
        v-for="(result, index) in history"
        :song="result"
        :key="index"
      />
    </div>
  </div>
</template>

<style>
.icon-container {
  display: flex;
  cursor: pointer;
  background-color: red;
  padding: 10px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
}

.topbar {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
}
</style>
