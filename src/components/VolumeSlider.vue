<template>
  <div class="widget">
    <q-icon name="fa-solid fa-volume-up" size="20px" />
    <q-slider
      :min="0"
      :max="1"
      :step="0.01"
      :model-value="volume"
      @update:model-value="value => setVolume(value)"
      thumb-size="0"
      track-size="10px"
    />
  </div>
</template>

<script setup>
import { useMusicStore } from 'src/store/music.js'
import { computed } from 'vue'

const musicStore = useMusicStore()

const volume = computed(() => musicStore.volume)
const setVolume = (value) => musicStore.setVolume(value)
</script>
