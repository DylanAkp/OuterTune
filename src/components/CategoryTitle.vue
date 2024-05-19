<template>
  <div class="category-title">
    {{ props.title }}
  </div>

</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style>

.category-title::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--third-color);
  border-radius: 20px;
  opacity: 0.9;
  z-index: -1;
}

.category-title {
  position: relative;
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 20px;
}
</style>
