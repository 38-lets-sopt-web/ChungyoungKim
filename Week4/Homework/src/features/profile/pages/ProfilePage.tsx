import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { PageShell } from '@/shared/components/PageShell'

export function ProfilePage() {
  return (
    <PageShell>
      <h1>내 정보</h1>
      <Link to={ROUTE_PATHS.memberSearch}>회원 조회</Link>
    </PageShell>
  )
}
