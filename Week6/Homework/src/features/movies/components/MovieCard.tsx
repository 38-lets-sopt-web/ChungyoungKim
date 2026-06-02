import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { MOVIE_ROUTES } from '@/features/movies/constants'
import type { MovieSummary } from '@/features/movies/types'
import {
  formatReleaseDate,
  getMovieOverview,
  getMoviePosterUrl,
} from '@/features/movies/utils/movieFormat'

interface MovieCardProps {
  movie: MovieSummary
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getMoviePosterUrl(movie.poster_path)

  return (
    <CardLink to={MOVIE_ROUTES.detail(movie.id)} aria-label={`${movie.title} 상세 보기`}>
      <PosterBox>
        {posterUrl === null ? (
          <PosterFallback>No Image</PosterFallback>
        ) : (
          <Poster src={posterUrl} alt={`${movie.title} 포스터`} loading="lazy" />
        )}
      </PosterBox>
      <CardContent>
        <MovieTitle>{movie.title}</MovieTitle>
        <ReleaseDate>{formatReleaseDate(movie.release_date)}</ReleaseDate>
        <Overview>{getMovieOverview(movie.overview)}</Overview>
      </CardContent>
    </CardLink>
  )
}

const CardLink = styled(Link)`
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: inherit;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadow.card};
  transition: transform 160ms ease, box-shadow 160ms ease,
    border-color 160ms ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.borderHover};
    box-shadow: ${({ theme }) => theme.shadow.cardHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 3px;
  }
`

const PosterBox = styled.div`
  position: relative;
  aspect-ratio: ${({ theme }) => theme.aspectRatio.poster};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.posterFallback};
`

const Poster = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

const PosterFallback = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 700;
`

const CardContent = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
`

const MovieTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.cardTitle};
  line-height: 1.35;
`

const ReleaseDate = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.caption};
`

const Overview = styled.p`
  display: -webkit-box;
  min-height: ${({ theme }) => theme.size.movieOverviewMinHeight};
  margin: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption};
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`
