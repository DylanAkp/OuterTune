<script setup>
import { useMusicStore } from 'src/store/music.js'
import { computed } from 'vue'

const musicStore = useMusicStore()

const progress = computed(() => musicStore.currentTime / musicStore.duration)
const setTime = (value) => musicStore.setCurrentTime(value) || 0
</script>

<template>
  <q-slider
    :model-value="progress"
    @update:model-value="value => setTime(value)"
    color="primary"
    :min="0"
    :max="1"
    track-size="10px"
    :step="0.01"
    thumb-size="0"
    />
</template>
