<template>
  <div class="volume-slider">
    <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="setVolume" />
  </div>
</template>

<script>
import { useMusicStore } from '../store/music'

export default {
  data () {
    return {
      volume: 0.5
    }
  },
  methods: {
    setVolume (event) {
      const volume = event.target.value
      useMusicStore().setVolume(volume)
    }
  }
}
</script>

<style>

.volume-slider {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 80%;
  align-items: center;
}

input[type="range"] {
  outline: 0;
  border: 0;
  border-radius: 500px;
  width: 400px;
  max-width: 100%;
  margin: 24px 0 16px;
  transition: box-shadow 0.2s ease-in-out;
  @media screen and (-webkit-min-device-pixel-ratio:0) {
  &  {
      overflow: hidden;
      height: 30px;
      -webkit-appearance: none;
     }
     &::-webkit-slider-thumb {
       width: 30px;
       -webkit-appearance: none;
       height: 30px;
       background: #1597ff;
       box-shadow: -340px 0 0 320px #1597ff;
       border-radius: 50%;
       position: relative;
     }
   }
}

</style>
