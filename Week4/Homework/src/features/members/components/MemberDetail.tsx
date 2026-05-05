import type { CSSObject } from '@emotion/react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import type { MemberDetailController } from '@/features/members/hooks/useMemberDetail'
import { createMemberDetailItems } from '@/features/members/utils/createMemberDetailItems'
import { UserInfoCard } from '@/shared/components/UserInfoCard'
import { theme } from '@/shared/styles/theme'
import type { User } from '@/shared/types/user'

type MemberDetailProps = {
  memberDetail: MemberDetailController
}

export function MemberDetail({ memberDetail }: MemberDetailProps) {
  const { state } = memberDetail

  return (
    <main css={pageStyle}>
      <h1 css={pageTitleStyle}>상세 정보</h1>

      <Link css={backLinkStyle} to={ROUTE_PATHS.memberSearch}>
        <ArrowLeft css={backIconStyle} aria-hidden />
        뒤로가기
      </Link>

      <MemberDetailContent
        errorMessage={state.errorMessage}
        isLoading={state.isLoading}
        member={state.member}
      />
    </main>
  )
}

type MemberDetailContentProps = {
  errorMessage: string
  isLoading: boolean
  member: User | null
}

function MemberDetailContent({
  errorMessage,
  isLoading,
  member,
}: MemberDetailContentProps) {
  if (isLoading) {
    return <p css={messageStyle}>상세 정보를 불러오는 중입니다.</p>
  }

  if (errorMessage.length > 0) {
    return <p css={messageStyle}>{errorMessage}</p>
  }

  if (member === null) {
    return <p css={messageStyle}>표시할 회원 정보가 없습니다.</p>
  }

  return <UserInfoCard items={createMemberDetailItems(member)} />
}

const pageStyle: CSSObject = {
  width: `min(100%, ${theme.size.authFormWidth})`,
  marginInline: 'auto',
  padding: '16rem 2.4rem 6rem',
}

const pageTitleStyle: CSSObject = {
  margin: `0 0 ${theme.spacing.xxl}`,
  color: theme.colors.brand,
  fontSize: theme.fontSize.title,
  fontWeight: 900,
  lineHeight: theme.lineHeight.tight,
  textAlign: 'center',
}

const backLinkStyle: CSSObject = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.lg,
  color: theme.colors.brand,
  fontSize: theme.fontSize.md,
  fontWeight: 800,
}

const backIconStyle: CSSObject = {
  width: theme.size.icon,
  height: theme.size.icon,
}

const messageStyle: CSSObject = {
  display: 'flex',
  minHeight: '14rem',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  border: `${theme.borderWidth.sm} solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
  background: theme.colors.surfaceMuted,
  color: theme.colors.textMuted,
  fontSize: theme.fontSize.md,
  fontWeight: 700,
  textAlign: 'center',
}
