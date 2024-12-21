import VkOpenApiController from '@/api/vk/vkOpenApiController'
import { UsersSearchResponse } from '@/types/users/response'
import { UsersSearchParams } from '@/types/users'

export class UsersService {
  async getUsers(params: Pick<UsersSearchParams, 'q'>) {
    const searchParams = {
      q: params.q,
      sort: 1,
      count: 40,
      fields: ['photo_100', 'friend_status', 'common_count'],
    }

    return VkOpenApiController.fetch<UsersSearchResponse>('users.search', searchParams)
  }
}
