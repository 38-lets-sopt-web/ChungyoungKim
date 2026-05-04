import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { PageShell } from '@/shared/components/PageShell'

export function MemberSearchPage() {
  return (
    <PageShell>
      <h1>회원 조회</h1>
      <Link to={ROUTE_PATHS.memberDetail(1)}>상세 정보</Link>
    </PageShell>
  )
}
