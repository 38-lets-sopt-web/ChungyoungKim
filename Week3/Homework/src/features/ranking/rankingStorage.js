import { RANKING_STORAGE_KEY } from './constants'

const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

const getLevelNumber = (level) => {
  const matchedLevelNumber = level.match(/\d+/)

  if (matchedLevelNumber === null) {
    return 0
  }

  return Number(matchedLevelNumber[0])
}

const normalizeRankingRecord = (record) => {
  if (!isObject(record)) {
    return null
  }

  const level = typeof record.level === 'string' ? record.level : record.levelLabel
  const score = Number(record.score)

  if (
    typeof level !== 'string' ||
    typeof record.successTime !== 'string' ||
    !Number.isFinite(score)
  ) {
    return null
  }

  return {
    level,
    score,
    successTime: record.successTime,
  }
}

export function sortRankingRecords(records) {
  return [...records].sort((currentRecord, nextRecord) => {
    const levelDifference =
      getLevelNumber(nextRecord.level) - getLevelNumber(currentRecord.level)

    if (levelDifference !== 0) {
      return levelDifference
    }

    return nextRecord.score - currentRecord.score
  })
}

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
