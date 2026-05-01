import { useState } from 'react'
import styled from '@emotion/styled'
import Button from '../../shared/ui/Button'
import Panel from '../../shared/ui/Panel'
import {
  clearRankingRecords,
  readRankingRecords,
} from './rankingStorage'
import {
  EMPTY_RANKING_MESSAGE,
  INVALID_DATE_PLACEHOLDER,
  RANKING_DATE_LOCALE,
  RANKING_RESET_CONFIRM_MESSAGE,
  RANKING_TABLE_COLUMN_COUNT,
} from './constants'

const successTimeFormatter = new Intl.DateTimeFormat(RANKING_DATE_LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'medium',
})

const formatSuccessTime = (successTime) => {
  const date = new Date(successTime)

  if (Number.isNaN(date.getTime())) {
    return INVALID_DATE_PLACEHOLDER
  }

  return successTimeFormatter.format(date)
}

const RankingSection = styled.section`
  width: ${({ theme }) => theme.layout.contentWidth};
  margin: ${({ theme }) => theme.space[4]} auto 0;
`

const RankingPanel = styled(Panel)`
  min-height: 620px;
  padding: ${({ theme }) => theme.space[3]};
`

const RankingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[3]};
`

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.featureTitle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.compact};
  letter-spacing: ${({ theme }) => theme.letterSpacings.none};
`

const ResetButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.danger};
`

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${({ theme }) => theme.colors.text.primary};
  table-layout: fixed;
`

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.hole};
`

const HeaderCell = styled.th`
  padding: ${({ theme }) => theme.space[1.5]} ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.emphasis};
  line-height: ${({ theme }) => theme.lineHeights.body};
  text-align: center;
  white-space: nowrap;
`

const BodyRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`

const BodyCell = styled.td`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: ${({ theme }) => theme.lineHeights.body};
  text-align: center;
  white-space: nowrap;
`

const EmptyCell = styled(BodyCell)`
  padding-block: ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.colors.text.muted};
`

const RankingPage = () => {
  const [rankingRecords, setRankingRecords] = useState(readRankingRecords)
  const rankingRows = rankingRecords.map((record, index) => ({
    ...record,
    rank: index + 1,
    recordedAt: formatSuccessTime(record.successTime),
  }))
  const hasRankingRows = rankingRows.length > 0

  const handleResetClick = () => {
    const confirmed = window.confirm(RANKING_RESET_CONFIRM_MESSAGE)

    if (!confirmed) {
      return
    }

    clearRankingRecords()
    setRankingRecords([])
  }

  return (
    <RankingSection>
      <RankingPanel $variant="panel">
        <RankingHeader>
          <Title>랭킹 보드</Title>
          <ResetButton type="button" $variant="danger" onClick={handleResetClick}>
            기록 초기화
          </ResetButton>
        </RankingHeader>

        <RankingTable>
          <TableHead>
            <tr>
              <HeaderCell scope="col">순위</HeaderCell>
              <HeaderCell scope="col">레벨</HeaderCell>
              <HeaderCell scope="col">점수</HeaderCell>
              <HeaderCell scope="col">기록 시간</HeaderCell>
            </tr>
          </TableHead>
          <tbody>
            {hasRankingRows ? (
              rankingRows.map((row) => (
                <BodyRow
                  key={`${row.level}-${row.score}-${row.successTime}-${row.rank}`}
                >
                  <BodyCell>{row.rank}</BodyCell>
                  <BodyCell>{row.level}</BodyCell>
                  <BodyCell>{row.score}점</BodyCell>
                  <BodyCell>{row.recordedAt}</BodyCell>
                </BodyRow>
              ))
            ) : (
              <BodyRow>
                <EmptyCell colSpan={RANKING_TABLE_COLUMN_COUNT}>
                  {EMPTY_RANKING_MESSAGE}
                </EmptyCell>
              </BodyRow>
            )}
          </tbody>
        </RankingTable>
      </RankingPanel>
    </RankingSection>
  )
}

export default RankingPage
