import styled from '@emotion/styled'
import { Link, useParams } from 'react-router-dom'

import { MovieRatingForm } from '@/features/movies/components/MovieRatingForm'
import { MOVIE_ROUTES } from '@/features/movies/constants'
import { useMovieDetailQuery } from '@/features/movies/hooks/useMovieQueries'
import type { MovieDetail } from '@/features/movies/types'
import {
  formatList,
  formatMoney,
  formatNumber,
  formatReleaseDate,
  formatRuntime,
  formatVoteAverage,
  getMovieBackdropUrl,
  getMovieOverview,
  getMoviePosterUrl,
} from '@/features/movies/utils/movieFormat'
import { getTmdbApiKeyStatusMessage } from '@/features/movies/utils/tmdbApiKeyMessage'
import { canRequestTmdbApi, tmdbApiKeyStatus } from '@/shared/config/env'

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()
  const movieDetailQuery = useMovieDetailQuery(movieId)

  if (!canRequestTmdbApi) {
    return (
      <Page>
        <Content>
          <BackLink to={MOVIE_ROUTES.list}>← 목록으로 돌아가기</BackLink>
          <StateMessage>{getTmdbApiKeyStatusMessage(tmdbApiKeyStatus)}</StateMessage>
        </Content>
      </Page>
    )
  }

  if (movieDetailQuery.isPending) {
    return (
      <Page>
        <Content>
          <BackLink to={MOVIE_ROUTES.list}>← 목록으로 돌아가기</BackLink>
          <StateMessage>영화 상세 정보를 불러오는 중입니다.</StateMessage>
        </Content>
      </Page>
    )
  }

  if (movieDetailQuery.isError) {
    return (
      <Page>
        <Content>
          <BackLink to={MOVIE_ROUTES.list}>← 목록으로 돌아가기</BackLink>
          <StateMessage>영화 상세 정보를 불러오지 못했습니다.</StateMessage>
        </Content>
      </Page>
    )
  }

  return <MovieDetailContent movie={movieDetailQuery.data} />
}

function MovieDetailContent({ movie }: { movie: MovieDetail }) {
  const posterUrl = getMoviePosterUrl(movie.poster_path)
  const backdropUrl = getMovieBackdropUrl(movie.backdrop_path)
  const summaryItems = [
    {
      label: '평점',
      value: formatVoteAverage(movie.vote_average),
    },
    {
      label: '투표 수',
      value: formatNumber(movie.vote_count),
    },
    {
      label: '상영 시간',
      value: formatRuntime(movie.runtime),
    },
    {
      label: '상태',
      value: movie.status,
    },
  ]
  const basicInfoItems = [
    {
      label: '원제',
      value: movie.original_title,
    },
    {
      label: '원어',
      value: movie.original_language.toUpperCase(),
    },
    {
      label: '제작 국가',
      value: formatList(movie.production_countries.map((country) => country.name)),
    },
    {
      label: '사용 언어',
      value: formatList(
        movie.spoken_languages.map((language) => language.name || language.english_name),
      ),
    },
    {
      label: '예산',
      value: formatMoney(movie.budget),
    },
    {
      label: '수익',
      value: formatMoney(movie.revenue),
    },
  ]

  return (
    <Page>
      <Content>
        <BackLink to={MOVIE_ROUTES.list}>← 목록으로 돌아가기</BackLink>

        <HeroCard>
          <Backdrop>
            {backdropUrl === null ? (
              <ImageFallback>Backdrop Image</ImageFallback>
            ) : (
              <BackdropImage src={backdropUrl} alt={`${movie.title} 배경 이미지`} />
            )}
          </Backdrop>

          <MovieSummarySection>
            <PosterFrame>
              {posterUrl === null ? (
                <ImageFallback>Poster Image</ImageFallback>
              ) : (
                <PosterImage src={posterUrl} alt={`${movie.title} 포스터`} />
              )}
            </PosterFrame>

            <SummaryContent>
              <ReleaseDate>{formatReleaseDate(movie.release_date)}</ReleaseDate>
              <Title>{movie.title}</Title>
              <GenreList>
                {movie.genres.map((genre) => (
                  <GenreBadge key={genre.id}>{genre.name}</GenreBadge>
                ))}
              </GenreList>

              <InfoGrid>
                {summaryItems.map((item) => (
                  <InfoCard key={item.label}>
                    <InfoLabel>{item.label}</InfoLabel>
                    <InfoValue>{item.value}</InfoValue>
                  </InfoCard>
                ))}
              </InfoGrid>
            </SummaryContent>
          </MovieSummarySection>
        </HeroCard>

        <OverviewSectionCard>
          <SectionTitle>줄거리</SectionTitle>
          <Overview>{getMovieOverview(movie.overview)}</Overview>
        </OverviewSectionCard>

        <InfoAndRatingLayout>
          <SectionCard>
            <CompactSectionTitle>기본 정보</CompactSectionTitle>
            <BasicInfoList>
              {basicInfoItems.map((item) => (
                <BasicInfoItem key={item.label}>
                  <InfoLabel>{item.label}</InfoLabel>
                  <InfoValue>{item.value}</InfoValue>
                </BasicInfoItem>
              ))}
            </BasicInfoList>
          </SectionCard>

          <MovieRatingForm key={movie.id} movieId={movie.id} />
        </InfoAndRatingLayout>
      </Content>
    </Page>
  )
}

const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.layout.detailPagePaddingBlock}
    ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.background};
`

const Content = styled.div`
  width: min(100%, ${({ theme }) => theme.layout.detailContentMaxWidth});
  margin: 0 auto;
`

const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const HeroCard = styled.section`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const Backdrop = styled.div`
  height: ${({ theme }) => theme.size.detailBackdropHeight};
  background: ${({ theme }) => theme.colors.posterFallback};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    height: ${({ theme }) => theme.size.detailBackdropMobileHeight};
  }
`

const BackdropImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MovieSummarySection = styled.section`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.detailPosterWidth} 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: 1fr;
  }
`

const PosterFrame = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.posterFallback};
  aspect-ratio: ${({ theme }) => theme.aspectRatio.poster};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: ${({ theme }) => theme.size.detailPosterMobileWidth};
  }
`

const PosterImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageFallback = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 800;
`

const SummaryContent = styled.div`
  min-width: 0;
`

const ReleaseDate = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 800;
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.detailTitle};
  line-height: 1.2;
`

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`

const GenreBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.size.genreBadgeHeight};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 700;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoint.compact}) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
`

const InfoLabel = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 700;
`

const InfoValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 800;
  line-height: 1.55;
`

const SectionCard = styled.section`
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const OverviewSectionCard = styled(SectionCard)`
  margin-top: ${({ theme }) => theme.spacing[6]};
`

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.subtitle};
`

const CompactSectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 800;
`

const InfoAndRatingLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
  gap: ${({ theme }) => theme.spacing[5]};
  margin-top: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: 1fr;
  }
`

const Overview = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  line-height: 1.8;
`

const BasicInfoList = styled.div`
  display: grid;
`

const BasicInfoItem = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.basicInfoLabelWidth} 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.compact}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`

const StateMessage = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 700;
`
