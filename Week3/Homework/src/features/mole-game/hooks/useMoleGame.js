import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  CELL_STATUS,
  DEFAULT_LEVEL_ID,
  FEEDBACK_VISIBLE_MS,
  GAME_MESSAGES,
  GAME_STATUS,
  GAME_TIMER_INTERVAL_MS,
  LEVEL_CONFIG,
  SCORE_CHANGE,
  TIME_LEFT_DECREASE_SECONDS,
} from '../constants'
import {
  createCellsWithRandomTarget,
  createEmptyCells,
  hideHitCell,
  hideMissCell,
  markCellAsHit,
  markCellAsMiss,
} from '../utils/gameUtils'
import { createGameResult, isSuccessfulResult } from '../utils/gameResult'
import { getInitialState } from '../utils/gameState'
import { saveRankingRecord } from '../../ranking/rankingStorage'

const useMoleGame = () => {
  const [levelId, setLevelId] = useState(DEFAULT_LEVEL_ID)
  const levelConfig = LEVEL_CONFIG[levelId]
  const [gameState, setGameState] = useState(() => getInitialState(levelConfig))
  const gameStateRef = useRef(gameState)
  const feedbackTimeoutIdsRef = useRef([])
  const savedResultIdRef = useRef(null)

  const isPlaying = gameState.status === GAME_STATUS.PLAYING
  const isEnded = gameState.status === GAME_STATUS.ENDED

  const levels = useMemo(() => Object.values(LEVEL_CONFIG), [])

  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

  const clearFeedbackTimeouts = useCallback(() => {
    feedbackTimeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
    feedbackTimeoutIdsRef.current = []
  }, [])

  const hideFeedbackAfterDelay = useCallback((cellId, hideFeedbackCell) => {
    const timeoutId = setTimeout(() => {
      setGameState((currentState) => ({
        ...currentState,
        cells: hideFeedbackCell(currentState.cells, cellId),
      }))
    }, FEEDBACK_VISIBLE_MS)

    feedbackTimeoutIdsRef.current.push(timeoutId)
  }, [])

  const resetGameWithLevel = useCallback((nextLevelConfig) => {
    clearFeedbackTimeouts()
    savedResultIdRef.current = null
    setGameState(getInitialState(nextLevelConfig))
  }, [clearFeedbackTimeouts])

  const startGame = useCallback(() => {
    clearFeedbackTimeouts()
    setGameState({
      ...getInitialState(levelConfig),
      status: GAME_STATUS.PLAYING,
      cells: createCellsWithRandomTarget(levelConfig),
      message: GAME_MESSAGES.PLAYING,
    })
  }, [clearFeedbackTimeouts, levelConfig])

  const resetGame = useCallback(() => {
    resetGameWithLevel(levelConfig)
  }, [levelConfig, resetGameWithLevel])

  const changeLevel = useCallback((nextLevelId) => {
    if (isPlaying) {
      return
    }

    const nextLevelConfig = LEVEL_CONFIG[nextLevelId]

    setLevelId(nextLevelId)
    resetGameWithLevel(nextLevelConfig)
  }, [isPlaying, resetGameWithLevel])

  const handleCellClick = useCallback((cellId) => {
    const currentGameState = gameStateRef.current

    if (currentGameState.status !== GAME_STATUS.PLAYING) {
      return
    }

    const clickedCell = currentGameState.cells.find((cell) => cell.id === cellId)

    if (clickedCell?.status === CELL_STATUS.MOLE) {
      setGameState((currentState) => ({
        ...currentState,
        cells: markCellAsHit(currentState.cells, cellId),
        score: currentState.score + SCORE_CHANGE.MOLE,
        successCount: currentState.successCount + 1,
        message: GAME_MESSAGES.SUCCESS,
      }))

      hideFeedbackAfterDelay(cellId, hideHitCell)
      return
    }

    if (clickedCell?.status === CELL_STATUS.BOMB) {
      setGameState((currentState) => ({
        ...currentState,
        cells: markCellAsMiss(currentState.cells, cellId),
        score: currentState.score + SCORE_CHANGE.BOMB,
        failureCount: currentState.failureCount + 1,
        message: GAME_MESSAGES.FAILURE,
      }))

      hideFeedbackAfterDelay(cellId, hideMissCell)
    }
  }, [hideFeedbackAfterDelay])

  useEffect(() => {
    if (!isPlaying) {
      return undefined
    }

    const targetIntervalId = setInterval(() => {
      setGameState((currentState) => ({
        ...currentState,
        cells: createCellsWithRandomTarget(levelConfig),
      }))
    }, levelConfig.visibleMilliseconds)

    return () => {
      clearInterval(targetIntervalId)
    }
  }, [isPlaying, levelConfig])

  useEffect(() => {
    if (!isPlaying) {
      return undefined
    }

    const timerId = setInterval(() => {
      setGameState((currentState) => {
        const nextTimeLeft = Math.max(
          currentState.timeLeft - TIME_LEFT_DECREASE_SECONDS,
          0,
        )

        if (nextTimeLeft > 0) {
          return {
            ...currentState,
            timeLeft: nextTimeLeft,
          }
        }

        return {
          ...currentState,
          status: GAME_STATUS.ENDED,
          cells: createEmptyCells(levelConfig),
          timeLeft: 0,
          message: GAME_MESSAGES.FINISHED,
          result: createGameResult(levelConfig, currentState),
        }
      })
    }, GAME_TIMER_INTERVAL_MS)

    return () => {
      clearInterval(timerId)
    }
  }, [isPlaying, levelConfig])

  useEffect(() => {
    const result = gameState.result

    if (
      !isEnded ||
      result === null ||
      !isSuccessfulResult(result) ||
      savedResultIdRef.current === result.id
    ) {
      return
    }

    saveRankingRecord({
      level: result.levelLabel,
      score: result.score,
      successTime: result.successTime,
    })
    savedResultIdRef.current = result.id
  }, [gameState.result, isEnded])

  useEffect(() => {
    return () => {
      clearFeedbackTimeouts()
    }
  }, [clearFeedbackTimeouts])

  return {
    levelId,
    levelConfig,
    levels,
    gameState,
    isPlaying,
    isEnded,
    startGame,
    resetGame,
    changeLevel,
    handleCellClick,
  }
}

export default useMoleGame
