import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { pageShellStyle } from '@/shared/styles/pageShellStyle'

export function MemberSearchPage() {
  return (
    <main css={pageShellStyle}>
      <h1>회원 조회</h1>
      <Link to={ROUTE_PATHS.memberDetail(1)}>상세 정보</Link>
    </main>
  )
}
