<script setup lang="ts">
import { onBeforeMount } from 'vue'
import AppService from '@/services/appService'

onBeforeMount(() => {
  AppService.initVkOpenApi()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
