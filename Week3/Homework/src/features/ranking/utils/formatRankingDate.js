import {
  INVALID_DATE_PLACEHOLDER,
  RANKING_DATE_LOCALE,
} from '../constants'

const successTimeFormatter = new Intl.DateTimeFormat(RANKING_DATE_LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'medium',
})

export const formatSuccessTime = (successTime) => {
  const date = new Date(successTime)

  if (Number.isNaN(date.getTime())) {
    return INVALID_DATE_PLACEHOLDER
  }

  return successTimeFormatter.format(date)
}
