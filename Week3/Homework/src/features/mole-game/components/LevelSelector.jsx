import { memo } from 'react'
import styled from '@emotion/styled'

const Select = styled.select`
  min-width: 132px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.subtle};
  padding: ${({ theme }) => theme.space[1.5]} ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.background.board};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.featureTitle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.compact};
  letter-spacing: ${({ theme }) => theme.letterSpacings.none};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }
`

const LevelSelector = ({ levels, selectedLevelId, disabled, onLevelChange }) => {
  return (
    <Select
      aria-label="레벨 선택"
      value={selectedLevelId}
      disabled={disabled}
      onChange={(event) => onLevelChange(event.target.value)}
    >
      {levels.map((level) => (
        <option key={level.id} value={level.id}>
          {level.label}
        </option>
      ))}
    </Select>
  )
}

export default memo(LevelSelector)
