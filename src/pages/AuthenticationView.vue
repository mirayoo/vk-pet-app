<script setup lang="ts">
import BaseLayout from '@components/layouts/BaseLayout.vue'
import BaseButton from '@components/common/BaseButton.vue'
import BaseIcon from '@components/common/BaseIcon.vue'
import VkOpenApiController from '@/api/vk/vkOpenApiController'

function signIn() {
  VkOpenApiController.auth()
}
</script>

<template>
  <BaseLayout
    layout-class="flex justify-center items-center flex-col gap-6"
    width="w-96"
  >
    <img
      class="w-64 max-w-full"
      src="/img/svg/manWithPhone.svg"
      alt="Man with a phone"
    />
    <h2 class="text-primary">Sign in to proceed</h2>
    <BaseButton
      button-class="hover:shadow-lg hover:shadow-primary/30 active:shadow-xl active:shadow-primary/50"
      @click="signIn"
    >
      <template #prepend>
        <BaseIcon
          padding="pr-3"
          icon-width="24"
          icon-height="24"
          name="vkLogoIcon"
        />
      </template>
      Sign in via VK
    </BaseButton>
  </BaseLayout>
</template>

<style scoped></style>
