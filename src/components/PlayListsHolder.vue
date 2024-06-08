<template>
  <div>
    <div class="create-playlist-bar">
      <input
        class="create-playlist-input"
        type="text"
        placeholder="Create Playlist"
        v-model="newPlaylistName"
        @keyup.enter="createPlaylist"
      />
      <div class="create-playlist-icon">
        <q-icon size="17px" name="fa-solid fa-plus" @click="createPlaylist" />
      </div>
    </div>
    <CategoryTitle title="Playlists" class="title"/>
    <div class="playlists-list">
      <div class="playlist" v-for="(value, playlistName, index) in playlists" :key="index" @click="openPlaylist(playlistName)">
        <q-icon v-if="playlistName === 'Liked Songs'" color="red" size="17px" name="fa-solid fa-heart" />
        {{ playlistName }}
        <div class="playlist-icons">
          <q-icon v-if="playlistName !== 'Liked Songs'" size="17px" name="fa-solid fa-trash" @click.stop="deletePlaylist(playlistName)" />
          <q-icon size="17px" name="fa-solid fa-play" @click.stop="playlist.setPlaylist(playlistName)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryTitle from './CategoryTitle.vue'
import * as playlist from 'src/utils/playlist.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const playlists = ref([])

const newPlaylistName = ref('')

const openPlaylist = (playlistName) => {
  router.push(`/playlist/${playlistName}`)
}

onMounted(async () => {
  playlists.value = await playlist.getPlaylists()
})

const createPlaylist = async () => {
  if (newPlaylistName.value) {
    await playlist.createPlaylist(newPlaylistName.value)
    playlists.value = await playlist.getPlaylists()
    newPlaylistName.value = ''
  }
}

const deletePlaylist = async (playlistName) => {
  await playlist.deletePlaylist(playlistName)
  playlists.value = await playlist.getPlaylists()
}
</script>

<style scoped>
.title {
  margin-bottom: 30px;
}

.playlist {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--third-color);
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  font-weight: 600;
  font-size: 18px;
  transition: padding-right 0.3s ease;
}

.playlist:hover {
  background-color: var(--secondary-color);
  padding-right: 70px;
}

.playlist:hover .playlist-icons {
  display: flex;
}

.playlist-icons {
  display: none;
  position: absolute;
  right: 15px;
  gap: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.create-playlist-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--third-color);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.playlists-list {
  display: flex;
  gap: 10px;
}

.create-playlist-input {
  height: 50px;
  width: 300px;
  border-radius: 25px;
  border: none;
  padding: 0 10px;
  background-color: var(--third-color);
}

.create-playlist-bar {
  background-color: var(--secondary-color);
  width: fit-content;
  border-radius: 30px;
  padding: 5px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
