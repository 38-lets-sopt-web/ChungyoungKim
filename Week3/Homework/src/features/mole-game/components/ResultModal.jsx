import { memo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import Button from '../../../shared/ui/Button'
import Panel from '../../../shared/ui/Panel'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.overlay};
`

const Dialog = styled(Panel)`
  width: 420px;
  padding: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.floating};
`

const Title = styled.h2`
  margin: ${({ theme }) => theme.space[1]} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.subHeading};
  font-weight: ${({ theme }) => theme.fontWeights.emphasis};
  line-height: ${({ theme }) => theme.lineHeights.comfortable};
  letter-spacing: ${({ theme }) => theme.letterSpacings.subHeading};
`

const LevelLabel = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.muted};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: ${({ theme }) => theme.fontSizes.monoSmall};
  line-height: ${({ theme }) => theme.lineHeights.display};
  letter-spacing: ${({ theme }) => theme.letterSpacings.monoSmall};
  text-transform: uppercase;
`

const Score = styled.p`
  margin: ${({ theme }) => theme.space[3]} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.bodyLarge};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.bodyLarge};
`

const DetailList = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[1.5]};
  margin: ${({ theme }) => theme.space[3]} 0 0;
`

const DetailItem = styled(Panel)`
  padding: ${({ theme }) => theme.space[1.5]};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
`

const DetailTitle = styled.dt`
  color: ${({ theme }) => theme.colors.text.muted};
  font-family: ${({ theme }) => theme.fontFamilies.mono};
  font-size: ${({ theme }) => theme.fontSizes.monoSmall};
  letter-spacing: ${({ theme }) => theme.letterSpacings.monoSmall};
  text-transform: uppercase;
`

const DetailValue = styled.dd`
  margin: ${({ theme }) => theme.space[1]} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.bodyLarge};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
`

const ModalButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.space[4]};
`

const ResultModal = ({ isOpen, result, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || result === null) {
    return null
  }

  return createPortal(
    <Overlay>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="result-title">
        <LevelLabel>{result.levelLabel}</LevelLabel>
        <Title id="result-title">게임 종료</Title>
        <Score>최종 점수 {result.score}점</Score>
        <DetailList>
          <DetailItem>
            <DetailTitle>Success</DetailTitle>
            <DetailValue>{result.successCount}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailTitle>Fail</DetailTitle>
            <DetailValue>{result.failureCount}</DetailValue>
          </DetailItem>
        </DetailList>
        <ModalButton type="button" $variant="tab" onClick={onClose}>
          처음으로
        </ModalButton>
      </Dialog>
    </Overlay>,
    document.body,
  )
}

export default memo(ResultModal)
