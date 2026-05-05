import { useEffect, useState } from 'react'

import { getApiErrorMessage } from '@/shared/api/requestApi'
import { getUser } from '@/shared/api/userApi'
import type { UserResponseData } from '@/shared/api/userApiType'

type MemberDetailState = {
  member: UserResponseData | null
  errorMessage: string
  isLoading: boolean
}

type MemberDetailResult = {
  memberId: number
  member: UserResponseData | null
  errorMessage: string
}

export type MemberDetailController = {
  state: MemberDetailState
}

const MEMBER_DETAIL_FALLBACK_MESSAGE = '회원 상세 정보를 불러오지 못했습니다.'
const INVALID_MEMBER_ID_MESSAGE = '올바른 회원 ID가 아닙니다.'

function parseMemberId(memberId: string | undefined) {
  if (memberId === undefined || !/^\d+$/.test(memberId)) {
    return null
  }

  const parsedMemberId = Number(memberId)

  if (!Number.isSafeInteger(parsedMemberId) || parsedMemberId <= 0) {
    return null
  }

  return parsedMemberId
}

function createMemberDetailState(
  memberId: number | null,
  result: MemberDetailResult | null,
): MemberDetailState {
  if (memberId === null) {
    return {
      member: null,
      errorMessage: INVALID_MEMBER_ID_MESSAGE,
      isLoading: false,
    }
  }

  if (result === null || result.memberId !== memberId) {
    return {
      member: null,
      errorMessage: '',
      isLoading: true,
    }
  }

  return {
    member: result.member,
    errorMessage: result.errorMessage,
    isLoading: false,
  }
}

export function useMemberDetail(
  memberId: string | undefined,
): MemberDetailController {
  const parsedMemberId = parseMemberId(memberId)
  const [memberDetailResult, setMemberDetailResult] =
    useState<MemberDetailResult | null>(null)

  useEffect(() => {
    if (parsedMemberId === null) {
      return
    }

    const targetMemberId = parsedMemberId
    let ignoreResponse = false

    async function fetchMemberDetail() {
      try {
        const response = await getUser(targetMemberId)

        if (ignoreResponse) {
          return
        }

        if (!response.success || response.data === undefined) {
          setMemberDetailResult({
            memberId: targetMemberId,
            member: null,
            errorMessage: response.message || MEMBER_DETAIL_FALLBACK_MESSAGE,
          })
          return
        }

        setMemberDetailResult({
          memberId: targetMemberId,
          member: response.data,
          errorMessage: '',
        })
      } catch (error) {
        if (!ignoreResponse) {
          setMemberDetailResult({
            memberId: targetMemberId,
            member: null,
            errorMessage: getApiErrorMessage(
              error,
              MEMBER_DETAIL_FALLBACK_MESSAGE,
            ),
          })
        }
      }
    }

    void fetchMemberDetail()

    return () => {
      ignoreResponse = true
    }
  }, [parsedMemberId])

  return {
    state: createMemberDetailState(parsedMemberId, memberDetailResult),
  }
}
