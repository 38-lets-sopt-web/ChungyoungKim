import { MOVIE_RATING_STORAGE_KEY } from '@/features/movies/constants'

export interface StoredMovieRating {
  movieId: number
  rating: number
}

export function readMovieRatingsFromStorage() {
  try {
    const savedRatings = localStorage.getItem(MOVIE_RATING_STORAGE_KEY)

    if (savedRatings === null) {
      return []
    }

    const parsedRatings: unknown = JSON.parse(savedRatings)

    if (!Array.isArray(parsedRatings)) {
      return []
    }

    return parsedRatings.filter(isStoredMovieRating)
  } catch {
    return []
  }
}

export function readMovieRatingFromStorage(movieId: number) {
  return (
    readMovieRatingsFromStorage().find((rating) => rating.movieId === movieId)
      ?.rating ?? null
  )
}

export function saveMovieRatingToStorage(movieId: number, rating: number) {
  const ratingsWithoutCurrentMovie = readMovieRatingsFromStorage().filter(
    (storedRating) => storedRating.movieId !== movieId,
  )
  const nextRatings = [
    ...ratingsWithoutCurrentMovie,
    {
      movieId,
      rating,
    },
  ]

  localStorage.setItem(MOVIE_RATING_STORAGE_KEY, JSON.stringify(nextRatings))
}

export function deleteMovieRatingFromStorage(movieId: number) {
  const nextRatings = readMovieRatingsFromStorage().filter(
    (storedRating) => storedRating.movieId !== movieId,
  )

  localStorage.setItem(MOVIE_RATING_STORAGE_KEY, JSON.stringify(nextRatings))
}

function isStoredMovieRating(value: unknown): value is StoredMovieRating {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.movieId === 'number' &&
    Number.isInteger(candidate.movieId) &&
    typeof candidate.rating === 'number' &&
    Number.isFinite(candidate.rating)
  )
}
