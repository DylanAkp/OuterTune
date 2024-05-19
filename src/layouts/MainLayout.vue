<script setup>
import HorizontalSidebar from 'src/components/HorizontalSidebar.vue'
</script>

<template>
  <div class="application">
    <HorizontalSidebar class="sidebar no-select" />
    <RouterView class="page"/>
  </div>
</template>
