<script>
import SidebarHeader from './Sidebar/SidebarHeader.vue'
import FloatingMusicPlayer from 'src/components/FloatingMusicPlayer.vue'
import VolumeSlider from 'src/components/VolumeSlider.vue'

export default {
  data () {
    return {
      showVolumeSlider: false
    }
  },
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
    <div class="bottom" @mouseover="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
      <VolumeSlider class="bottom-element"/>
      <FloatingMusicPlayer class="bottom-element" />
    </div>
  </div>
</template>

<style scoped>
.bottom-element {
  width: 340px;
}

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
