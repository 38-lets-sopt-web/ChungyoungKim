import { Link, useParams } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { pageShellStyle } from '@/shared/styles/pageShellStyle'

export function MemberDetailPage() {
  const { userId } = useParams()

  return (
    <main css={pageShellStyle}>
      <h1>상세 정보</h1>
      <p>회원 ID: {userId}</p>
      <Link to={ROUTE_PATHS.memberSearch}>뒤로가기</Link>
    </main>
  )
}
