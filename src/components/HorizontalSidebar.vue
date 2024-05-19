<script>
import SidebarHeader from './Sidebar/SidebarHeader.vue'
import FloatingMusicPlayer from 'src/components/FloatingMusicPlayer.vue'
import VolumeSlider from './VolumeSlider.vue'

export default {
  components: {
    SidebarHeader,
    FloatingMusicPlayer,
    VolumeSlider
  }
}
</script>

<template>
  <div class="sidebar-content">
    <SidebarHeader class="header" />
    <div class="bottom">
      <FloatingMusicPlayer/>
      <VolumeSlider/>
    </div>
  </div>
</template>

<style scoped>
.bottom {
  margin-top: auto;
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
}
</style>
