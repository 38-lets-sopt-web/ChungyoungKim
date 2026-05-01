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

export const normalizeRankingRecord = (record) => {
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

export const sortRankingRecords = (records) => {
  return [...records].sort((currentRecord, nextRecord) => {
    const levelDifference =
      getLevelNumber(nextRecord.level) - getLevelNumber(currentRecord.level)

    if (levelDifference !== 0) {
      return levelDifference
    }

    return nextRecord.score - currentRecord.score
  })
}

export const createRankingRows = (records, formatRecordedAt) => {
  return records.map((record, index) => ({
    ...record,
    rank: index + 1,
    recordedAt: formatRecordedAt(record.successTime),
  }))
}
