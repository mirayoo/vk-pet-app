<script setup lang="ts">
import { OptionProps } from '@/types/common/search'
import BaseList from '@components/common/BaseList.vue'

withDefaults(
  defineProps<{
    options: OptionProps
  }>(),
  {
    options: () => [],
  },
)
const emit = defineEmits(['add-option', 'remove-option'])

function handleAdd(id: string) {
  emit('add-option', id)
}
</script>

<template>
  <BaseList
    class="base-options absolute inset-x-0 top-14 z-50 rounded-md border border-gray-100 bg-white shadow-lg"
    item-class="base-options__option cursor-pointer"
    allow-divider
    v-bind="$attrs"
    :items="options"
    @option-click="handleAdd"
  />
</template>

<style scoped lang="scss"></style>
