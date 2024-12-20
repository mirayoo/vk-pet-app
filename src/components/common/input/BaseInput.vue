<script setup lang="ts">
// Plugins
import { debounce } from 'lodash'

defineProps<{ placeholder?: string }>()
const emit = defineEmits(['search'])

const value = defineModel<string>()

const debounceInput = debounce((value: string) => {
  emit('search', value)
}, 500)
</script>

<template>
  <div class="base-input relative w-full">
    <input
      v-model="value"
      class="w-full rounded-md border-gray-200 border-solid border px-2 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm sm:text-sm"
      :placeholder="placeholder"
      type="text"
      v-bind="$attrs"
      @input="debounceInput($event.target.value)"
    />
    <slot />
  </div>
</template>

<style scoped></style>
