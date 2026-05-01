import { memo } from 'react'
import styled from '@emotion/styled'
import failureImage from '../../../assets/mole-failure.png'
import successImage from '../../../assets/mole-success.png'
import { CELL_STATUS } from '../constants'

const getCellColors = (status, theme) => {
  if (status === CELL_STATUS.MOLE) {
    return {
      background: theme.colors.success,
      color: theme.colors.white,
      border: theme.colors.success,
    }
  }

  if (status === CELL_STATUS.BOMB) {
    return {
      background: theme.colors.danger,
      color: theme.colors.white,
      border: theme.colors.danger,
    }
  }

  if (status === CELL_STATUS.HIT) {
    return {
      background: theme.colors.activeTab,
      color: theme.colors.white,
      border: theme.colors.activeTab,
    }
  }

  if (status === CELL_STATUS.MISS) {
    return {
      background: theme.colors.danger,
      color: theme.colors.white,
      border: theme.colors.danger,
    }
  }

  return {
    background: theme.colors.hole,
    color: theme.colors.text.primary,
    border: theme.colors.hole,
  }
}

const CellButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  width: 100%;
  border: 0 solid
    ${({ $status, theme }) => getCellColors($status, theme).border};
  border-radius: ${({ theme }) => theme.radii.circle};
  background: ${({ $status, theme }) => getCellColors($status, theme).background};
  color: ${({ $status, theme }) => getCellColors($status, theme).color};
  box-shadow: none;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};
`

const Content = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72%;
  height: 72%;
  border-radius: ${({ theme }) => theme.radii.circle};
  background-color: ${({ theme }) => theme.colors.feedbackSurface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.compact};
  letter-spacing: ${({ theme }) => theme.letterSpacings.none};
`

const CharacterImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`

const getCellLabel = (status) => {
  if (status === CELL_STATUS.MOLE) {
    return '나 잡아봐라'
  }

  if (status === CELL_STATUS.BOMB) {
    return '나 잡아보지마라'
  }

  if (status === CELL_STATUS.HIT) {
    return ''
  }

  if (status === CELL_STATUS.MISS) {
    return ''
  }

  return ''
}

const getCellImage = (status) => {
  if (status === CELL_STATUS.HIT) {
    return successImage
  }

  if (status === CELL_STATUS.MISS) {
    return failureImage
  }

  return null
}

const getAriaLabel = (status) => {
  if (status === CELL_STATUS.MOLE) {
    return '두더지 클릭'
  }

  if (status === CELL_STATUS.BOMB) {
    return '폭탄 클릭'
  }

  if (status === CELL_STATUS.HIT) {
    return '공격받은 두더지'
  }

  if (status === CELL_STATUS.MISS) {
    return '놓친 두더지'
  }

  return '빈 구멍'
}

const Hole = ({ id, status, onClick }) => {
  const label = getCellLabel(status)
  const image = getCellImage(status)

  return (
    <CellButton
      type="button"
      $status={status}
      aria-label={getAriaLabel(status)}
      onClick={() => onClick(id)}
    >
      {image !== null && <CharacterImage src={image} alt="" />}
      {label !== '' && <Content>{label}</Content>}
    </CellButton>
  )
}

export default memo(Hole)
