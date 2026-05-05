import type { CSSObject } from '@emotion/react'
import { NavLink } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import type { MypageUserController } from '@/features/mypage/hooks/useMypageUser'
import { theme } from '@/shared/styles/theme'

type MypageHeaderProps = {
  mypageUser: MypageUserController
}

export function MypageHeader({ mypageUser }: MypageHeaderProps) {
  const username = mypageUser.state.user?.name
  const greetingText =
    username === undefined ? '안녕하세요.' : `안녕하세요, ${username}님`

  return (
    <header css={headerStyle}>
      <div css={headerInnerStyle}>
        <div css={brandGroupStyle}>
          <strong css={brandStyle}>SOPT MEMBERS</strong>
          <p css={greetingStyle}>{greetingText}</p>
        </div>

        <nav css={navStyle} aria-label="마이페이지 메뉴">
          <NavLink
            css={navLinkStyle}
            to={ROUTE_PATHS.myProfile}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            내 정보
          </NavLink>
          <NavLink
            css={navLinkStyle}
            to={ROUTE_PATHS.memberSearch}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            회원 조회
          </NavLink>
          <button
            css={logoutButtonStyle}
            type="button"
            onClick={mypageUser.actions.logout}
          >
            로그아웃
          </button>
        </nav>
      </div>
    </header>
  )
}

const headerStyle: CSSObject = {
  width: '100%',
  background: theme.colors.brand,
  color: theme.colors.white,
}

const headerInnerStyle: CSSObject = {
  display: 'flex',
  minHeight: '8rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing.xl,
  paddingInline: '7rem',
}

const brandGroupStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xs,
}

const brandStyle: CSSObject = {
  fontSize: '2rem',
  fontWeight: 900,
  lineHeight: theme.lineHeight.tight,
}

const greetingStyle: CSSObject = {
  margin: 0,
  fontSize: theme.fontSize.sm,
  fontWeight: 700,
}

const navStyle: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.lg,
}

const navLinkStyle: CSSObject = {
  color: theme.colors.white,
  fontSize: theme.fontSize.md,
  fontWeight: 800,
  opacity: 0.86,
  transition: 'opacity 160ms ease',

  '&:hover, &.is-active': {
    opacity: 1,
  },
}

const logoutButtonStyle: CSSObject = {
  border: 0,
  background: 'transparent',
  color: theme.colors.white,
  fontSize: theme.fontSize.md,
  fontWeight: 800,
  opacity: 0.86,
  padding: 0,
  transition: 'opacity 160ms ease',

  '&:hover': {
    opacity: 1,
  },
}
