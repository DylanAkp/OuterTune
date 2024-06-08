<script setup>
import FloatingMusicPlayer from 'src/components/FloatingMusicPlayer.vue'
import SidebarHeader from 'src/components/Sidebar/SidebarHeader.vue'
import VolumeSlider from 'src/components/VolumeSlider.vue'

// objects with routes
const routes = [
  { name: 'Home', icon: 'fa-solid fa-home', path: '/' },
  { name: 'Search', icon: 'fa-solid fa-search', path: '/search' },
  { name: 'Playlists', icon: 'fa-solid fa-list', path: '/playlists' }
]
</script>

<template>
  <div class="sidebar-content">
    <SidebarHeader class="header" />
    <div class="navigation">
      <div class="navicon" v-for="(route, index) in routes" :key="index" @click="$router.push(route.path)">
        <q-icon :name="route.icon" />
        {{ route.name }}
      </div>
    </div>
    <div class="bottom">
      <VolumeSlider class="volume bottom-element"/>
      <FloatingMusicPlayer class="bottom-element" />
    </div>
  </div>
</template>

<style scoped>

.navigation {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 30px;
}

.navicon:hover {
  background-color: var(--main-color);
}

.navicon {
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  background-color: var(--third-color);
  border-radius: 25px;
}

.header {
  margin-bottom: 30px;
}

.volume {
  width: 100%;
}

.bottom-element {
  width: 340px;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 30px;
}

.header {
  margin-bottom: 30px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  max-height: 100%;
  overflow: none;
}
</style>
