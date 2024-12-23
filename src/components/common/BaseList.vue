<script setup lang="ts">
import DataView from 'primevue/dataview'

defineProps<{
  items: any[]
}>()
</script>

<template>
  <DataView
    :value="items"
    paginator
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
    :rows="10"
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
