import { memo } from 'react'
import styled from '@emotion/styled'
import Hole from './Hole'

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: ${({ theme }) => theme.space[3]};
  margin: 0;
`

const GameBoard = ({ cells, columns, onCellClick }) => {
  return (
    <Board $columns={columns} aria-label="두더지 게임 보드">
      {cells.map((cell) => (
        <Hole
          key={cell.id}
          id={cell.id}
          status={cell.status}
          onClick={onCellClick}
        />
      ))}
    </Board>
  )
}

export default memo(GameBoard)
