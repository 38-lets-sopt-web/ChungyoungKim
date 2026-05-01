import { CELL_STATUS, MOLE_SPAWN_PROBABILITY } from '../constants'

export const createEmptyCells = ({ rows, columns }) => {
  const cellCount = rows * columns

  return Array.from({ length: cellCount }, (_, index) => ({
    id: index,
    status: CELL_STATUS.HOLE,
  }))
}

const getRandomCellIndex = (cellCount) => {
  return Math.floor(Math.random() * cellCount)
}

const getRandomTargetStatus = () => {
  return Math.random() < MOLE_SPAWN_PROBABILITY
    ? CELL_STATUS.MOLE
    : CELL_STATUS.BOMB
}

export const createCellsWithRandomTarget = (levelConfig) => {
  const cells = createEmptyCells(levelConfig)
  const targetIndex = getRandomCellIndex(cells.length)
  const targetStatus = getRandomTargetStatus()

  return cells.map((cell, index) =>
    index === targetIndex ? { ...cell, status: targetStatus } : cell,
  )
}

const markCellStatus = (cells, cellId, status) => {
  return cells.map((cell) =>
    cell.id === cellId ? { ...cell, status } : cell,
  )
}

const hideFeedbackCell = (cells, cellId, feedbackStatus) => {
  return cells.map((cell) =>
    cell.id === cellId && cell.status === feedbackStatus
      ? { ...cell, status: CELL_STATUS.HOLE }
      : cell,
  )
}

export const markCellAsHit = (cells, cellId) => {
  return markCellStatus(cells, cellId, CELL_STATUS.HIT)
}

export const markCellAsMiss = (cells, cellId) => {
  return markCellStatus(cells, cellId, CELL_STATUS.MISS)
}

export const hideHitCell = (cells, cellId) => {
  return hideFeedbackCell(cells, cellId, CELL_STATUS.HIT)
}

export const hideMissCell = (cells, cellId) => {
  return hideFeedbackCell(cells, cellId, CELL_STATUS.MISS)
}
