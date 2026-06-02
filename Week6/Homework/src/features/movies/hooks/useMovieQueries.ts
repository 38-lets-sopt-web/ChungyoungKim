import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import {
  fetchMovieDetail,
  fetchMovies,
  type MovieFilter,
} from '@/features/movies/api/movieApi'
import { movieQueryKeys } from '@/features/movies/queryKeys'

export function useInfiniteMoviesQuery(filter: MovieFilter, enabled = true) {
  return useInfiniteQuery({
    queryKey: movieQueryKeys.list(filter),
    queryFn: ({ pageParam }) => fetchMovies({ page: pageParam, filter }),
    initialPageParam: 1,
    enabled,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
}

export function useMovieDetailQuery(movieId: string | undefined) {
  const requestedMovieId = movieId ?? ''

  return useQuery({
    queryKey: movieQueryKeys.detail(requestedMovieId),
    queryFn: () => fetchMovieDetail(requestedMovieId),
    enabled: requestedMovieId.length > 0,
  })
}
