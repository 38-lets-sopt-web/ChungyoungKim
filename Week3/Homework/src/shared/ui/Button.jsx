import styled from '@emotion/styled'

const getButtonBackground = (variant, theme) => {
  if (variant === 'danger') {
    return theme.colors.danger
  }

  if (variant === 'light') {
    return theme.colors.white
  }

  if (variant === 'tab') {
    return theme.colors.activeTab
  }

  return theme.colors.success
}

const getButtonColor = (variant, theme) => {
  if (variant === 'light') {
    return theme.colors.text.primary
  }

  return theme.colors.white
}

const Button = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 8px 15px 10px;
  background-color: ${({ $variant = 'primary', theme }) =>
    getButtonBackground($variant, theme)};
  color: ${({ $variant = 'primary', theme }) => getButtonColor($variant, theme)};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.body};
  transition:
    opacity ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export default Button
