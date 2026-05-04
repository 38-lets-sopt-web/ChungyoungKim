import { LoginForm } from '@/features/auth/components/LoginForm'
import { useLoginForm } from '@/features/auth/hooks/useLoginForm'
import { PageShell } from '@/shared/components/PageShell'

export function LoginPage() {
  const loginForm = useLoginForm()

  return (
    <PageShell>
      <LoginForm loginForm={loginForm} />
    </PageShell>
  )
}
