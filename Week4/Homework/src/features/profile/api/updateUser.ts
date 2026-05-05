import { API_ENDPOINTS } from '@/shared/api/apiEndpoints'
import {
  type UserUpdateRequest,
  userUpdateRequestSchema,
} from '@/shared/api/authApiSchema'
import { requestApi } from '@/shared/api/requestApi'

export async function updateUser(userId: number, request: UserUpdateRequest) {
  const validatedRequest = userUpdateRequestSchema.parse(request)

  return requestApi<unknown, UserUpdateRequest>({
    method: 'PATCH',
    url: API_ENDPOINTS.user(userId),
    data: validatedRequest,
  })
}
