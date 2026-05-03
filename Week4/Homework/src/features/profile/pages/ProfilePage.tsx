import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { pageShellStyle } from '@/shared/styles/pageShellStyle'

export function ProfilePage() {
  return (
    <main css={pageShellStyle}>
      <h1>내 정보</h1>
      <Link to={ROUTE_PATHS.memberSearch}>회원 조회</Link>
    </main>
  )
}
