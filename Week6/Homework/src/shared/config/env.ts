export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3',
  apiKey: import.meta.env.VITE_API_KEY || '',
} as const

const TMDB_V3_API_KEY_PATTERN = /^[a-f0-9]{32}$/i

export type TmdbApiKeyStatus =
  | 'missing'
  | 'v4-access-token'
  | 'invalid-format'
  | 'valid-v3-api-key'

export function getTmdbApiKeyStatus(apiKey: string): TmdbApiKeyStatus {
  if (apiKey.length === 0) {
    return 'missing'
  }

  if (apiKey.startsWith('eyJ')) {
    return 'v4-access-token'
  }

  if (!TMDB_V3_API_KEY_PATTERN.test(apiKey)) {
    return 'invalid-format'
  }

  return 'valid-v3-api-key'
}

export const tmdbApiKeyStatus = getTmdbApiKeyStatus(env.apiKey)

export const canRequestTmdbApi = tmdbApiKeyStatus === 'valid-v3-api-key'
