import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import {
  getSignedInUserId,
  removeSignedInUserId,
} from '@/features/auth/storage/authStorage'
import { getUser } from '@/shared/api/userApi'
import type { UserResponseData } from '@/shared/api/userApiType'

type MypageUserState = {
  user: UserResponseData | null
}

type MypageUserActions = {
  logout: () => void
  replaceUser: (user: UserResponseData) => void
}

export type MypageUserController = {
  state: MypageUserState
  actions: MypageUserActions
}

export function useMypageUser(): MypageUserController {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserResponseData | null>(null)

  const logout = useCallback(() => {
    removeSignedInUserId()
    navigate(ROUTE_PATHS.login, { replace: true })
  }, [navigate])

  const replaceUser = useCallback((nextUser: UserResponseData) => {
    setUser(nextUser)
  }, [])

  useEffect(() => {
    const signedInUserId = getSignedInUserId()

    if (signedInUserId === null) {
      logout()
      return
    }

    const userId = signedInUserId
    let ignoreResponse = false

    async function fetchSignedInUser() {
      try {
        const response = await getUser(userId)

        if (ignoreResponse) {
          return
        }

        if (!response.success || response.data === undefined) {
          logout()
          return
        }

        setUser(response.data)
      } catch {
        if (!ignoreResponse) {
          logout()
        }
      }
    }

    void fetchSignedInUser()

    return () => {
      ignoreResponse = true
    }
  }, [logout])

  return {
    state: {
      user,
    },
    actions: {
      logout,
      replaceUser,
    },
  }
}
