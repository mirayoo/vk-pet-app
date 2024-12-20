<script setup lang="ts">
import { onBeforeMount } from 'vue'
import VKAdapter from '@/api/vk/vkAdapter'

onBeforeMount(() => {
  VKAdapter.init()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
