import { type SubmitEventHandler, useState } from 'react'

import type { MypageUserController } from '@/features/mypage/hooks/useMypageUser'
import { updateUser } from '@/features/profile/api/updateUser'
import {
  profileFormSchema,
  type ProfileFormInputValues,
} from '@/features/profile/schemas/profileFormSchema'
import { getApiErrorMessage } from '@/shared/api/requestApi'
import type { User } from '@/shared/types/user'

type ProfileFormErrors = {
  name: string
  email: string
  age: string
}

type ProfileFormState = {
  values: ProfileFormInputValues
  errors: ProfileFormErrors
  isSubmitting: boolean
  canSubmit: boolean
}

type ProfileFormActions = {
  changeName: (name: string) => void
  changeEmail: (email: string) => void
  changeAge: (age: string) => void
  submitProfile: SubmitEventHandler<HTMLFormElement>
}

export type ProfileFormController = {
  state: ProfileFormState
  actions: ProfileFormActions
}

const INITIAL_PROFILE_FORM_VALUES: ProfileFormInputValues = {
  name: '',
  email: '',
  age: '',
}

const INITIAL_PROFILE_FORM_ERRORS: ProfileFormErrors = {
  name: '',
  email: '',
  age: '',
}

const PROFILE_UPDATE_FALLBACK_MESSAGE = '정보 수정에 실패했습니다.'

function createProfileFormValues(
  values: ProfileFormInputValues,
): ProfileFormInputValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    age: values.age.trim(),
  }
}

function createProfileFormValuesFromUser(
  user: User | null,
): ProfileFormInputValues {
  if (user === null) {
    return INITIAL_PROFILE_FORM_VALUES
  }

  return {
    name: user.name,
    email: user.email,
    age: String(user.age),
  }
}

function getFieldErrorMessage(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
  fieldName: keyof ProfileFormErrors,
) {
  return issues.find((issue) => issue.path[0] === fieldName)?.message ?? ''
}

function shouldShowError(value: string) {
  return value.length > 0
}

function createProfileFormErrors(values: ProfileFormInputValues) {
  const result = profileFormSchema.safeParse(createProfileFormValues(values))

  if (result.success) {
    return INITIAL_PROFILE_FORM_ERRORS
  }

  return {
    name: shouldShowError(values.name)
      ? getFieldErrorMessage(result.error.issues, 'name')
      : '',
    email: shouldShowError(values.email)
      ? getFieldErrorMessage(result.error.issues, 'email')
      : '',
    age: shouldShowError(values.age)
      ? getFieldErrorMessage(result.error.issues, 'age')
      : '',
  }
}

export function useProfileForm(
  mypageUser: MypageUserController,
): ProfileFormController {
  const currentUser = mypageUser.state.user
  const [profileFormDraft, setProfileFormDraft] =
    useState<ProfileFormInputValues | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const profileFormValues =
    profileFormDraft ?? createProfileFormValuesFromUser(currentUser)

  const errors = createProfileFormErrors(profileFormValues)
  const parsedProfileForm = profileFormSchema.safeParse(
    createProfileFormValues(profileFormValues),
  )
  const canSubmit =
    currentUser !== null && parsedProfileForm.success && !isSubmitting

  const updateProfileFormValue = <
    TFieldName extends keyof ProfileFormInputValues,
  >(
    fieldName: TFieldName,
    value: ProfileFormInputValues[TFieldName],
  ) => {
    setProfileFormDraft((currentDraft) => ({
      ...(currentDraft ?? profileFormValues),
      [fieldName]: value,
    }))
  }

  const submitProfile: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (currentUser === null || !parsedProfileForm.success) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await updateUser(currentUser.id, parsedProfileForm.data)

      if (!response.success) {
        window.alert(response.message || PROFILE_UPDATE_FALLBACK_MESSAGE)
        return
      }

      mypageUser.actions.replaceUser({
        ...currentUser,
        ...parsedProfileForm.data,
      })
      setProfileFormDraft({
        ...parsedProfileForm.data,
        age: String(parsedProfileForm.data.age),
      })
      window.alert('정보 수정에 성공했습니다.')
    } catch (error) {
      window.alert(getApiErrorMessage(error, PROFILE_UPDATE_FALLBACK_MESSAGE))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    state: {
      values: profileFormValues,
      errors,
      isSubmitting,
      canSubmit,
    },
    actions: {
      changeName: (name) => updateProfileFormValue('name', name),
      changeEmail: (email) => updateProfileFormValue('email', email),
      changeAge: (age) => updateProfileFormValue('age', age),
      submitProfile,
    },
  }
}
