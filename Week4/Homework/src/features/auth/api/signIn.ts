import { API_ENDPOINTS } from '@/shared/api/apiEndpoints'
import {
  signInRequestSchema,
  type SignInRequest,
} from '@/shared/api/authApiSchema'
import type { SignInResponseData } from '@/shared/api/authApiType'
import { requestApi } from '@/shared/api/requestApi'

export async function signIn(request: SignInRequest) {
  const validatedRequest = signInRequestSchema.parse(request)

  return requestApi<SignInResponseData, SignInRequest>({
    method: 'POST',
    url: API_ENDPOINTS.signin,
    data: validatedRequest,
  })
}
