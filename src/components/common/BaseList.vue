<script setup lang="ts">
import DataView from 'primevue/dataview'

defineProps<{
  items: any[]
  rows: number
}>()
const emit = defineEmits(['change-page'])

function getCurrentPage(e) {
  emit('change-page', e)
}
</script>

<template>
  <DataView
    :value="items"
    paginator
    data-key="users"
    class="flex flex-col"
    :pt="{
      content: {
        class: 'base-list h-full overflow-y-auto',
        style: {
          'scrollbar-gutter': 'stable',
        },
      },
      root: { class: 'overflow-hidden h-full' },
    }"
    :rows="rows"
    @page="getCurrentPage"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>
    <template #list="slotProps">
      <div
        v-for="(item, index) in slotProps.items"
        :key="item.id"
      >
        <slot
          name="default"
          :item="item"
          :index="index"
        />
      </div>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </DataView>
</template>
