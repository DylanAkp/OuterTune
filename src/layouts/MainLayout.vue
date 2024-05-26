<script setup>
import HorizontalSidebar from 'src/components/HorizontalSidebar.vue'
import { version } from '../../package.json'

console.log('Version:', version)
</script>

<template>
  <div class="application">
    <HorizontalSidebar class="sidebar no-select" />
    <RouterView class="page"/>
  </div>
</template>
