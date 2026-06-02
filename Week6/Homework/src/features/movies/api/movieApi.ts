import { http } from '@/features/movies/api/http'
import type {
  MovieDetail,
  MovieListResponse,
} from '@/features/movies/types'

export interface MovieFilter {
  voteAverageGte?: number
  voteAverageLte?: number
}

interface FetchMoviesParams {
  page: number
  filter: MovieFilter
}

export async function fetchMovies({ page, filter }: FetchMoviesParams) {
  const { data } = await http.get<MovieListResponse>('/discover/movie', {
    params: {
      page,
      sort_by: 'popularity.desc',
      'vote_average.gte': filter.voteAverageGte,
      'vote_average.lte': filter.voteAverageLte,
    },
  })

  return data
}

export async function fetchMovieDetail(movieId: string) {
  const { data } = await http.get<MovieDetail>(`/movie/${movieId}`)

  return data
}
