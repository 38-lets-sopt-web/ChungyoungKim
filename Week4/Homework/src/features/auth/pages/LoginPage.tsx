import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { pageShellStyle } from '@/shared/styles/pageShellStyle'

export function LoginPage() {
  return (
    <main css={pageShellStyle}>
      <h1>로그인</h1>
      <Link to={ROUTE_PATHS.signup}>회원가입</Link>
    </main>
  )
}
