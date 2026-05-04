import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { PageShell } from '@/shared/components/PageShell'

export function SignupPage() {
  return (
    <PageShell>
      <h1>회원가입</h1>
      <Link to={ROUTE_PATHS.login}>로그인</Link>
    </PageShell>
  )
}
