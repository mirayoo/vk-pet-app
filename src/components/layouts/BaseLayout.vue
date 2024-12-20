<script setup lang="ts">
defineProps<{
  layoutClass?: string
  layoutWrapperClass?: string
  width?: string
}>()
</script>

<template>
  <div
    class="base-layout bg-gray-100 p-6 w-full h-full flex justify-center items-center"
    :class="[layoutWrapperClass]"
  >
    <div
      class="base-layout__card block p-6 h-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden overflow-y-auto"
      :class="[layoutClass, width ? width : 'w-full']"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
