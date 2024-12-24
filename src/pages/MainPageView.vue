<script setup lang="ts">
import { computed, ref } from 'vue'

// Components
import InputSearch from '@components/common/input/InputSearch.vue'
import { useUsersStore } from '@/store/users/useUsersStore'
import BaseCard from '@components/layouts/BaseCard.vue'
import Button from 'primevue/button'
import UserList from '@components/common/UserList.vue'

const usersStore = useUsersStore()

const inputValue = ref<string>('')
const itemsPerPage = ref<number>(10)
const users = computed(() => usersStore.usersInfo)
const usersSelected = computed(() => {
  return usersStore.usersSelectedInfo
})
const friends = computed(() => usersStore.friendsInfo)
const isLoading = computed(() => usersStore.loading)
const friendsCount = computed(() => usersStore.friendsCountInfo)

function getUserFriendsCount(id) {
  return (
    friendsCount.value &&
    friendsCount.value.length &&
    friendsCount.value?.find((item) => String(item.id) === id)?.counters.friends
  )
}

async function getUsers() {
  await usersStore.findUsers({
    q: inputValue.value,
  })
}

function addUser(id: string) {
  return usersStore.addUser(id)
}

function removeUser(id: string) {
  return usersStore.removeUser(id)
}

async function getUsersFriends() {
  const userIds = usersSelected.value.map((user) => user.id)

  await usersStore.getUsersFriends(userIds).then(() => {
    const friendIds = friends.value.map((user) => user.id)

    usersStore.getFriendsCount(friendIds.slice(0, itemsPerPage.value))
  })
}

async function handlePageChange(e) {
  const userIds = friends.value.map((user) => user.id)

  const page = e.page
  const offset = itemsPerPage.value * page
  const step = itemsPerPage.value

  await usersStore.getFriendsCount(userIds.slice(offset, offset + step))
}
</script>

<template>
  <BaseCard>
    <InputSearch
      v-model="inputValue"
      :search-options="users"
      @search="getUsers()"
      @add-option="addUser($event)"
    />
  </BaseCard>
  <div class="main-list__wrapper overflow-hidden flex flex-nowrap gap-6">
    <BaseCard
      class="grow w-32 overflow-hidden h-full"
      :pt="{
        body: { class: 'h-full' },
        content: { class: 'h-full' },
      }"
      card-class="flex flex-col justify-start gap-6"
    >
      <div v-show="!usersSelected.length">No users added</div>
      <UserList
        v-show="usersSelected.length"
        :items="usersSelected"
        :rows="itemsPerPage"
        @remove-user="removeUser"
      >
        <template #append="{ item }">
          <Button
            label="Remove user"
            icon="pi pi-trash"
            severity="danger"
            @click="removeUser(item.id)"
          />
        </template>
        <template #footer>
          <Button
            class="w-full"
            label="Generate friends list"
            @click="getUsersFriends()"
          />
        </template>
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
      <UserList
        v-show="friends.length"
        :items="friends"
        :rows="itemsPerPage"
        @change-page="handlePageChange"
      >
        <template #append="{ item }">
          <span v-show="isLoading"> loading... </span>
          <span
            v-show="!isLoading"
            class="font-medium text-surface-500 dark:text-surface-400 text-md pr-2"
          >
            Friends: {{ getUserFriendsCount(item.id) }}
          </span>
          <Button
            label="Visit profile"
            as="router-link"
            :to="`/user/${item.id}`"
          />
        </template>
      </UserList>
    </BaseCard>
  </div>
</template>

<style scoped lang="scss"></style>
