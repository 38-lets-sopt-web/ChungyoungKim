import { SignupForm } from '@/features/auth/components/SignupForm'
import { useSignupForm } from '@/features/auth/hooks/useSignupForm'
import { PageShell } from '@/shared/components/PageShell'

export function SignupPage() {
  const signupForm = useSignupForm()

  return (
    <PageShell>
      <SignupForm signupForm={signupForm} />
    </PageShell>
  )
}
