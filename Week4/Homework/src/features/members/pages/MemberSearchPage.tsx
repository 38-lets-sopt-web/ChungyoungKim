import { MemberSearch } from '@/features/members/components/MemberSearch'
import { useMemberSearch } from '@/features/members/hooks/useMemberSearch'

export function MemberSearchPage() {
  const memberSearch = useMemberSearch()

  return <MemberSearch memberSearch={memberSearch} />
}
