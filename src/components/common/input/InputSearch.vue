<script lang="ts" setup>
import { ref } from 'vue'

//  Components
import BaseInput from '@components/common/input/BaseInput.vue'
import BaseIcon from '@components/common/BaseIcon.vue'
import BaseOptions from '@components/common/BaseOptions.vue'

// Plugins
import { debounce } from 'lodash'

// Types
import { OptionProps } from '@/types/common/search'

withDefaults(
  defineProps<{
    showOptions: boolean
    searchOptions: OptionProps[]
  }>(),
  {
    showOptions: false,
    searchOptions: () => [],
  },
)

const isInputActive = ref(false)

const updateOptionsShowState = debounce((show) => {
  isInputActive.value = show
}, 300)
</script>

<template>
  <div class="relative w-full flex justify-start items-start h-auto">
    <label
      class="sr-only"
      for="SiteSearch"
      >Search
    </label>
    <BaseInput
      v-bind="$attrs"
      class="border-primary"
      placeholder="Enter user name or id"
      @focus="updateOptionsShowState(true)"
      @blur="updateOptionsShowState(false)"
    >
      <BaseIcon
        class="absolute right-0 top-0 text-primary"
        name="searchIcon"
        icon-width="16"
        icon-height="16"
      />
    </BaseInput>
    <button
      class="sr-only"
      tabindex="-1"
    >
      Submit
    </button>
    <BaseOptions
      v-show="isInputActive && showOptions"
      :options="searchOptions"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped></style>
