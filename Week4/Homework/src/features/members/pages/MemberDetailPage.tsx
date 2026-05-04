import { Link, useParams } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { PageShell } from '@/shared/components/PageShell'

export function MemberDetailPage() {
  const { userId } = useParams()

  return (
    <PageShell>
      <h1>상세 정보</h1>
      <p>회원 ID: {userId}</p>
      <Link to={ROUTE_PATHS.memberSearch}>뒤로가기</Link>
    </PageShell>
  )
}
