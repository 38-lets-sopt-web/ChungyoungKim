export const MOVIE_ROUTES = {
  list: '/',
  detail: (movieId: string | number) => `/${movieId}`,
} as const

export const MOVIE_POSTER_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const MOVIE_BACKDROP_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280'

export const MOVIE_RATING_STORAGE_KEY = 'week6-movie-ratings'

export const USER_RATING = {
  min: 0.5,
  max: 10,
  step: 0.5,
  rangeLabel: '0.5 ~ 10.0',
} as const

export const RATING_FILTER_OPTIONS = [
  {
    id: 'all',
    label: '전체 별점',
    params: {},
  },
  {
    id: 'over-9',
    label: '9점 이상',
    params: {
      voteAverageGte: 9,
      voteAverageLte: 10,
    },
  },
  {
    id: 'over-8',
    label: '8점 이상',
    params: {
      voteAverageGte: 8,
      voteAverageLte: 10,
    },
  },
  {
    id: 'over-7',
    label: '7점 이상',
    params: {
      voteAverageGte: 7,
      voteAverageLte: 10,
    },
  },
  {
    id: 'over-6',
    label: '6점 이상',
    params: {
      voteAverageGte: 6,
      voteAverageLte: 10,
    },
  },
] as const

export type RatingFilterId = (typeof RATING_FILTER_OPTIONS)[number]['id']
