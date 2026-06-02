import styled from '@emotion/styled'

import { USER_RATING } from '@/features/movies/constants'
import { useMovieRating } from '@/features/movies/hooks/useMovieRating'

interface MovieRatingFormProps {
  movieId: number
}

export function MovieRatingForm({ movieId }: MovieRatingFormProps) {
  const rating = useMovieRating(movieId)

  return (
    <RatingPanel>
      <SectionTitle>별점 남기기</SectionTitle>
      <RatingForm
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          rating.actions.saveRating()
        }}
      >
        <RatingField>
          <RatingLabel htmlFor="movie-rating">{USER_RATING.rangeLabel}</RatingLabel>
          <RatingInput
            id="movie-rating"
            type="number"
            min={USER_RATING.min}
            max={USER_RATING.max}
            step={USER_RATING.step}
            placeholder={USER_RATING.rangeLabel}
            value={rating.form.ratingInput}
            onChange={(event) => rating.form.setRatingInput(event.target.value)}
          />
        </RatingField>
        <ButtonGroup>
          <PrimaryButton type="submit">별점 저장하기</PrimaryButton>
          <SecondaryButton type="button" onClick={rating.actions.deleteRating}>
            별점 삭제하기
          </SecondaryButton>
        </ButtonGroup>
      </RatingForm>
      {rating.form.message === null ? null : (
        <Message data-message-type={rating.form.message.type}>
          {rating.form.message.text}
        </Message>
      )}
    </RatingPanel>
  )
}

const RatingPanel = styled.section`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing[4]};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 800;
`

const RatingForm = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`

const RatingField = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
`

const RatingLabel = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 800;
`

const RatingInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.size.controlHeight};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusShadow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`

const PrimaryButton = styled.button`
  min-height: ${({ theme }) => theme.size.controlHeight};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 800;
  cursor: pointer;
`

const SecondaryButton = styled.button`
  min-height: ${({ theme }) => theme.size.controlHeight};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtleText};
  font-weight: 800;
  cursor: pointer;
`

const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 700;

  &[data-message-type='error'] {
    color: ${({ theme }) => theme.colors.danger};
  }
`
