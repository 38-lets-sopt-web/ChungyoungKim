import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import {
  MOVIE_ROUTES,
  RATING_FILTER,
} from '@/features/movies/constants'
import { hasTmdbApiKey } from '@/shared/config/env'

export function MovieListPage() {
  return (
    <Page>
      <Header>
        <Title>영화 탐색</Title>
        <Description>
          TMDB 목록, 별점 필터, 무한 스크롤을 붙일 기본 라우팅과 데이터 계층이
          준비되어 있습니다.
        </Description>
      </Header>

      <Toolbar aria-label="별점 필터">
        <FilterLabel htmlFor="rating-filter">최소 별점</FilterLabel>
        <FilterInput
          id="rating-filter"
          type="number"
          min={RATING_FILTER.min}
          max={RATING_FILTER.max}
          step={RATING_FILTER.step}
          placeholder="0.0"
        />
      </Toolbar>

      <SetupPanel>
        <PanelTitle>
          {hasTmdbApiKey ? 'API 키가 설정되었습니다.' : 'API 키 설정이 필요합니다.'}
        </PanelTitle>
        <PanelText>
          `.env` 파일에 VITE_API_BASE_URL과 VITE_API_KEY를 넣으면 다음 단계에서
          실제 영화 목록을 렌더링할 수 있습니다.
        </PanelText>
        <DetailLink to={MOVIE_ROUTES.detail(550)}>
          상세 페이지 라우트 확인
        </DetailLink>
      </SetupPanel>
    </Page>
  )
}

const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.background};
`

const Header = styled.header`
  max-width: 960px;
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.display};
`

const Description = styled.p`
  max-width: 680px;
  margin: ${({ theme }) => theme.spacing[3]} 0 0;
  color: ${({ theme }) => theme.colors.subtleText};
  font-size: ${({ theme }) => theme.typography.body};
  line-height: 1.7;
`

const Toolbar = styled.section`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 960px;
  margin-top: ${({ theme }) => theme.spacing[7]};
  padding-bottom: ${({ theme }) => theme.spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const FilterLabel = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: 700;
`

const FilterInput = styled.input`
  width: 128px;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
`

const SetupPanel = styled.section`
  max-width: 960px;
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`

const PanelTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.subtitle};
`

const PanelText = styled.p`
  margin: ${({ theme }) => theme.spacing[3]} 0 ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.subtleText};
  line-height: 1.7;
`

const DetailLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  text-decoration: none;
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.focus};
  }
`
