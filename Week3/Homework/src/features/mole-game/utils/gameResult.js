import { MIN_RANKING_SCORE } from '../constants'

const createGameResultId = () => {
  const cryptoApi = globalThis.crypto

  if (typeof cryptoApi?.randomUUID === 'function') {
    return cryptoApi.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const isSuccessfulResult = (result) => {
  return result.score >= MIN_RANKING_SCORE
}

export const createGameResult = (levelConfig, currentState) => ({
  id: createGameResultId(),
  levelLabel: levelConfig.label,
  score: currentState.score,
  successCount: currentState.successCount,
  failureCount: currentState.failureCount,
  successTime: new Date().toISOString(),
})
