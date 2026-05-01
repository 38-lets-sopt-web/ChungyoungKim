import { GAME_MESSAGES, GAME_STATUS } from '../constants'
import { createEmptyCells } from './gameUtils'

export const getInitialState = (levelConfig) => ({
  status: GAME_STATUS.IDLE,
  cells: createEmptyCells(levelConfig),
  score: 0,
  successCount: 0,
  failureCount: 0,
  timeLeft: levelConfig.durationSeconds,
  message: GAME_MESSAGES.READY,
  result: null,
})
