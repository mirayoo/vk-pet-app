import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { UsersService } from '@/services/users/usersService'
import { User, UsersSearchParams } from '@/types/users'

export const useUsersStore = defineStore('users', () => {
  const usersService = new UsersService()
  const users = ref<User[]>([])
  const usersSelected = ref<User[]>([])

  const usersInfo = computed(() => {
    return (
      users.value &&
      users.value.map((user) => {
        return {
          id: String(user.id),
          value: `${user.first_name} ${user.last_name}`,
          imageSrc: user.photo_100,
          addButtonDisabled: !!findUserById(usersSelected.value, String(user.id)),
          removeButtonDisabled: !findUserById(usersSelected.value, String(user.id)),
        }
      })
    )
  })
  const usersSelectedInfo = computed(() => {
    return (
      usersSelected.value &&
      usersSelected.value
        .map((user) => ({
          id: String(user.id),
          value: `${user.first_name} ${user.last_name}`,
          imageSrc: user.photo_100,
        }))
        .sort()
    )
  })

  const getUsers = async (params: Pick<UsersSearchParams, 'q'>) => {
    const data = params.q && params.q.length ? await usersService.getUsers(params) : []

    users.value = data?.items ?? []
  }
  const addUser = (id: string) => {
    const user = findUserById(users.value, id)

    if (!usersSelected.value.includes(user)) usersSelected.value = [...usersSelected.value, user]
  }

  const removeUser = (id: string) => {
    const user = findUserById(users.value, id)

    if (usersSelected.value.includes(user))
      usersSelected.value = usersSelected.value.filter((user) => {
        return String(user.id) !== id
      })
  }

  function findUserById(users: User[], id: string): User {
    return users.find((user) => String(user.id) === id)
  }

  return { users, usersSelected, usersInfo, usersSelectedInfo, getUsers, addUser, removeUser }
})
