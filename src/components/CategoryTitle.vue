<template>
  <div class="category-title" :title="title">
    {{ title }}
  </div>

</template>

<script setup>
defineProps({
  title: String
})
</script>

<style>

.category-title {
  background-color: var(--third-color);
  width: fit-content;
  max-width: 90%;
  font-size: large;
  font-weight: bold;
  text-align: center;
  color: var(--text-color);
  padding: 5px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 20px;
}
</style>
