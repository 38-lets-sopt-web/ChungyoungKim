import type { CSSObject } from '@emotion/react'

import type { MypageUserController } from '@/features/mypage/hooks/useMypageUser'
import type { ProfileFormController } from '@/features/profile/hooks/useProfileForm'
import { CtaButton } from '@/shared/components/CtaButton'
import { TextField } from '@/shared/components/TextField'
import { UserInfoCard } from '@/shared/components/UserInfoCard'
import { theme } from '@/shared/styles/theme'

type ProfileFormProps = {
  mypageUser: MypageUserController
  profileForm: ProfileFormController
}

export function ProfileForm({ mypageUser, profileForm }: ProfileFormProps) {
  const user = mypageUser.state.user
  const { state, actions } = profileForm
  const profileSummaryItems = [
    { label: '아이디', value: user?.loginId ?? '' },
    { label: '파트', value: user?.part ?? '' },
  ]

  return (
    <form css={profileFormStyle} onSubmit={actions.submitProfile}>
      <h1 css={titleStyle}>내 정보</h1>

      <UserInfoCard items={profileSummaryItems} />

      <TextField
        label="이름"
        name="name"
        type="text"
        value={state.values.name}
        autoComplete="name"
        errorMessage={state.errors.name}
        onChange={(event) => actions.changeName(event.target.value)}
      />

      <TextField
        label="이메일"
        name="email"
        type="email"
        value={state.values.email}
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
        errorMessage={state.errors.age}
        onChange={(event) => actions.changeAge(event.target.value)}
      />

      <CtaButton type="submit" disabled={!state.canSubmit}>
        {state.isSubmitting ? '수정 중' : '정보 수정'}
      </CtaButton>
    </form>
  )
}

const profileFormStyle: CSSObject = {
  display: 'flex',
  width: `min(100%, ${theme.size.authFormWidth})`,
  flexDirection: 'column',
  gap: theme.spacing.md,
  marginInline: 'auto',
  paddingBlock: '8rem',
}

const titleStyle: CSSObject = {
  margin: `0 0 ${theme.spacing.lg}`,
  color: theme.colors.brand,
  fontSize: theme.fontSize.title,
  fontWeight: 800,
  lineHeight: theme.lineHeight.tight,
  textAlign: 'center',
}
