<script setup lang="ts">
import VkLogoIcon from '@components/common/icons/VkLogoIcon.vue'
import MessageCloudIcon from '@components/common/icons/MessageCloudIcon.vue'
import SearchIcon from '@components/common/icons/SearchIcon.vue'
import LoadingSpinnerIcon from '@components/common/icons/LoadingSpinnerIcon.vue'

withDefaults(
  defineProps<{
    name: keyof typeof icons
    padding?: string
    iconWidth: string | number | null
    iconHeight: string | number | null
  }>(),
  {
    padding: 'p-3',
  },
)

const icons = {
  vkLogoIcon: VkLogoIcon,
  messageCloudIcon: MessageCloudIcon,
  searchIcon: SearchIcon,
  loadingSpinnerIcon: LoadingSpinnerIcon,
} as const
</script>

<template>
  <div
    class="icon-wrapper flex items-center justify-center"
    :class="[padding]"
  >
    <Component
      v-bind="$props"
      :is="icons[name]"
    />
  </div>
</template>

<style scoped></style>
