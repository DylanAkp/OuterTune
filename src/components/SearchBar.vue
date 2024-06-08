<template>
  <div class="search-bar">
    <input
      class="search-input"
      type="text"
      placeholder="Search for music"
      v-model="query"
      @keyup.enter="searchMusic"
      :disabled="isLoading"
    />
    <div class="search-icon">
      <q-icon v-if="isLoading" size="20px" name="fa-solid fa-hourglass-start" spin />
      <q-icon v-else size="20px" name="fa-solid fa-search" @click="searchMusic" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMusicStore } from 'src/store/music.js'

const musicStore = useMusicStore()

const query = ref('')
const isLoading = ref(false)

async function searchMusic () {
  if (!query.value) return
  isLoading.value = true
  await musicStore.search(query.value).then(() => {
    isLoading.value = false
  }).catch(() => {
    isLoading.value = false
  })
}

</script>

<style scoped>
.search-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--third-color);
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.search-input {
  width: 300px;
  height: 50px;
  border-radius: 25px;
  border: none;
  padding: 0 10px;
  background-color: var(--third-color);
}

.search-bar {
  background-color: var(--secondary-color);
  width: fit-content;
  border-radius: 30px;
  padding: 5px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
