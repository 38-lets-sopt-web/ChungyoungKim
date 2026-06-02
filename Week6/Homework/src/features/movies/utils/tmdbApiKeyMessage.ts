import type { TmdbApiKeyStatus } from '@/shared/config/env'

export function getTmdbApiKeyStatusMessage(status: TmdbApiKeyStatus) {
  switch (status) {
    case 'missing':
      return 'TMDB API 키를 설정해주세요.'
    case 'v4-access-token':
      return 'VITE_API_KEY에는 v4 Read Access Token이 아니라 32자리 v3 API Key를 넣어주세요.'
    case 'invalid-format':
      return 'TMDB API Key 형식이 올바르지 않습니다. 32자리 v3 API Key를 확인해주세요.'
    case 'valid-v3-api-key':
      return ''
  }
}
