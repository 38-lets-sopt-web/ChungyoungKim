import { useParams } from 'react-router'

import { MemberDetail } from '@/features/members/components/MemberDetail'
import { useMemberDetail } from '@/features/members/hooks/useMemberDetail'

export function MemberDetailPage() {
  const { userId } = useParams()
  const memberDetail = useMemberDetail(userId)

  return <MemberDetail memberDetail={memberDetail} />
}
