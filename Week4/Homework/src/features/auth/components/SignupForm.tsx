import type { CSSObject } from '@emotion/react'
import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { PasswordVisibilityButton } from '@/features/auth/components/PasswordVisibilityButton'
import type { SignupFormController } from '@/features/auth/hooks/useSignupForm'
import { CtaButton } from '@/shared/components/CtaButton'
import { TextField } from '@/shared/components/TextField'
import { theme } from '@/shared/styles/theme'
import { SOPT_PARTS } from '@/shared/types/user'

type SignupFormProps = {
  signupForm: SignupFormController
}

type SignupStepProps = SignupFormProps

export function SignupForm({ signupForm }: SignupFormProps) {
  return (
    <form css={signupFormStyle} onSubmit={signupForm.actions.submitCurrentStep}>
      <h1 css={titleStyle}>회원가입</h1>

      {signupForm.state.step === 'loginId' ? (
        <LoginIdStep signupForm={signupForm} />
      ) : null}

      {signupForm.state.step === 'password' ? (
        <PasswordStep signupForm={signupForm} />
      ) : null}

      {signupForm.state.step === 'profile' ? (
        <ProfileStep signupForm={signupForm} />
      ) : null}

      <p css={loginGuideStyle}>
        이미 계정이 있나요?{' '}
        <Link css={loginLinkStyle} to={ROUTE_PATHS.login}>
          로그인
        </Link>
      </p>
    </form>
  )
}

function LoginIdStep({ signupForm }: SignupStepProps) {
  const { state, actions } = signupForm

  return (
    <>
      <TextField
        label="아이디"
        name="loginId"
        type="text"
        value={state.values.loginId}
        placeholder="아이디를 입력해주세요."
        autoComplete="username"
        errorMessage={state.errors.loginId}
        onChange={(event) => actions.changeLoginId(event.target.value)}
      />

      <CtaButton type="submit" disabled={!state.canGoNext}>
        다음
      </CtaButton>
    </>
  )
}

function PasswordStep({ signupForm }: SignupStepProps) {
  const { state, actions } = signupForm
  const passwordInputType = state.isPasswordVisible ? 'text' : 'password'
  const passwordVisibilityButton = (
    <PasswordVisibilityButton
      isVisible={state.isPasswordVisible}
      onClick={actions.togglePasswordVisibility}
    />
  )

  return (
    <>
      <TextField
        label="비밀번호"
        name="password"
        type={passwordInputType}
        value={state.values.password}
        placeholder="비밀번호를 입력해주세요."
        autoComplete="new-password"
        errorMessage={state.errors.password}
        onChange={(event) => actions.changePassword(event.target.value)}
        endAdornment={passwordVisibilityButton}
      />

      <TextField
        label="비밀번호 확인"
        name="passwordConfirm"
        type={passwordInputType}
        value={state.values.passwordConfirm}
        placeholder="비밀번호를 다시 입력해 주세요"
        autoComplete="new-password"
        errorMessage={state.errors.passwordConfirm}
        onChange={(event) => actions.changePasswordConfirm(event.target.value)}
        endAdornment={passwordVisibilityButton}
      />

      <CtaButton type="submit" disabled={!state.canGoNext}>
        다음
      </CtaButton>
    </>
  )
}

function ProfileStep({ signupForm }: SignupStepProps) {
  const { state, actions } = signupForm

  return (
    <>
      <TextField
        label="이름"
        name="name"
        type="text"
        value={state.values.name}
        placeholder="이름을 입력해 주세요"
        autoComplete="name"
        errorMessage={state.errors.name}
        onChange={(event) => actions.changeName(event.target.value)}
      />

      <TextField
        label="이메일"
        name="email"
        type="email"
        value={state.values.email}
        placeholder="이메일을 입력해 주세요"
        autoComplete="email"
        errorMessage={state.errors.email}
        onChange={(event) => actions.changeEmail(event.target.value)}
      />

      <TextField
        label="나이"
        name="age"
        type="text"
        inputMode="numeric"
        value={state.values.age}
        placeholder="나이를 입력해 주세요"
        errorMessage={state.errors.age}
        onChange={(event) => actions.changeAge(event.target.value)}
      />

      <div css={selectFieldStyle}>
        <label css={labelTextStyle} htmlFor="signup-part">
          파트
        </label>
        <select
          css={selectStyle}
          id="signup-part"
          name="part"
          value={state.values.part}
          onChange={(event) => actions.changePart(event.target.value)}
        >
          <option value="">파트를 선택해 주세요</option>
          {SOPT_PARTS.map((part) => (
            <option key={part} value={part}>
              {part}
            </option>
          ))}
        </select>
      </div>

      <CtaButton type="submit" disabled={!state.canSubmit}>
        {state.isSubmitting ? '회원가입 중' : '회원가입'}
      </CtaButton>
    </>
  )
}

const signupFormStyle: CSSObject = {
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

const selectFieldStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
}

const labelTextStyle: CSSObject = {
  color: theme.colors.text,
  fontSize: theme.fontSize.sm,
  fontWeight: 700,
}

const selectStyle: CSSObject = {
  width: '100%',
  height: theme.size.controlHeight,
  border: `${theme.borderWidth.sm} solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  background: theme.colors.surface,
  color: theme.colors.text,
  fontSize: theme.fontSize.lg,
  outline: 'none',
  paddingBlock: theme.spacing.none,
  paddingInline: theme.spacing.md,
  transition: 'border-color 160ms ease, box-shadow 160ms ease',

  '&:focus': {
    borderColor: theme.colors.primary,
    boxShadow: `0 0 0 ${theme.borderWidth.focusRing} ${theme.colors.primaryFocusRing}`,
  },
}

const loginGuideStyle: CSSObject = {
  alignSelf: 'center',
  margin: 0,
  color: theme.colors.textMuted,
  fontSize: theme.fontSize.sm,
  fontWeight: 700,
}

const loginLinkStyle: CSSObject = {
  color: theme.colors.link,
  fontWeight: 800,

  '&:hover': {
    textDecoration: 'underline',
  },
}
