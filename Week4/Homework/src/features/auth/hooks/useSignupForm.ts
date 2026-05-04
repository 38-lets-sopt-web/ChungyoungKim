import { type SubmitEventHandler, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { signUp } from '@/features/auth/api/signUp'
import {
  signupFormSchema,
  signupLoginIdStepSchema,
  signupPasswordStepSchema,
  signupProfileStepSchema,
  type SignupFormValues,
} from '@/features/auth/schemas/signupFormSchema'
import { getApiErrorMessage } from '@/shared/api/requestApi'
import { SOPT_PARTS, type SoptPart } from '@/shared/types/user'

type SignupStep = 'loginId' | 'password' | 'profile'

type SignupPartValue = SoptPart | ''

type SignupFormInputValues = {
  loginId: string
  password: string
  passwordConfirm: string
  name: string
  email: string
  age: string
  part: SignupPartValue
}

type SignupFormErrors = {
  loginId: string
  password: string
  passwordConfirm: string
  name: string
  email: string
  age: string
}

type SignupFormState = {
  step: SignupStep
  values: SignupFormInputValues
  errors: SignupFormErrors
  isPasswordVisible: boolean
  isSubmitting: boolean
  canGoNext: boolean
  canSubmit: boolean
}

type SignupFormActions = {
  changeLoginId: (loginId: string) => void
  changePassword: (password: string) => void
  changePasswordConfirm: (passwordConfirm: string) => void
  changeName: (name: string) => void
  changeEmail: (email: string) => void
  changeAge: (age: string) => void
  changePart: (part: string) => void
  togglePasswordVisibility: () => void
  submitCurrentStep: SubmitEventHandler<HTMLFormElement>
}

export type SignupFormController = {
  state: SignupFormState
  actions: SignupFormActions
}

const INITIAL_SIGNUP_FORM_VALUES: SignupFormInputValues = {
  loginId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
  age: '',
  part: '',
}

const INITIAL_SIGNUP_FORM_ERRORS: SignupFormErrors = {
  loginId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
  age: '',
}

const SIGNUP_REQUEST_FALLBACK_MESSAGE = '회원가입에 실패했습니다.'

function createSignupFormValues(
  values: SignupFormInputValues,
): SignupFormInputValues {
  return {
    ...values,
    loginId: values.loginId.trim(),
    name: values.name.trim(),
    email: values.email.trim(),
    age: values.age.trim(),
  }
}

function getFieldErrorMessage(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
  fieldName: keyof SignupFormErrors,
) {
  return issues.find((issue) => issue.path[0] === fieldName)?.message ?? ''
}

function shouldShowError(value: string) {
  return value.length > 0
}

function isSignupPartValue(part: string): part is SignupPartValue {
  return part === '' || SOPT_PARTS.some((soptPart) => soptPart === part)
}

function createValidationState(values: SignupFormInputValues) {
  const signupValues = createSignupFormValues(values)
  const loginIdResult = signupLoginIdStepSchema.safeParse({
    loginId: signupValues.loginId,
  })
  const passwordResult = signupPasswordStepSchema.safeParse({
    password: signupValues.password,
    passwordConfirm: signupValues.passwordConfirm,
  })
  const profileResult = signupProfileStepSchema.safeParse({
    name: signupValues.name,
    email: signupValues.email,
    age: signupValues.age,
    part: signupValues.part,
  })
  const signupResult = signupFormSchema.safeParse(signupValues)

  const loginIdIssues = loginIdResult.success ? [] : loginIdResult.error.issues
  const passwordIssues = passwordResult.success
    ? []
    : passwordResult.error.issues
  const profileIssues = profileResult.success ? [] : profileResult.error.issues

  return {
    signupResult,
    isLoginIdStepValid: loginIdResult.success,
    isPasswordStepValid: passwordResult.success,
    isProfileStepValid: profileResult.success,
    errors: {
      ...INITIAL_SIGNUP_FORM_ERRORS,
      loginId: shouldShowError(values.loginId)
        ? getFieldErrorMessage(loginIdIssues, 'loginId')
        : '',
      password: shouldShowError(values.password)
        ? getFieldErrorMessage(passwordIssues, 'password')
        : '',
      passwordConfirm: shouldShowError(values.passwordConfirm)
        ? getFieldErrorMessage(passwordIssues, 'passwordConfirm')
        : '',
      name: shouldShowError(values.name)
        ? getFieldErrorMessage(profileIssues, 'name')
        : '',
      email: shouldShowError(values.email)
        ? getFieldErrorMessage(profileIssues, 'email')
        : '',
      age: shouldShowError(values.age)
        ? getFieldErrorMessage(profileIssues, 'age')
        : '',
    },
  }
}

export function useSignupForm(): SignupFormController {
  const navigate = useNavigate()
  const [step, setStep] = useState<SignupStep>('loginId')
  const [signupFormValues, setSignupFormValues] = useState(
    INITIAL_SIGNUP_FORM_VALUES,
  )
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationState = createValidationState(signupFormValues)
  const canGoNext =
    (step === 'loginId' && validationState.isLoginIdStepValid) ||
    (step === 'password' && validationState.isPasswordStepValid)
  const canSubmit =
    validationState.isLoginIdStepValid &&
    validationState.isPasswordStepValid &&
    validationState.isProfileStepValid &&
    !isSubmitting

  const updateSignupFormValue = <
    TFieldName extends keyof SignupFormInputValues,
  >(
    fieldName: TFieldName,
    value: SignupFormInputValues[TFieldName],
  ) => {
    setSignupFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }))
  }

  const changePart = (part: string) => {
    if (!isSignupPartValue(part)) {
      return
    }

    updateSignupFormValue('part', part)
  }

  const moveToNextStep = () => {
    if (step === 'loginId' && validationState.isLoginIdStepValid) {
      setStep('password')
      return
    }

    if (step === 'password' && validationState.isPasswordStepValid) {
      setStep('profile')
    }
  }

  const submitSignup = async (signupValues: SignupFormValues) => {
    setIsSubmitting(true)

    try {
      const response = await signUp(signupValues)

      if (!response.success) {
        window.alert(response.message || SIGNUP_REQUEST_FALLBACK_MESSAGE)
        return
      }

      window.alert(signupValues.name)
      navigate(ROUTE_PATHS.login)
    } catch (error) {
      window.alert(getApiErrorMessage(error, SIGNUP_REQUEST_FALLBACK_MESSAGE))
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitCurrentStep: SubmitEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault()

    if (step !== 'profile') {
      moveToNextStep()
      return
    }

    if (!validationState.signupResult.success) {
      return
    }

    await submitSignup(validationState.signupResult.data)
  }

  return {
    state: {
      step,
      values: signupFormValues,
      errors: validationState.errors,
      isPasswordVisible,
      isSubmitting,
      canGoNext,
      canSubmit,
    },
    actions: {
      changeLoginId: (loginId) => updateSignupFormValue('loginId', loginId),
      changePassword: (password) => updateSignupFormValue('password', password),
      changePasswordConfirm: (passwordConfirm) =>
        updateSignupFormValue('passwordConfirm', passwordConfirm),
      changeName: (name) => updateSignupFormValue('name', name),
      changeEmail: (email) => updateSignupFormValue('email', email),
      changeAge: (age) => updateSignupFormValue('age', age),
      changePart,
      togglePasswordVisibility: () =>
        setIsPasswordVisible(
          (currentIsPasswordVisible) => !currentIsPasswordVisible,
        ),
      submitCurrentStep,
    },
  }
}
