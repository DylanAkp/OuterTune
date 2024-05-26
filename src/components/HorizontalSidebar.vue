<script setup>
import SidebarHeader from './Sidebar/SidebarHeader.vue'
import FloatingMusicPlayer from 'src/components/FloatingMusicPlayer.vue'
import VolumeSlider from 'src/components/VolumeSlider.vue'
import PlaylistsHolder from 'src/components/PlayListsHolder.vue'
import { ref } from 'vue'

const showVolumeSlider = ref(false)
</script>

<template>
  <div class="sidebar-content">
    <SidebarHeader class="header" />
    <div class="content">
      <PlaylistsHolder class="playlists" />
    </div>
    <div class="bottom" @mouseover="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
      <VolumeSlider class="bottom-element"/>
      <FloatingMusicPlayer />
    </div>
  </div>
</template>

<style scoped>

.content {
  flex-grow: 1;
  overflow-y: auto;
}

.bottom-element {
  width: 340px;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  margin-bottom: 30px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  max-height: 100vh;
  overflow: none;
}
</style>
