import styled from '@emotion/styled'

import {
  RATING_FILTER_OPTIONS,
  type RatingFilterId,
} from '@/features/movies/constants'

interface RatingFilterSelectProps {
  value: RatingFilterId
  onChange: (value: RatingFilterId) => void
}

export function RatingFilterSelect({
  value,
  onChange,
}: RatingFilterSelectProps) {
  return (
    <FilterControl>
      <FilterLabel htmlFor="rating-filter">별점 필터</FilterLabel>
      <Select
        id="rating-filter"
        value={value}
        onChange={(event) => onChange(event.target.value as RatingFilterId)}
      >
        {RATING_FILTER_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </Select>
    </FilterControl>
  )
}

const FilterControl = styled.div`
  width: 100%;
`

const FilterLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const Select = styled.select`
  width: ${({ theme }) => theme.size.ratingFilterWidth};
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 600;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusShadow};
  }
`
