import type { MovieFilter } from '@/features/movies/api/movieApi'

export const movieQueryKeys = {
  all: ['movies'] as const,
  lists: () => [...movieQueryKeys.all, 'list'] as const,
  list: (filter: MovieFilter) => [...movieQueryKeys.lists(), filter] as const,
  details: () => [...movieQueryKeys.all, 'detail'] as const,
  detail: (movieId: string) => [...movieQueryKeys.details(), movieId] as const,
}
