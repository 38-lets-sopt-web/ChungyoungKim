import { MOVIE_IMAGE_BASE_URL } from '@/features/movies/constants'

export function getMoviePosterUrl(posterPath: string | null) {
  if (posterPath === null) {
    return null
  }

  return `${MOVIE_IMAGE_BASE_URL}${posterPath}`
}

export function formatReleaseDate(releaseDate: string) {
  if (releaseDate.length === 0) {
    return '개봉일 미정'
  }

  return releaseDate.replaceAll('-', '.')
}

export function getMovieOverview(overview: string) {
  if (overview.trim().length === 0) {
    return '줄거리 정보가 없습니다.'
  }

  return overview
}
