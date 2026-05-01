import { RANKING_STORAGE_KEY } from './constants'
import {
  normalizeRankingRecord,
  sortRankingRecords,
} from './utils/rankingRecord'

export function readRankingRecords() {
  try {
    const savedValue = localStorage.getItem(RANKING_STORAGE_KEY)
    const parsedValue = JSON.parse(savedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return sortRankingRecords(
      parsedValue.map(normalizeRankingRecord).filter(Boolean),
    )
  } catch {
    return []
  }
}

export function saveRankingRecord(record) {
  const normalizedRecord = normalizeRankingRecord(record)
  const savedRecords = readRankingRecords()

  if (normalizedRecord === null) {
    return savedRecords
  }

  const nextRecords = sortRankingRecords([...savedRecords, normalizedRecord])

  localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(nextRecords))

  return nextRecords
}

export function clearRankingRecords() {
  localStorage.removeItem(RANKING_STORAGE_KEY)
}
