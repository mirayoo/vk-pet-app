<script setup lang="ts">
import { useUsersStore } from '@/store/users/useUsersStore'
import { computed, onMounted } from 'vue'
import BaseCard from '@components/layouts/BaseCard.vue'
import UserList from '@components/common/UserList.vue'

const props = defineProps<{
  id: string
}>()

const usersStore = useUsersStore()
const user = computed(() => usersStore.userInfo)
const friends = computed(() => usersStore.userFriendsInfo)
const posts = computed(() => {
  return usersStore.postsInfo
})

onMounted(async () => {
  await usersStore.getUsers(props.id)
  await usersStore.getUserPosts(props.id)
})
</script>

<template>
  <BaseCard>
    <template #title>
      <img
        class="w-[80px] h-[80px] inline-flex shadow-md shadow-gray-400/30 rounded-md overflow-hidden mr-4"
        :src="user.imageSrc"
        :alt="user.value"
      />
      {{ user.value }}
    </template>
  </BaseCard>
  <div class="overflow-hidden flex flex-nowrap gap-6">
    <BaseCard
      class="grow w-32 overflow-hidden h-full"
      :pt="{
        body: { class: 'h-full' },
        content: { class: 'h-full' },
      }"
      card-class="flex flex-col justify-start gap-6"
    >
      <template #title> Friends </template>
      <div v-show="!friends.length">No friends available</div>
      <UserList
        v-show="friends.length"
        :items="friends"
      >
      </UserList>
    </BaseCard>
    <BaseCard
      class="grow w-64 overflow-hidden h-full"
      :pt="{
        body: { class: 'h-full' },
        content: { class: 'h-full' },
      }"
      card-class="flex flex-col justify-start gap-6"
    >
      <template #title> Posts </template>
      <div v-show="!posts.length">No posts available</div>

      <UserList
        v-show="posts.length"
        :items="posts"
      >
        <template #default="{ item, index }">
          <div
            class="flex flex-col sm:items-center p-6 gap-4"
            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
          >
            <span>
              <img
                v-if="item.image"
                class="w-full inline-flex shadow-md shadow-gray-400/30 rounded-md overflow-hidden mr-4"
                :src="item.image"
                alt="post image"
              />
            </span>
            <span v-if="item.text.length">
              {{ item.text }}
            </span>
          </div>
        </template>
      </UserList>
    </BaseCard>
  </div>
</template>

<style scoped></style>
