import { useState } from 'react'

import { USER_RATING } from '@/features/movies/constants'
import {
  deleteMovieRatingFromStorage,
  readMovieRatingFromStorage,
  saveMovieRatingToStorage,
} from '@/features/movies/storage/movieRatingStorage'

type RatingMessage =
  | { type: 'success'; text: string }
  | { type: 'error'; text: string }
  | null

export function useMovieRating(movieId: number) {
  const [ratingInput, setRatingInput] = useState(() =>
    getInitialRatingInput(movieId),
  )
  const [message, setMessage] = useState<RatingMessage>(null)

  const saveRating = () => {
    const rating = Number(ratingInput)
    const isValidRating =
      ratingInput.trim().length > 0 &&
      Number.isFinite(rating) &&
      rating >= USER_RATING.min &&
      rating <= USER_RATING.max

    if (!isValidRating) {
      setMessage({
        type: 'error',
        text: `${USER_RATING.min}점부터 ${USER_RATING.max}점까지의 숫자만 저장할 수 있습니다.`,
      })
      return
    }

    saveMovieRatingToStorage(movieId, rating)
    setRatingInput(String(rating))
    setMessage({
      type: 'success',
      text: '별점이 저장되었습니다.',
    })
  }

  const deleteRating = () => {
    deleteMovieRatingFromStorage(movieId)
    setRatingInput('')
    setMessage({
      type: 'success',
      text: '별점이 삭제되었습니다.',
    })
  }

  return {
    form: {
      ratingInput,
      setRatingInput,
      message,
    },
    actions: {
      saveRating,
      deleteRating,
    },
  }
}

function getInitialRatingInput(movieId: number) {
  const savedRating = readMovieRatingFromStorage(movieId)

  if (savedRating === null) {
    return ''
  }

  return String(savedRating)
}
