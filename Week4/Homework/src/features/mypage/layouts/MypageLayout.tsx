import type { CSSObject } from '@emotion/react'
import { Outlet } from 'react-router'

import { MypageHeader } from '@/features/mypage/components/MypageHeader'
import { useMypageUser } from '@/features/mypage/hooks/useMypageUser'
import { theme } from '@/shared/styles/theme'

export function MypageLayout() {
  const mypageUser = useMypageUser()

  return (
    <div css={layoutStyle}>
      <MypageHeader mypageUser={mypageUser} />
      <Outlet context={mypageUser} />
    </div>
  )
}

const layoutStyle: CSSObject = {
  minHeight: '100vh',
  background: theme.colors.background,
}
