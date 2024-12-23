<script lang="ts" setup>
//  Components
import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'

// Types

withDefaults(
  defineProps<{
    searchOptions: any[]
  }>(),
  {
    searchOptions: () => [],
  },
)
const emit = defineEmits(['search', 'add-option'])

const modelValue = defineModel<any>()

function handleChange() {
  if (modelValue.value.id) {
    emit('add-option', modelValue.value.id)
  }
}
</script>

<template>
  <div class="input-search w-full flex flex-nowrap gap-2">
    <AutoComplete
      v-model="modelValue"
      placeholder="Select user"
      class="grow"
      input-class="w-full"
      :suggestions="searchOptions"
      option-label="value"
      @complete="emit('search')"
    >
      <template #option="slotProps">
        <div
          class="base-list__option w-full flex items-center justify-start rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-50"
        >
          <span class="w-[40px] h-[40px] inline-flex shadow-md shadow-gray-400/30 rounded-md overflow-hidden mr-4">
            <img
              :src="slotProps.option.imageSrc"
              :alt="`${slotProps.option.value} photo`"
            />
          </span>
          {{ slotProps.option.value }}
        </div>
      </template>
    </AutoComplete>
    <Button
      label="Add user"
      @click="handleChange()"
    />
  </div>
</template>
<style scoped></style>
