import type { CSSObject } from '@emotion/react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'

import { theme } from '@/shared/styles/theme'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errorMessage?: string
  endAdornment?: ReactNode
}

export function TextField({
  id,
  label,
  errorMessage,
  endAdornment,
  className,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorMessageId = `${inputId}-error`
  const hasErrorMessage = errorMessage !== undefined && errorMessage.length > 0
  const inputCss = endAdornment === undefined ? inputStyle : inputWithAdornmentStyle

  return (
    <div css={fieldStyle} className={className}>
      <label css={labelTextStyle} htmlFor={inputId}>
        {label}
      </label>

      <span css={inputWrapperStyle}>
        <input
          css={inputCss}
          id={inputId}
          aria-invalid={hasErrorMessage}
          aria-describedby={hasErrorMessage ? errorMessageId : undefined}
          {...inputProps}
        />
        {endAdornment}
      </span>

      {hasErrorMessage ? (
        <p css={fieldErrorMessageStyle} id={errorMessageId} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}

const fieldStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
}

const labelTextStyle: CSSObject = {
  color: theme.colors.text,
  fontSize: theme.fontSize.sm,
  fontWeight: 700,
}

const inputWrapperStyle: CSSObject = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}

const inputBaseStyle: CSSObject = {
  width: '100%',
  height: theme.size.controlHeight,
  border: `${theme.borderWidth.sm} solid ${theme.colors.border}`,
  borderRadius: theme.radius.sm,
  background: theme.colors.surface,
  color: theme.colors.text,
  fontSize: theme.fontSize.lg,
  outline: 'none',
  transition: 'border-color 160ms ease, box-shadow 160ms ease',

  '&:focus': {
    borderColor: theme.colors.primary,
    boxShadow: `0 0 0 ${theme.borderWidth.focusRing} ${theme.colors.primaryFocusRing}`,
  },
}

const inputStyle: CSSObject = {
  ...inputBaseStyle,
  paddingBlock: theme.spacing.none,
  paddingInline: theme.spacing.md,
}

const inputWithAdornmentStyle: CSSObject = {
  ...inputBaseStyle,
  paddingBlock: theme.spacing.none,
  paddingInline: `${theme.spacing.md} ${theme.size.controlEndPadding}`,
}

const fieldErrorMessageStyle: CSSObject = {
  margin: 0,
  color: theme.colors.danger,
  fontSize: theme.fontSize.sm,
  fontWeight: 700,
}
