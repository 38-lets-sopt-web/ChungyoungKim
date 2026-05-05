import type { CSSObject } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

type UserInfoCardItem = {
  label: string
  value: string | number
}

type UserInfoCardProps = {
  items: UserInfoCardItem[]
}

export function UserInfoCard({ items }: UserInfoCardProps) {
  return (
    <dl css={userInfoCardStyle}>
      {items.map((item) => (
        <div css={userInfoRowStyle} key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

const userInfoCardStyle: CSSObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
  margin: `0 0 ${theme.spacing.md}`,
  borderRadius: theme.radius.md,
  background: theme.colors.surfaceMuted,
  padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
}

const userInfoRowStyle: CSSObject = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing.xl,
  margin: 0,
  color: theme.colors.brand,
  fontSize: theme.fontSize.lg,
  fontWeight: 800,

  dt: {
    margin: 0,
  },

  dd: {
    margin: 0,
    color: theme.colors.textMuted,
    fontWeight: 700,
    textAlign: 'right',
  },
}
