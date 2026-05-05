import type { User } from '@/shared/types/user'

export function createMemberDetailItems(member: User) {
  return [
    { label: '아이디', value: member.loginId },
    { label: '이름', value: member.name },
    { label: '이메일', value: member.email },
    { label: '나이', value: `${member.age}세` },
    { label: '파트', value: member.part },
  ]
}
