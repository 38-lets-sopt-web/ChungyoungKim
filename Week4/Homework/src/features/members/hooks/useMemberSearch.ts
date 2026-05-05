import { type SubmitEventHandler, useEffect, useState } from 'react'

import { getApiErrorMessage } from '@/shared/api/requestApi'
import { getUser, getUsers } from '@/shared/api/userApi'
import type { UserResponseData } from '@/shared/api/userApiType'
import type { UserSummary } from '@/shared/types/user'

type MemberSearchState = {
  memberId: string
  members: UserSummary[]
  searchedMember: UserResponseData | null
  memberListErrorMessage: string
  memberSearchErrorMessage: string
  isLoadingMembers: boolean
  isSearchingMember: boolean
  canSearchMember: boolean
}

type MemberSearchActions = {
  changeMemberId: (memberId: string) => void
  submitMemberSearch: SubmitEventHandler<HTMLFormElement>
}

export type MemberSearchController = {
  state: MemberSearchState
  actions: MemberSearchActions
}

const MEMBER_LIST_FALLBACK_MESSAGE = '회원 리스트를 불러오지 못했습니다.'
const MEMBER_SEARCH_FALLBACK_MESSAGE = '회원 조회에 실패했습니다.'

function removeNonNumericCharacters(value: string) {
  return value.replace(/\D/g, '')
}

export function useMemberSearch(): MemberSearchController {
  const [memberId, setMemberId] = useState('')
  const [members, setMembers] = useState<UserSummary[]>([])
  const [searchedMember, setSearchedMember] = useState<UserResponseData | null>(
    null,
  )
  const [memberListErrorMessage, setMemberListErrorMessage] = useState('')
  const [memberSearchErrorMessage, setMemberSearchErrorMessage] = useState('')
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)
  const [isSearchingMember, setIsSearchingMember] = useState(false)

  const canSearchMember = memberId.length > 0 && !isSearchingMember

  useEffect(() => {
    let ignoreResponse = false

    async function fetchMembers() {
      try {
        const response = await getUsers()

        if (ignoreResponse) {
          return
        }

        if (!response.success || response.data === undefined) {
          setMemberListErrorMessage(
            response.message || MEMBER_LIST_FALLBACK_MESSAGE,
          )
          return
        }

        setMembers(response.data.users)
      } catch (error) {
        if (!ignoreResponse) {
          setMemberListErrorMessage(
            getApiErrorMessage(error, MEMBER_LIST_FALLBACK_MESSAGE),
          )
        }
      } finally {
        if (!ignoreResponse) {
          setIsLoadingMembers(false)
        }
      }
    }

    void fetchMembers()

    return () => {
      ignoreResponse = true
    }
  }, [])

  const changeMemberId = (nextMemberId: string) => {
    setMemberId(removeNonNumericCharacters(nextMemberId))
  }

  const submitMemberSearch: SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault()

    if (!canSearchMember) {
      return
    }

    setIsSearchingMember(true)
    setSearchedMember(null)
    setMemberSearchErrorMessage('')

    try {
      const response = await getUser(Number(memberId))

      if (!response.success || response.data === undefined) {
        setMemberSearchErrorMessage(
          response.message || MEMBER_SEARCH_FALLBACK_MESSAGE,
        )
        return
      }

      setSearchedMember(response.data)
    } catch (error) {
      setMemberSearchErrorMessage(
        getApiErrorMessage(error, MEMBER_SEARCH_FALLBACK_MESSAGE),
      )
    } finally {
      setIsSearchingMember(false)
    }
  }

  return {
    state: {
      memberId,
      members,
      searchedMember,
      memberListErrorMessage,
      memberSearchErrorMessage,
      isLoadingMembers,
      isSearchingMember,
      canSearchMember,
    },
    actions: {
      changeMemberId,
      submitMemberSearch,
    },
  }
}
