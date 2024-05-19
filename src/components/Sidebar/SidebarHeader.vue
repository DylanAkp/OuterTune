<script>
import { switchTheme, getTheme } from 'src/utils/theme.js'

const icons = import.meta.glob('/src/assets/*.svg')

export default {
  data () {
    return {
      logoSrc: ''
    }
  },
  methods: {
    async switchTheme () {
      switchTheme()
      this.updateLogo()
    },
    async updateLogo () {
      const icon = getTheme() === 'light' ? icons['/src/assets/light.svg'] : icons['/src/assets/outer.svg']
      const module = await icon()
      this.logoSrc = module.default
    }
  },
  created () {
    this.updateLogo()
  }
}
</script>

<template>
  <div class="header-container">
    <img class="logo"
      alt="OuterTune Logo"
      :src="logoSrc"
      @click="switchTheme"
    >
    <div class="brand-name">OuterTune</div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  width: 90px;
  height: 90px;
  cursor: pointer;
}

.brand-name {
  margin-top: 10px;
  font-size: 35px;
  margin-left: 10px;
  font-weight: bold;
}

</style>
