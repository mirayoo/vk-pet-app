<script setup lang="ts">
import { OptionProps } from '@/types/common/search'

const props = withDefaults(
  defineProps<{
    items: OptionProps
    itemClass?: string
    allowDivider?: boolean
    activeItemId?: string
  }>(),
  {
    items: () => [],
    itemClass: '',
    allowDivider: false,
    activeItemId: null,
  },
)

const emit = defineEmits(['option-click'])

function showDivider(index, size) {
  return index < size && props.allowDivider
}
</script>

<template>
  <ul class="base-list max-h-64 overflow-auto">
    <li
      v-for="(item, index) in items"
      :key="item.id"
    >
      <div
        class="base-list__option w-full flex items-center justify-start rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-50"
        :class="[itemClass, { active: activeItemId === item.id }]"
        @click="emit('option-click', item.id)"
      >
        <slot
          name="prepend"
          :item="item"
        />
        <slot name="image">
          <span class="w-[40px] h-[40px] inline-flex shadow-md shadow-gray-400/30 rounded-md overflow-hidden mr-4">
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
      <div
        v-if="showDivider(index, items.length - 1)"
        class="w-full h-0 border-t border-primary/10"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.base-list {
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 8px;
    background: var(--gray-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-400);
    border-radius: 4px;
    cursor: pointer;
  }

  &__option {
    &.active {
      background: var(--gray-100);
    }
  }
}
</style>
