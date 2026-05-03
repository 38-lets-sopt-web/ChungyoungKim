export const theme = {
  colors: {
    background: '#f6f8fb',
    surface: '#ffffff',
    text: '#1f2933',
    textMuted: '#677489',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    border: '#d9e1ec',
    danger: '#dc2626',
  },
  spacing: {
    xs: '0.4rem',
    sm: '0.8rem',
    md: '1.2rem',
    lg: '1.6rem',
    xl: '2.4rem',
    xxl: '3.2rem',
  },
  radius: {
    sm: '0.6rem',
    md: '0.8rem',
  },
} as const

export type AppTheme = typeof theme
