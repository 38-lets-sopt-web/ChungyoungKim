import type { CSSObject } from '@emotion/react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { theme } from '@/shared/styles/theme'

type CtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function CtaButton({
  children,
  type = 'button',
  ...buttonProps
}: CtaButtonProps) {
  return (
    <button css={ctaButtonStyle} type={type} {...buttonProps}>
      {children}
    </button>
  )
}

const ctaButtonStyle: CSSObject = {
  width: '100%',
  height: theme.size.controlHeight,
  border: 0,
  borderRadius: theme.radius.sm,
  background: theme.colors.primary,
  color: theme.colors.white,
  fontSize: theme.fontSize.lg,
  fontWeight: 800,
  transition: 'background-color 180ms ease, opacity 180ms ease',

  '&:hover:not(:disabled)': {
    background: theme.colors.primaryHover,
  },

  '&:disabled': {
    opacity: 0.5,
  },
}
