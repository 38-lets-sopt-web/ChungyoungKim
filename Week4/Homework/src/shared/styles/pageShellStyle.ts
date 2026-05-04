import { css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

export const pageShellStyle = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  background: ${theme.colors.background};
  padding: ${theme.spacing.xxl} ${theme.spacing.xl};

  > h1 {
    margin: 0;
    color: ${theme.colors.brand};
    font-size: ${theme.fontSize.pageTitle};
    line-height: ${theme.lineHeight.tight};
  }

  > a {
    border-radius: ${theme.radius.md};
    background: ${theme.colors.text};
    color: ${theme.colors.white};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-weight: 700;
  }
`
