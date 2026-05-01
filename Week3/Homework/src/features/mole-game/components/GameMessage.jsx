import { memo } from 'react'
import styled from '@emotion/styled'

const Message = styled.p`
  min-height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: ${({ theme }) => theme.space[2]};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.card};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.card};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.emphasis};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.body};
  text-align: center;
`

const GameMessage = ({ message }) => {
  return <Message aria-live="polite">{message}</Message>
}

export default memo(GameMessage)
