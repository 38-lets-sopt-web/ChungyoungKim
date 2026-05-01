import { memo } from 'react'
import styled from '@emotion/styled'

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[2]};
`

const StatusCard = styled.div`
  min-height: ${({ $isWide }) => ($isWide ? '132px' : '108px')};
  grid-column: ${({ $isWide }) => ($isWide ? '1 / -1' : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ theme }) => theme.colors.background.card};
`

const Label = styled.p`
  margin: 0;
  color: ${({ $tone, theme }) => {
    if ($tone === 'success') return theme.colors.success
    if ($tone === 'danger') return theme.colors.danger
    return theme.colors.text.primary
  }};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.emphasis};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.body};
`

const Value = styled.p`
  margin: ${({ theme }) => theme.space[1]} 0 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ $isWide }) => ($isWide ? '3rem' : '2.5rem')};
  font-weight: ${({ theme }) => theme.fontWeights.emphasis};
  line-height: ${({ theme }) => theme.lineHeights.display};
  letter-spacing: ${({ theme }) => theme.letterSpacings.subHeading};
`

const GameStatus = ({ timeLeft, score, successCount, failureCount }) => {
  const statusItems = [
    { label: '남은 시간', value: `${timeLeft}초`, isWide: true },
    { label: '총 점수', value: score, isWide: true },
    { label: '성공', value: successCount, tone: 'success' },
    { label: '실패', value: failureCount, tone: 'danger' },
  ]

  return (
    <StatusGrid>
      {statusItems.map((item) => (
        <StatusCard key={item.label} $isWide={item.isWide}>
          <Label $tone={item.tone}>{item.label}</Label>
          <Value $isWide={item.isWide}>{item.value}</Value>
        </StatusCard>
      ))}
    </StatusGrid>
  )
}

export default memo(GameStatus)
