export const SOPT_PARTS = ['iOS', '안드로이드', '웹'] as const

export type SoptPart = (typeof SOPT_PARTS)[number]

export type User = {
  id: number
  loginId: string
  name: string
  email: string
  age: number
  part: SoptPart
}

export type UserSummary = Pick<User, 'id' | 'name' | 'part'>
