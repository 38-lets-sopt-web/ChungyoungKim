import { useMypageUserContext } from '@/features/mypage/hooks/useMypageUserContext'
import { ProfileForm } from '@/features/profile/components/ProfileForm'
import { useProfileForm } from '@/features/profile/hooks/useProfileForm'

export function ProfilePage() {
  const mypageUser = useMypageUserContext()
  const profileForm = useProfileForm(mypageUser)

  return <ProfileForm mypageUser={mypageUser} profileForm={profileForm} />
}
