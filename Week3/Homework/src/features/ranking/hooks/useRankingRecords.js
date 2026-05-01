import { useMemo, useState } from 'react'
import {
  clearRankingRecords,
  readRankingRecords,
} from '../rankingStorage'
import { RANKING_RESET_CONFIRM_MESSAGE } from '../constants'
import { formatSuccessTime } from '../utils/formatRankingDate'
import { createRankingRows } from '../utils/rankingRecord'

const useRankingRecords = () => {
  const [rankingRecords, setRankingRecords] = useState(readRankingRecords)
  const rankingRows = useMemo(
    () => createRankingRows(rankingRecords, formatSuccessTime),
    [rankingRecords],
  )
  const hasRankingRows = rankingRows.length > 0

  const resetRankingRecords = () => {
    const confirmed = window.confirm(RANKING_RESET_CONFIRM_MESSAGE)

    if (!confirmed) {
      return
    }

    clearRankingRecords()
    setRankingRecords([])
  }

  return {
    rankingRows,
    hasRankingRows,
    resetRankingRecords,
  }
}

export default useRankingRecords
