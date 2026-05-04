import type { CSSObject } from '@emotion/react'
import { Eye, EyeOff } from 'lucide-react'

import { theme } from '@/shared/styles/theme'

type PasswordVisibilityButtonProps = {
  isVisible: boolean
  onClick: () => void
}

export function PasswordVisibilityButton({
  isVisible,
  onClick,
}: PasswordVisibilityButtonProps) {
  return (
    <button
      css={passwordVisibilityButtonStyle}
      type="button"
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      onClick={onClick}
    >
      {isVisible ? (
        <EyeOff css={passwordIconStyle} aria-hidden="true" />
      ) : (
        <Eye css={passwordIconStyle} aria-hidden="true" />
      )}
    </button>
  )
}

const passwordVisibilityButtonStyle: CSSObject = {
  position: 'absolute',
  right: theme.spacing.sm,
  display: 'inline-flex',
  width: theme.size.iconButton,
  height: theme.size.iconButton,
  alignItems: 'center',
  justifyContent: 'center',
  border: 0,
  borderRadius: theme.radius.round,
  background: 'transparent',
  color: theme.colors.textMuted,
  transition: 'background-color 160ms ease, color 160ms ease',

  '&:hover': {
    background: theme.colors.surfaceMuted,
    color: theme.colors.brand,
  },
}

const passwordIconStyle: CSSObject = {
  width: theme.size.icon,
  height: theme.size.icon,
}
