import { API_ENDPOINTS } from '@/shared/api/apiEndpoints'
import { requestApi } from '@/shared/api/requestApi'
import type {
  UserResponseData,
  UsersResponseData,
} from '@/shared/api/userApiType'

export function getUser(userId: number) {
  return requestApi<UserResponseData>({
    method: 'GET',
    url: API_ENDPOINTS.user(userId),
  })
}

export function getUsers() {
  return requestApi<UsersResponseData>({
    method: 'GET',
    url: API_ENDPOINTS.users,
  })
}
