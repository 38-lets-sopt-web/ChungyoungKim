import { useOutletContext } from 'react-router'

import type { MypageUserController } from '@/features/mypage/hooks/useMypageUser'

export function useMypageUserContext() {
  return useOutletContext<MypageUserController>()
}
