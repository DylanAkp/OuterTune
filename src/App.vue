<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { initTheme } from 'src/utils/theme.js'

export default defineComponent({
  name: 'App',
  created () {
    initTheme()
  }
})
</script>
