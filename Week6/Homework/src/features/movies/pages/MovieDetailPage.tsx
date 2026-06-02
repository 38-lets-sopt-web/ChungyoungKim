import styled from '@emotion/styled'
import { Link, useParams } from 'react-router-dom'

import { MOVIE_ROUTES } from '@/features/movies/constants'

export function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()

  return (
    <Page>
      <BackLink to={MOVIE_ROUTES.list}>목록으로 돌아가기</BackLink>
      <Panel>
        <Eyebrow>Movie Detail</Eyebrow>
        <Title>영화 상세 페이지</Title>
        <Description>
          현재 라우트의 movieId는 {movieId ?? '없음'}입니다. 다음 단계에서 이
          값으로 TMDB 상세 API를 연결하면 됩니다.
        </Description>
      </Panel>
    </Page>
  )
}

const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.background};
`

const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`

const Panel = styled.section`
  max-width: 760px;
  padding: ${({ theme }) => theme.spacing[7]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 700;
  text-transform: uppercase;
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.title};
`

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing[4]} 0 0;
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.body};
  line-height: 1.7;
`
