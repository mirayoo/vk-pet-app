import VKAdapter from '@/api/vk/vkAdapter'
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

    return VKAdapter.fetch<UsersSearchResponse>('users.search', searchParams)
  }
}
