<script lang="ts" setup>
// Types
import { ButtonSize } from '@/types/common/button'
import { XL } from '@/constants/common/button'

interface ButtonProps {
  buttonClass?: string
  size?: ButtonSize
  color?: string
  bgColor?: string
  radius?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  buttonClass: '',
  size: XL,
  color: 'text-white',
  bgColor: 'bg-primary',
  radius: 'rounded-lg',
  disabled: false,
})
const emits = defineEmits(['click'])

function handleClick() {
  if (props.disabled) return

  emits('click')
}
</script>

<template>
  <button
    class="base-button cursor-pointer text-center inline-flex items-center me-2 duration-200"
    :class="[
      buttonClass,
      size,
      color,
      bgColor,
      radius,
      {
        'opacity-35 cursor-not-allowed': disabled,
      },
    ]"
    :disabled="disabled"
    type="button"
    @click="handleClick()"
  >
    <slot name="prepend" />
    <slot />
    <slot name="append" />
  </button>
</template>

<style scoped></style>
