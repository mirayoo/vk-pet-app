import { Paginated } from '@/types/common'
import { User } from '@/types/users/index'

export type UsersSearchResponse = Promise<Paginated<User>>
