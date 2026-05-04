import { z } from 'zod'

import {
  ageNumberSchema,
  emailSchema,
  loginIdRequestSchema,
  partSchema,
  passwordRequestSchema,
  profileNameSchema,
  signUpNameSchema,
} from '@/shared/validation/userValidationSchema'

export const signUpRequestSchema = z.object({
  loginId: loginIdRequestSchema,
  password: passwordRequestSchema,
  name: signUpNameSchema,
  email: emailSchema,
  age: ageNumberSchema,
  part: partSchema,
})

export const signInRequestSchema = z.object({
  loginId: z.string().min(1, '아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
})

export const userUpdateRequestSchema = z.object({
  name: profileNameSchema,
  email: emailSchema,
  age: ageNumberSchema,
})

export type SignUpRequest = z.infer<typeof signUpRequestSchema>
export type SignInRequest = z.infer<typeof signInRequestSchema>
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>
