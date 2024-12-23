<script setup lang="ts"></script>

<template>
  <div class="base-layout w-full h-full flex overflow-hidden bg-gray-100">
    <div class="base-layout__main p-6 w-full flex flex-col gap-6 content-start justify-start">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
