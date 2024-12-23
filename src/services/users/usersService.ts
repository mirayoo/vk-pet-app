import VkOpenApiController from '@/api/vk/vkOpenApiController'
import { UsersSearchResponse } from '@/types/users/response'
import { UsersSearchParams } from '@/types/users'

export class UsersService {
  async getUsers(params) {
    const searchParams = {
      user_ids: params.user_ids,
      fields: ['photo_100', 'friend_status', 'common_count', 'counters', 'bdate'],
    }

    return VkOpenApiController.fetch<UsersSearchResponse>('users.get', searchParams)
  }

  async findUsers(params: Pick<UsersSearchParams, 'q'>) {
    const searchParams = {
      q: params.q,
      sort: 1,
      count: 40,
      fields: ['photo_100', 'friend_status', 'common_count'],
    }

    return VkOpenApiController.fetch<UsersSearchResponse>('users.search', searchParams)
  }

  async getUserFriends(user_id: string, includeFields = true): Promise<void> {
    const params = { user_id }
    if (includeFields) {
      params.fields = ['bdate', 'sex', 'photo_100', 'followers_count', 'counters']
    }

    return VkOpenApiController.fetch('friends.get', params)
  }

  async getUserPosts(owner_id: string) {
    const params = {
      owner_id,
      extended: 1,
    }

    return VkOpenApiController.fetch('wall.get', params)
  }
}
