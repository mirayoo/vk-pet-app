<script setup lang="ts">
import BaseButton from '@components/common/BaseButton.vue'
import { OptionProps } from '@/types/common/search'
import { S } from '@/constants/common/button'
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

function handleRemove(id: string) {
  emit('remove-option', id)
}
</script>

<template>
  <div class="base-options absolute inset-x-0 top-14 z-50 rounded-md border border-gray-100 bg-white shadow-lg">
    <div
      v-if="!options.length"
      class="flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-50"
    >
      Nothing found
    </div>
    <BaseList
      v-else
      v-bind="$attrs"
      :items="options"
    >
      <template #append="{ item: option }">
        <div class="option__buttons flex gap-1 ml-auto mr-0">
          <BaseButton
            button-class="block rounded-md px-1.5 py-0.5 text-md hover:text-blue-100 hover:bg-blue-500"
            :size="S"
            :disabled="option.addButtonDisabled"
            @click="handleAdd(option.id)"
          >
            Add user
          </BaseButton>
          <BaseButton
            button-class="block ml-auto mr-0 rounded-md px-1.5 py-0.5 text-md hover:bg-red-400"
            :size="S"
            bg-color="bg-red-500"
            :disabled="option.removeButtonDisabled"
            @click="handleRemove(option.id)"
          >
            Remove user
          </BaseButton>
        </div>
      </template>
    </BaseList>
  </div>
</template>

<style scoped lang="scss">
.base-options {
  scrollbar-gutter: both-edges stable;

  ::-webkit-scrollbar {
    width: 8px;
    background: var(--gray-100);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray-400);
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
