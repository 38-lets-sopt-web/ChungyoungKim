import { z } from 'zod'

import {
  ageInputSchema,
  emailSchema,
  profileNameSchema,
} from '@/shared/validation/userValidationSchema'

export const profileFormSchema = z.object({
  name: profileNameSchema,
  email: emailSchema,
  age: ageInputSchema,
})

export type ProfileFormInputValues = z.input<typeof profileFormSchema>
