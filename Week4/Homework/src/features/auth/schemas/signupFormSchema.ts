import { z } from 'zod'
import {
  ageInputSchema,
  emailSchema,
  LOGIN_ID_DISPLAY_MAX_LENGTH,
  loginIdRequestSchema,
  partSchema,
  passwordPolicySchema,
  signUpNameSchema,
} from '@/shared/validation/userValidationSchema'

export const signupLoginIdStepSchema = z.object({
  loginId: z
    .string()
    .min(1, '아이디를 입력해주세요.')
    .max(LOGIN_ID_DISPLAY_MAX_LENGTH, '아이디는 50자를 넘을 수 없습니다.')
    .pipe(loginIdRequestSchema),
})

export const signupPasswordStepSchema = z
  .object({
    password: passwordPolicySchema,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export const signupProfileStepSchema = z.object({
  name: signUpNameSchema,
  email: emailSchema,
  age: ageInputSchema,
  part: partSchema,
})

export const signupFormSchema = z.object({
  ...signupLoginIdStepSchema.shape,
  password: signupPasswordStepSchema.shape.password,
  ...signupProfileStepSchema.shape,
})

export type SignupFormValues = z.infer<typeof signupFormSchema>
