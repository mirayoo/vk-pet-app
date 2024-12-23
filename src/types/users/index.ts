type BinaryBoolean = 1 | 0
type UsersSearchSpecifiedList = 'friends' | 'subscriptions'

export interface UsersSearchParams {
  q: string
  sort: BinaryBoolean
  offset: number
  count: number
  fields: string[]
  from_list: UsersSearchSpecifiedList
}

export interface User {
  id: number
  first_name: string
  last_name: string
  deactivated: boolean
  is_closed: boolean
  can_access_closed: boolean
  common_count: number
  photo_100: string
  friendsList?: any[]
}
