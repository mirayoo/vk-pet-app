<script setup lang="ts">
import { OptionProps } from '@/types/common/search'

withDefaults(
  defineProps<{
    items: OptionProps
    itemClass?: string
  }>(),
  {
    items: () => [],
    itemClass: '',
  },
)
</script>

<template>
  <ul class="base-list max-h-64 space-y-1 overflow-auto p-2">
    <li
      v-for="item in items"
      :key="item.id"
    >
      <div
        class="flex items-center justify-start rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-50"
        :class="[itemClass]"
      >
        <slot
          name="prepend"
          :item="item"
        />
        <slot name="image">
          <span class="w-[50px] h-[50px] inline-flex shadow-md shadow-gray-400/30 rounded-md overflow-hidden mr-4">
            <img
              :src="item.imageSrc"
              :alt="`${item.value} photo`"
            />
          </span>
        </slot>
        <slot name="value">
          <span>{{ item.value }}</span>
        </slot>
        <slot
          name="append"
          :item="item"
        />
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.base-list {
  scrollbar-gutter: both-edges stable;

  &::-webkit-scrollbar {
    width: 8px;
    background: var(--gray-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-400);
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
