import {
  MOVIE_BACKDROP_IMAGE_BASE_URL,
  MOVIE_POSTER_IMAGE_BASE_URL,
} from '@/features/movies/constants'

export function getMoviePosterUrl(posterPath: string | null) {
  if (posterPath === null) {
    return null
  }

  return `${MOVIE_POSTER_IMAGE_BASE_URL}${posterPath}`
}

export function getMovieBackdropUrl(backdropPath: string | null) {
  if (backdropPath === null) {
    return null
  }

  return `${MOVIE_BACKDROP_IMAGE_BASE_URL}${backdropPath}`
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

export function formatRuntime(runtime: number | null) {
  if (runtime === null || runtime <= 0) {
    return '정보 없음'
  }

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  if (hours === 0) {
    return `${minutes}분`
  }

  if (minutes === 0) {
    return `${hours}시간`
  }

  return `${hours}시간 ${minutes}분`
}

export function formatVoteAverage(voteAverage: number) {
  return `${voteAverage.toFixed(1)} / 10`
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

export function formatMoney(value: number) {
  if (value <= 0) {
    return '정보 없음'
  }

  return `$${formatNumber(value)}`
}

export function formatList(values: string[]) {
  if (values.length === 0) {
    return '정보 없음'
  }

  return values.join(', ')
}
