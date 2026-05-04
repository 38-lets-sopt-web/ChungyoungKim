import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from 'axios'

import type { ApiResponse } from '@/shared/api/apiResponse'
import { httpClient } from '@/shared/api/httpClient'

export type RequestApiConfig<TRequestData = unknown> = Omit<
  AxiosRequestConfig<TRequestData>,
  'method' | 'url'
> & {
  method: Method
  url: string
}

export async function requestApi<
  TResponseData = unknown,
  TRequestData = unknown,
>(config: RequestApiConfig<TRequestData>): Promise<ApiResponse<TResponseData>> {
  const response = await httpClient.request<
    ApiResponse<TResponseData>,
    AxiosResponse<ApiResponse<TResponseData>>,
    TRequestData
  >(config)

  return response.data
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isApiResponse(value: unknown): value is ApiResponse {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.success === 'boolean' &&
    typeof value.status === 'number' &&
    typeof value.message === 'string' &&
    typeof value.code === 'string'
  )
}

export function getApiErrorResponse(error: unknown): ApiResponse | null {
  if (!axios.isAxiosError(error)) {
    return null
  }

  const responseData = error.response?.data

  if (!isApiResponse(responseData)) {
    return null
  }

  return responseData
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = 'API 요청 처리 중 문제가 발생했습니다.',
) {
  return getApiErrorResponse(error)?.message ?? fallbackMessage
}
