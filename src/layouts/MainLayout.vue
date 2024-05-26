<script setup>
import { onMounted, ref } from 'vue'
import HorizontalSidebar from 'src/components/HorizontalSidebar.vue'
import { version } from '../../package.json'

const checkForUpdates = ref(false)

const openLatestRelease = () => {
  window.open('https://github.com/DylanAkp/OuterTune/releases/latest')
}

onMounted(async () => {
  const response = await fetch('https://api.github.com/repos/DylanAkp/OuterTune/releases')
  const releases = await response.json()
  const latestRelease = releases[0].tag_name

  if (latestRelease > version) {
    checkForUpdates.value = true
  }
})
</script>

<template>
  <div class="application">
    <HorizontalSidebar class="sidebar no-select" />
    <RouterView class="page"/>
  </div>
  <q-dialog v-model="checkForUpdates" persistent class="custom-dialog">
    <q-card>
      <q-card-section>
        <div class="subtitle">
          A new version of OuterTune is available.
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Download"
          @click="openLatestRelease"
          color="blue"
        />
        <q-btn
          label="Close"
          @click="checkForUpdates = false"
          color="red"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.subtitle {
  color: var(--text-color);
}

.custom-dialog .q-card {
  border-radius: 20px;
  background-color: var(--main-color);
}

.custom-dialog .q-btn {
  background-color: var(--third-color);
  border-radius: 15px;
  color: var(--text-color);
}
</style>
