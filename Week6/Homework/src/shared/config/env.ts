export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  apiKey: import.meta.env.VITE_API_KEY || '',
} as const

export const hasTmdbApiKey = env.apiKey.length > 0
