import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { UsersService } from '@/services/users/usersService'
import { User, UsersSearchParams } from '@/types/users'

export const useUsersStore = defineStore('users', () => {
  const usersService = new UsersService()
  const users = ref<User[]>([])
  const usersSelected = ref<User[]>([])
  const friends = ref<User[]>([])

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

  const friendsInfo = computed(() => {
    return (
      friends.value &&
      friends.value
        .map((user) => ({
          id: String(user.id),
          value: `${user.first_name} ${user.last_name}`,
          imageSrc: user.photo_100,
        }))
        .sort()
    )
  })

  const findUsers = async (params: Pick<UsersSearchParams, 'q'>) => {
    const data = params.q && params.q.length ? await usersService.findUsers(params) : []

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

  const getUsersFriends = async (userIds: string) => {
    const friendsList = new Map()

    for (let i = 0; i < userIds.length; i++) {
      const data = await usersService.getUserFriends(userIds[i])

      data.items.forEach((friend) => {
        if (friendsList.has(friend.id)) {
          const prev = friendsList.get(friend.id)
          friendsList.set(friend.id, {
            ...friend,
            friendsList: [...prev.friendsList, userIds[i]],
          })
        } else {
          friendsList.set(friend.id, {
            ...friend,
            friendsList: Array.from([userIds[i]]),
          })
        }
      })
    }

    friends.value = Array.from(friendsList.values())
  }

  function findUserById(users: User[], id: string): User {
    return users.find((user) => String(user.id) === id)
  }

  return {
    users,
    usersSelected,
    friends,
    usersInfo,
    usersSelectedInfo,
    friendsInfo,
    findUsers,
    addUser,
    removeUser,
    getUsersFriends,
  }
})
