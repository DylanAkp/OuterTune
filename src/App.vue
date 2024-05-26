<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { initTheme } from 'src/utils/theme.js'
import 'src/utils/playlist.js'

export default defineComponent({
  name: 'App',
  created () {
    initTheme()
  }
})
</script>
