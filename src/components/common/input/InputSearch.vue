<script lang="ts" setup>
import { computed, ref } from 'vue'

//  Components
import BaseInput from '@components/common/input/BaseInput.vue'
import BaseIcon from '@components/common/BaseIcon.vue'
import BaseOptions from '@components/common/BaseOptions.vue'

// Types
import { OptionProps } from '@/types/common/search'

// Composables
import useFireWindowEvent from '@/composables/global/useFireWindowEvent'
const props = withDefaults(
  defineProps<{
    searchOptions: OptionProps[]
  }>(),
  {
    searchOptions: () => [],
  },
)
const isInputActive = ref(false)

const searchOptionsSize = computed(() => {
  return !!props.searchOptions.length
})
const showOptions = computed(() => {
  return searchOptionsSize.value && isInputActive.value
})

function updateOptionsShowState(show = false) {
  isInputActive.value = show
}

const restrictedClassList = ['base-options__option', 'input-search']
useFireWindowEvent('click', restrictedClassList, () => updateOptionsShowState(false, 1, 2, 3))
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
      input-class="input-search"
      placeholder="Enter user name or id"
      @focus="updateOptionsShowState(true)"
    >
      <BaseIcon
        class="search-icon absolute right-0 top-0 text-primary pointer-events-none"
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
      v-show="showOptions"
      allow-divider
      :options="searchOptions"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped></style>
