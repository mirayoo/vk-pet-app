<script setup lang="ts">
import Card from 'primevue/card'

defineProps<{
  cardClass?: string
  cardWrapperClass?: string
  width?: string
}>()
</script>

<template>
  <Card>
    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>
    <template
      v-if="$slots.subtitle"
      #subtitle
    >
      <slot name="subtitle" />
    </template>
    <template
      v-if="$slots.default"
      #content
    >
      <slot />
    </template>
    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </Card>
</template>

<style scoped></style>
