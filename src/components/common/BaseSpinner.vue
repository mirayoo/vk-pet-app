<script setup lang="ts">
import BaseIcon from '@components/common/BaseIcon.vue'

defineProps<{
  iconWidth: string | number | null
  iconHeight: string | number | null
}>()
</script>

<template>
  <div class="text-gray-200 animate-spin dark:text-gray-600 fill-primary">
    <BaseIcon
      name="loadingSpinnerIcon"
      v-bind="$props"
    />
    <slot />
  </div>
</template>

<style scoped></style>
