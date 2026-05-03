import { Link } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { pageShellStyle } from '@/shared/styles/pageShellStyle'

export function SignupPage() {
  return (
    <main css={pageShellStyle}>
      <h1>회원가입</h1>
      <Link to={ROUTE_PATHS.login}>로그인</Link>
    </main>
  )
}
