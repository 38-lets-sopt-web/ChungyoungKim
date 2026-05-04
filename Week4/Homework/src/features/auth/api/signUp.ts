import { API_ENDPOINTS } from '@/shared/api/apiEndpoints'
import type { SignUpRequest } from '@/shared/api/authApiSchema'
import { requestApi } from '@/shared/api/requestApi'

export async function signUp(request: SignUpRequest) {
  return requestApi<unknown, SignUpRequest>({
    method: 'POST',
    url: API_ENDPOINTS.signup,
    data: request,
  })
}
