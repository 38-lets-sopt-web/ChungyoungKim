import styled from '@emotion/styled'
import { useCallback, useMemo, useState } from 'react'

import { MovieCard } from '@/features/movies/components/MovieCard'
import { RatingFilterSelect } from '@/features/movies/components/RatingFilterSelect'
import {
  RATING_FILTER_OPTIONS,
  type RatingFilterId,
} from '@/features/movies/constants'
import { useInfiniteMoviesQuery } from '@/features/movies/hooks/useMovieQueries'
import { useInfiniteScroll } from '@/features/movies/hooks/useInfiniteScroll'
import {
  canRequestTmdbApi,
  tmdbApiKeyStatus,
} from '@/shared/config/env'
import { getTmdbApiKeyStatusMessage } from '@/features/movies/utils/tmdbApiKeyMessage'

export function MovieListPage() {
  const [ratingFilterId, setRatingFilterId] =
    useState<RatingFilterId>('all')
  const selectedRatingFilter = getRatingFilterOption(ratingFilterId)
  const moviesQuery = useInfiniteMoviesQuery(
    selectedRatingFilter.params,
    canRequestTmdbApi,
  )
  const fetchNextPage = moviesQuery.fetchNextPage
  const movies = useMemo(
    () => moviesQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [moviesQuery.data],
  )
  const canFetchNextPage =
    moviesQuery.hasNextPage === true && !moviesQuery.isFetchingNextPage

  const fetchNextPageOnIntersect = useCallback(() => {
    if (canFetchNextPage) {
      void fetchNextPage()
    }
  }, [canFetchNextPage, fetchNextPage])

  const observerTargetRef = useInfiniteScroll({
    enabled: canFetchNextPage,
    onIntersect: fetchNextPageOnIntersect,
  })

  return (
    <Page>
      <Content>
        <Title>Movie Explorer</Title>

        <Toolbar aria-label="영화 목록 필터">
          <RatingFilterSelect
            value={ratingFilterId}
            onChange={setRatingFilterId}
          />
        </Toolbar>

        {!canRequestTmdbApi ? (
          <StateMessage>{getTmdbApiKeyStatusMessage(tmdbApiKeyStatus)}</StateMessage>
        ) : null}

        {canRequestTmdbApi && moviesQuery.isPending ? (
          <StateMessage>영화를 불러오는 중입니다.</StateMessage>
        ) : null}

        {canRequestTmdbApi && moviesQuery.isError ? (
          <StateMessage>
            영화 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </StateMessage>
        ) : null}

        {moviesQuery.isSuccess && movies.length === 0 ? (
          <StateMessage>조건에 맞는 영화가 없습니다.</StateMessage>
        ) : null}

        {movies.length > 0 ? (
          <MovieGrid>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        ) : null}

        <ScrollTarget ref={observerTargetRef} aria-hidden="true" />

        {moviesQuery.isFetchingNextPage ? (
          <LoadingMore>영화를 더 불러오는 중입니다.</LoadingMore>
        ) : null}
      </Content>
    </Page>
  )
}

function getRatingFilterOption(ratingFilterId: RatingFilterId) {
  return (
    RATING_FILTER_OPTIONS.find((option) => option.id === ratingFilterId) ??
    RATING_FILTER_OPTIONS[0]
  )
}

const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.layout.pagePaddingBlock}
    ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  width: min(100%, ${({ theme }) => theme.layout.contentMaxWidth});
  margin: 0 auto;
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.display};
  font-weight: 800;
  line-height: 1.2;
`

const Toolbar = styled.section`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.toolbarMinHeight};
  margin-top: ${({ theme }) => theme.spacing[7]};
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`

const MovieGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};
  margin-top: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.compact}) {
    grid-template-columns: 1fr;
  }
`

const StateMessage = styled.p`
  margin: ${({ theme }) => theme.spacing[6]} 0 0;
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 600;
`

const ScrollTarget = styled.div`
  height: 1px;
`

const LoadingMore = styled.p`
  margin: ${({ theme }) => theme.spacing[6]} 0 0;
  color: ${({ theme }) => theme.colors.subtleText};
  text-align: center;
`
