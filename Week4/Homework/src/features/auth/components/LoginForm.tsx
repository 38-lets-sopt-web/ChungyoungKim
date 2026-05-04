import type { CSSObject } from '@emotion/react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import type { LoginFormController } from '@/features/auth/hooks/useLoginForm'
import { CtaButton } from '@/shared/components/CtaButton'
import { TextField } from '@/shared/components/TextField'
import { theme } from '@/shared/styles/theme'

type LoginFormProps = {
  loginForm: LoginFormController
}

export function LoginForm({ loginForm }: LoginFormProps) {
  const { state, actions } = loginForm

  return (
    <form css={loginFormStyle} onSubmit={actions.submitLogin}>
      <h1 css={titleStyle}>SOPT MEMBERS</h1>

      <TextField
        label="아이디"
        name="loginId"
        type="text"
        value={state.values.loginId}
        autoComplete="username"
        onChange={(event) => actions.changeLoginId(event.target.value)}
      />

      <TextField
        label="비밀번호"
        name="password"
        type={state.isPasswordVisible ? 'text' : 'password'}
        value={state.values.password}
        autoComplete="current-password"
        onChange={(event) => actions.changePassword(event.target.value)}
        endAdornment={
          <button
            css={passwordVisibilityButtonStyle}
            type="button"
            aria-label={
              state.isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'
            }
            onClick={actions.togglePasswordVisibility}
          >
            {state.isPasswordVisible ? (
              <EyeOff css={passwordIconStyle} aria-hidden="true" />
            ) : (
              <Eye css={passwordIconStyle} aria-hidden="true" />
            )}
          </button>
        }
      />

      {state.errorMessage.length > 0 ? (
        <p css={errorMessageStyle} role="alert">
          {state.errorMessage}
        </p>
      ) : null}

      <CtaButton type="submit" disabled={!state.canSubmit}>
        {state.isSubmitting ? '로그인 중' : '로그인'}
      </CtaButton>

      <Link css={signupLinkStyle} to={ROUTE_PATHS.signup}>
        회원가입
      </Link>
    </form>
  )
}

const loginFormStyle: CSSObject = {
  display: 'flex',
  width: `min(100%, ${theme.size.authFormWidth})`,
  flexDirection: 'column',
  gap: theme.spacing.md,
}

const titleStyle: CSSObject = {
  margin: `0 0 ${theme.spacing.lg}`,
  color: theme.colors.brand,
  fontSize: theme.fontSize.title,
  fontWeight: 800,
  lineHeight: theme.lineHeight.tight,
  textAlign: 'center',
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

const errorMessageStyle: CSSObject = {
  minHeight: theme.size.fieldErrorMinHeight,
  margin: `calc(${theme.spacing.xs} * -1) 0 0`,
  color: theme.colors.danger,
  fontSize: theme.fontSize.sm,
  fontWeight: 700,
}

const signupLinkStyle: CSSObject = {
  alignSelf: 'center',
  color: theme.colors.link,
  fontSize: theme.fontSize.md,
  fontWeight: 800,

  '&:hover': {
    textDecoration: 'underline',
  },
}
