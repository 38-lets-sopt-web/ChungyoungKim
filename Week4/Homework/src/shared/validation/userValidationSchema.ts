import { z } from 'zod'

import { SOPT_PARTS } from '@/shared/types/user'

export const LOGIN_ID_MAX_LENGTH_FOR_CHALLENGE = 50

export const loginIdRequestSchema = z
  .string()
  .min(4, '아이디는 4자 이상 입력해주세요.')
  .max(20, '아이디는 20자 이하로 입력해주세요.')

export const passwordRequestSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상 입력해주세요.')
  .max(20, '비밀번호는 20자 이하로 입력해주세요.')

export const passwordPolicySchema = z
  .string()
  .min(8, '비밀번호는 8자 이상 입력해주세요.')
  .max(64, '비밀번호는 64자 이하로 입력해주세요.')
  .regex(/[A-Za-z]/, '비밀번호는 영어를 1자 이상 포함해야 합니다.')
  .regex(/[0-9]/, '비밀번호는 숫자를 1자 이상 포함해야 합니다.')
  .regex(/[^A-Za-z0-9\s]/, '비밀번호는 특수문자를 1자 이상 포함해야 합니다.')
  .refine((password) => !/\s/.test(password), {
    message: '비밀번호에는 공백을 사용할 수 없습니다.',
  })

export const signUpNameSchema = z
  .string()
  .min(1, '이름을 입력해주세요.')
  .max(10, '이름은 10자 이하로 입력해주세요.')

export const profileNameSchema = z.string().min(1, '이름을 입력해주세요.')

export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .pipe(z.email('이메일 형식으로 입력해주세요.'))

export const ageNumberSchema = z
  .number()
  .int('나이는 정수로 입력해주세요.')
  .min(1, '나이는 1 이상이어야 합니다.')
  .max(150, '나이는 150 이하이어야 합니다.')

export const ageInputSchema = z
  .string()
  .min(1, '나이를 입력해주세요.')
  .regex(/^\d+$/, '나이는 숫자만 입력해주세요.')
  .transform(Number)
  .pipe(ageNumberSchema)

export const partSchema = z.enum(SOPT_PARTS, {
  error: '파트는 iOS, 안드로이드, 웹 중 하나를 선택해주세요.',
})
