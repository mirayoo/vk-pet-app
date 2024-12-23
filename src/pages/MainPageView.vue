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
const users = computed(() => usersStore.usersInfo)
const usersSelected = computed(() => {
  return usersStore.usersSelectedInfo
})
const friends = computed(() => usersStore.friendsInfo)

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

function getUsersFriends() {
  const userIds = usersSelected.value.map((user) => user.id)

  return usersStore.getUsersFriends(userIds)
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
      >
        <template #append="{ item }">
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
