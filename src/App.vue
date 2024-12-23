<script setup lang="ts">
import { onBeforeMount } from 'vue'
import AppService from '@/services/appService'
import BaseLayout from '@components/layouts/BaseLayout.vue'

onBeforeMount(() => {
  AppService.initVkOpenApi()
})
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>

<style scoped></style>
