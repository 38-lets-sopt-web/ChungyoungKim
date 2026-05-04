import { type SubmitEventHandler, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { signIn } from '@/features/auth/api/signIn'
import {
  loginFormSchema,
  type LoginFormValues,
} from '@/features/auth/schemas/loginFormSchema'
import { saveSignedInUserId } from '@/features/auth/storage/authStorage'
import { getApiErrorMessage } from '@/shared/api/requestApi'

type LoginFormState = {
  values: LoginFormValues
  errorMessage: string
  isPasswordVisible: boolean
  isSubmitting: boolean
  canSubmit: boolean
}

type LoginFormActions = {
  changeLoginId: (loginId: string) => void
  changePassword: (password: string) => void
  togglePasswordVisibility: () => void
  submitLogin: SubmitEventHandler<HTMLFormElement>
}

export type LoginFormController = {
  state: LoginFormState
  actions: LoginFormActions
}

const INITIAL_LOGIN_FORM_VALUES: LoginFormValues = {
  loginId: '',
  password: '',
}

const LOGIN_FORM_VALIDATION_FALLBACK_MESSAGE = '로그인 정보를 확인해주세요.'
const LOGIN_REQUEST_FALLBACK_MESSAGE = '로그인에 실패했습니다.'

function createLoginRequest(values: LoginFormValues): LoginFormValues {
  return {
    loginId: values.loginId.trim(),
    password: values.password,
  }
}

function getLoginFormValidationMessage(values: LoginFormValues) {
  const result = loginFormSchema.safeParse(values)

  if (result.success) {
    return null
  }

  return (
    result.error.issues[0]?.message ?? LOGIN_FORM_VALIDATION_FALLBACK_MESSAGE
  )
}

export function useLoginForm(): LoginFormController {
  const navigate = useNavigate()
  const [loginFormValues, setLoginFormValues] = useState(
    INITIAL_LOGIN_FORM_VALUES,
  )
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const canSubmit =
    loginFormValues.loginId.trim().length > 0 &&
    loginFormValues.password.length > 0 &&
    !isSubmitting

  const changeLoginId = (loginId: string) => {
    setLoginFormValues((currentValues) => ({
      ...currentValues,
      loginId,
    }))
  }

  const changePassword = (password: string) => {
    setLoginFormValues((currentValues) => ({
      ...currentValues,
      password,
    }))
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(
      (currentIsPasswordVisible) => !currentIsPasswordVisible,
    )
  }

  const submitLogin: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    const loginRequest = createLoginRequest(loginFormValues)
    const validationMessage = getLoginFormValidationMessage(loginRequest)

    if (validationMessage !== null) {
      setErrorMessage(validationMessage)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await signIn(loginRequest)
      const signedInUserId = response.data?.userId

      if (!response.success || signedInUserId === undefined) {
        setErrorMessage(response.message)
        return
      }

      saveSignedInUserId(signedInUserId)
      navigate(ROUTE_PATHS.myProfile)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, LOGIN_REQUEST_FALLBACK_MESSAGE))
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    state: {
      values: loginFormValues,
      errorMessage,
      isPasswordVisible,
      isSubmitting,
      canSubmit,
    },
    actions: {
      changeLoginId,
      changePassword,
      togglePasswordVisibility,
      submitLogin,
    },
  }
}
