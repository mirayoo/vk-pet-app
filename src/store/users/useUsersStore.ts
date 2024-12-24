import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { UsersService } from '@/services/users/usersService'
import { User, UsersSearchParams } from '@/types/users'

export const useUsersStore = defineStore('users', () => {
  const usersService = new UsersService()
  const users = ref<User[]>([])
  const usersSelected = ref<User[]>([])
  const friends = ref<User[]>([])
  const friendsCount = ref<any[]>([])
  const user = ref<User>({} as User)
  const userFriendIds = ref<string[]>([])
  const posts = ref<any[]>([])
  const loading = ref<boolean>(false)

  const userInfo = computed(() => {
    return {
      id: String(user.value.id),
      value: `${user.value.first_name} ${user.value.last_name}`,
      imageSrc: user.value.photo_100,
      addButtonDisabled: !!findUserById(usersSelected.value, String(user.value.id)),
      removeButtonDisabled: !findUserById(usersSelected.value, String(user.value.id)),
      friends: user.value.friendsList,
    } as any
  })
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
        .sort((a, b) => a.value.localeCompare(b.value))
    )
  })

  const friendsInfo = computed(() => {
    return (
      friends.value &&
      friends.value
        .map((user: any) => {
          let sex

          switch (user.sex) {
            case 1:
              sex = 'Female'
              break
            case 2:
              sex = 'Male'
              break
            case 3:
              sex = ''
          }

          return {
            id: String(user.id),
            value: `${user.first_name} ${user.last_name}`,
            sex,
            imageSrc: user.photo_100,
            born: user?.bdate,
            friendsCounter: `${user.friends?.length} ${user.friends?.length > 1 ? 'friends' : 'friend'}`,
          }
        })
        .sort((a, b) => a.value.localeCompare(b.value))
    )
  })

  const friendsCountInfo = computed(() => friendsCount.value)

  const userFriendsInfo = computed(() => {
    return usersSelectedInfo.value.filter((friend) => {
      return userFriendIds.value.includes(friend.id)
    })
  })

  const postsInfo = computed(() => {
    return posts.value
      .map((post) => {
        const image =
          !post.attachments.length || post.attachments[0].type !== 'photo'
            ? ''
            : post.attachments[0].photo?.sizes[post.attachments[0].photo.sizes.length - 1].url

        return {
          id: post.id,
          date: post.date,
          image,
          text: post.text,
        }
      })
      .filter((post) => post.text.length || post.image.length)
      .sort((a, b) => a.date - b.date)
  })

  const getUsers = async (user_ids: string) => {
    const [data] = await usersService.getUsers({ user_ids })

    const currentUser: any = findUserById(friends.value, String(data.id))

    user.value = data
    userFriendIds.value = currentUser?.friendsList ?? []
  }

  const findUsers = async (params: Pick<UsersSearchParams, 'q'>) => {
    const data = params.q && params.q.length ? await usersService.findUsers(params) : []

    users.value = data?.items ?? []
  }
  const addUser = (id: string) => {
    const user = findUserById(users.value, id)

    if (!usersSelected.value.includes(user)) usersSelected.value = [...usersSelected.value, user]
  }

  const removeUser = (id: string) => {
    usersSelected.value = usersSelected.value.filter((user) => {
      return String(user.id) !== id
    })
  }

  const getFriendsCount = async (user_ids: string) => {
    let i = 0
    const result = []
    friendsCount.value = []
    loading.value = true

    async function getFriendsCountInnerFn() {
      do {
        if (!user_ids[i]) break

        const [data] = await usersService.getUsers({
          user_ids: user_ids[i],
          fields: ['counters'],
        })
        i++
        result.push(data)
      } while (i % 3 !== 0 && i < user_ids.length)

      if (i === user_ids.length) {
        loading.value = false
        friendsCount.value = result

        return
      }
      setTimeout(getFriendsCountInnerFn, 1500)
    }

    getFriendsCountInnerFn()
  }

  const getUsersFriends = async (userIds: string | string[]) => {
    const friendsList = new Map()

    for (let i = 0; i < userIds.length; i++) {
      const data = await usersService.getUserFriends(userIds[i])

      if (data && data.items) {
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
    }

    friends.value = Array.from(friendsList.values())
  }

  const getUserPosts = async (owner_id) => {
    const data = await usersService.getUserPosts(owner_id)

    posts.value = data?.items ?? []
  }

  function findUserById(users: User[], id: string): User {
    return users.find((user) => String(user.id) === id)
  }

  return {
    loading,
    user,
    users,
    usersSelected,
    friends,
    posts,
    userInfo,
    usersInfo,
    usersSelectedInfo,
    friendsInfo,
    friendsCountInfo,
    userFriendsInfo,
    postsInfo,
    getUsers,
    findUsers,
    addUser,
    removeUser,
    getUsersFriends,
    getUserPosts,
    getFriendsCount,
  }
})
