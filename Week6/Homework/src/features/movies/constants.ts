export const MOVIE_ROUTES = {
  list: '/',
  detail: (movieId: string | number) => `/movies/${movieId}`,
} as const

export const MOVIE_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const RATING_FILTER = {
  min: 0,
  max: 10,
  step: 0.5,
} as const
