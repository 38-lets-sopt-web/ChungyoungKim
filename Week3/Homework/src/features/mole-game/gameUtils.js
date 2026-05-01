import { CELL_STATUS, MOLE_SPAWN_PROBABILITY } from './constants'

export const createEmptyCells = ({ rows, columns }) => {
  const cellCount = rows * columns

  return Array.from({ length: cellCount }, (_, index) => ({
    id: index,
    status: CELL_STATUS.HOLE,
  }))
}

export const getRandomCellIndex = (cellCount) => {
  return Math.floor(Math.random() * cellCount)
}

export const getRandomTargetStatus = () => {
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

export const hideHitCell = (cells, cellId) => {
  return cells.map((cell) =>
    cell.id === cellId && cell.status === CELL_STATUS.HIT
      ? { ...cell, status: CELL_STATUS.HOLE }
      : cell,
  )
}

export const hideMissCell = (cells, cellId) => {
  return cells.map((cell) =>
    cell.id === cellId && cell.status === CELL_STATUS.MISS
      ? { ...cell, status: CELL_STATUS.HOLE }
      : cell,
  )
}

export const markCellAsHit = (cells, cellId) => {
  return cells.map((cell) =>
    cell.id === cellId ? { ...cell, status: CELL_STATUS.HIT } : cell,
  )
}

export const markCellAsMiss = (cells, cellId) => {
  return cells.map((cell) =>
    cell.id === cellId ? { ...cell, status: CELL_STATUS.MISS } : cell,
  )
}
