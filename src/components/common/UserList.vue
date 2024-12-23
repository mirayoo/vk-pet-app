<script setup lang="ts">
import BaseList from '@components/common/BaseList.vue'

defineProps<{
  items: any[]
}>()

function addBgColor(value) {
  const num = Number(value?.split(' ')[0])

  if (!num) {
    return {
      background: 'white',
    }
  }

  const alpha = (num * 10) / 100
  return {
    background: `rgba(59 130 246 / ${alpha})`,
  }
}
</script>

<template>
  <BaseList :items="items">
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <template #default="{ item, index }">
      <slot
        :item="item"
        :index="index"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
          :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
          :style="addBgColor(item.friendsCounter)"
        >
          <div class="md:w-12 relative">
            <img
              class="block xl:block mx-auto rounded w-full"
              :src="item.imageSrc"
              :alt="item.value"
            />
            <div
              class="absolute bg-black/70 rounded-border"
              style="left: 4px; top: 4px"
            ></div>
          </div>
          <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
              <div>
                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.sex }}</span>
                <div class="text-lg font-medium mt-2">{{ item.value }}</div>
              </div>
              <div
                class="bg-surface-100 p-1"
                style="border-radius: 30px"
              >
                <div
                  class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                  style="
                    border-radius: 30px;
                    box-shadow:
                      0 1px 2px 0 rgba(0, 0, 0, 0.04),
                      0 1px 2px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <span
                    v-show="item.friendsCounter"
                    class="text-surface-900 font-medium text-sm"
                  >
                    {{ item.friendsCounter }}
                  </span>
                  <span
                    v-if="item.born"
                    class="text-surface-900 font-medium text-sm"
                  >
                    Birthday: {{ item.born }}
                  </span>
                </div>
                <slot
                  name="append"
                  :item="item"
                />
              </div>
            </div>
          </div>
        </div>
      </slot>
    </template>
    <template
      v-if="$slots.footer"
      #footer
    >
      <slot name="footer" />
    </template>
  </BaseList>
</template>

<style scoped></style>
