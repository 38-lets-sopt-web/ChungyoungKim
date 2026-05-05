import { API_ENDPOINTS } from '@/shared/api/apiEndpoints'
import { requestApi } from '@/shared/api/requestApi'
import type { UserResponseData } from '@/shared/api/userApiType'

export async function getUser(userId: number) {
  return requestApi<UserResponseData>({
    method: 'GET',
    url: API_ENDPOINTS.user(userId),
  })
}
