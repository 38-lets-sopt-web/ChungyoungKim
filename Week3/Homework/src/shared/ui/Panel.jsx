import styled from '@emotion/styled'

const Panel = styled.div`
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ $variant = 'card', theme }) => {
    if ($variant === 'panel') {
      return theme.colors.background.container
    }

    if ($variant === 'board') {
      return theme.colors.background.board
    }

    return theme.colors.background.card
  }};
`

export default Panel
