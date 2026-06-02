import axios from 'axios'

import { env } from '@/shared/config/env'

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
  params: {
    api_key: env.apiKey,
    language: 'ko-KR',
  },
})
