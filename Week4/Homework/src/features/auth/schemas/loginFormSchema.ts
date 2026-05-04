import type { z } from 'zod'
import { signInRequestSchema } from '@/shared/api/authApiSchema'

export const loginFormSchema = signInRequestSchema

export type LoginFormValues = z.infer<typeof loginFormSchema>
