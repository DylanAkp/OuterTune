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

.category-title {
  background-color: var(--third-color);
  width: fit-content;
  font-size: large;
  font-weight: bold;
  color: var(--text-color);
  padding: 5px 10px;
  border-radius: 20px;
}
</style>
