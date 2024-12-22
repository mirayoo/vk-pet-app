<script setup lang="ts">
import BaseSidebar from '@components/layouts/BaseSidebar.vue'
</script>

<template>
  <div class="base-layout w-full h-full flex overflow-hidden bg-gray-100">
    <BaseSidebar class="flex-none" />
    <div class="base-layout__main p-6 w-full flex flex-col gap-6 content-start justify-start">
      <div class="header">Hello name 👋🏼,</div>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
