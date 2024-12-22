<script setup lang="ts">
// Plugins
import { debounce } from '@/utils/helpers'
import { useTemplateRef } from 'vue'

defineProps<{
  placeholder?: string
  inputClass?: ''
}>()
const emit = defineEmits(['search', 'focus'])

useTemplateRef('base-input')

const value = defineModel<string>()

const debounceInput = debounce((value) => emit('search', value))
</script>

<template>
  <div class="base-input relative w-full">
    <input
      ref="base-input"
      v-model="value"
      class="w-full rounded-md border-gray-200 border-solid border px-2 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm sm:text-sm"
      :class="inputClass"
      :placeholder="placeholder"
      type="text"
      autocomplete="off"
      v-bind="$props"
      @focus="emit('focus')"
      @input="debounceInput($event.target.value)"
    />
    <slot />
  </div>
</template>

<style scoped></style>
