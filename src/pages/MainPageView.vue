<script setup lang="ts">
import { computed, ref } from 'vue'

// Components
import BaseLayout from '@components/layouts/BaseLayout.vue'
import InputSearch from '@components/common/input/InputSearch.vue'
import { useUsersStore } from '@/store/users/useUsersStore'
import BaseList from '@components/common/BaseList.vue'
import BaseButton from '@components/common/BaseButton.vue'
import { S, XL } from '@/constants/common/button'
import BaseCard from '@components/layouts/BaseCard.vue'

const usersStore = useUsersStore()

const inputValue = ref<string>('')
const users = computed(() => usersStore.usersInfo)
const usersSelected = computed(() => usersStore.usersSelectedInfo)
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
  <BaseLayout>
    <BaseCard card-class="flex flex-col justify-start gap-6">
      <InputSearch
        v-model="inputValue"
        :search-options="users"
        @search="getUsers()"
        @add-option="addUser($event)"
        @remove-option="removeUser($event)"
      />
      <div class="main-list__wrapper max-h-full overflow-hidden flex flex-col gap-6">
        <div v-show="!usersSelected.length">No users added</div>
        <div
          v-show="usersSelected.length"
          class="main-list"
        >
          <BaseList
            class="max-h-full flex flex-col bg-blue-50 rounded-md"
            :items="usersSelected"
            item-class="hover:bg-blue-100"
          >
            <template #append="{ item }">
              <div class="option__buttons flex gap-1 ml-auto mr-0">
                <BaseButton
                  button-class="block ml-auto mr-0 rounded-md px-1.5 py-0.5 text-md hover:bg-red-400"
                  :size="S"
                  bg-color="bg-red-500"
                  @click="removeUser(item.id)"
                >
                  Remove user
                </BaseButton>
              </div>
            </template>
          </BaseList>

          <BaseButton
            button-class="block w-full justify-center text-lg font-medium"
            :size="XL"
            @click="getUsersFriends()"
          >
            Generate friends list
          </BaseButton>
        </div>
      </div>
      <div class="friends-list">
        <BaseList :items="friends" />
      </div>
    </BaseCard>
  </BaseLayout>
</template>

<style scoped></style>
