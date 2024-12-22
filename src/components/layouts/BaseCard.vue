<script setup lang="ts">
defineProps<{
  cardClass?: string
  cardWrapperClass?: string
  width?: string
}>()
</script>

<template>
  <div
    class="base-card grow block p-4 bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
    :class="[cardClass, width ? width : 'w-full']"
  >
    <slot />
  </div>
</template>

<style scoped></style>
