import VkOpenApiController from '@/api/vk/vkOpenApiController'
import { UsersSearchParams } from '@/types/users'

export class UsersService {
  async getUsers({
    user_ids,
    fields = ['photo_100', 'friend_status', 'common_count', 'counters', 'bdate'],
  }: {
    user_ids: string
    fields: string[]
  }): Promise<any> {
    const searchParams = {
      user_ids,
      fields,
    }

    return VkOpenApiController.fetch('users.get', searchParams)
  }

  async findUsers(params: Pick<UsersSearchParams, 'q'>): Promise<any> {
    const searchParams = {
      q: params.q,
      sort: 1,
      count: 40,
      fields: ['photo_100', 'friend_status', 'common_count'],
    }

    return VkOpenApiController.fetch('users.search', searchParams)
  }

  async getUserFriends(user_id: string, includeFields = true): Promise<any> {
    const params: any = { user_id }
    if (includeFields) {
      params.fields = ['bdate', 'sex', 'photo_100', 'followers_count', 'counters']
    }

    return VkOpenApiController.fetch('friends.get', params)
  }

  async getUserPosts(owner_id: string, limit: number = 100, offset: number = 0): Promise<any> {
    const params = {
      owner_id,
      extended: 1,
      count: limit,
      offset,
    }

    return VkOpenApiController.fetch('wall.get', params)
  }
}
