import type { User, UserSummary } from '@/shared/types/user'

export type UserResponseData = User

export type UsersResponseData = {
  users: UserSummary[]
}
