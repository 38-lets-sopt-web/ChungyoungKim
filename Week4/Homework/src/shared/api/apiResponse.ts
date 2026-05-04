export type ApiMeta = {
  path?: string
  timestamp?: string
}

export type ApiResponse<TData = unknown> = {
  success: boolean
  status: number
  message: string
  code: string
  data?: TData
  meta?: ApiMeta
}
