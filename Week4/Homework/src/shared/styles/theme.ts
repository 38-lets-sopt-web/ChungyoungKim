export const theme = {
  colors: {
    background: '#eaf0f8',
    surface: '#ffffff',
    surfaceMuted: '#eef2f7',
    text: '#111827',
    textMuted: '#667085',
    brand: '#123554',
    primary: '#5bcbec',
    primaryFocusRing: 'rgba(91, 203, 236, 0.22)',
    primaryHover: '#2bb8df',
    link: '#2376b7',
    border: '#c6d0dc',
    danger: '#dc2626',
    white: '#ffffff',
  },
  spacing: {
    none: '0rem',
    xs: '0.4rem',
    sm: '0.7rem',
    md: '1.1rem',
    lg: '1.6rem',
    xl: '2.2rem',
    xxl: '3rem',
  },
  radius: {
    sm: '0.5rem',
    md: '0.7rem',
    round: '999rem',
  },
  borderWidth: {
    sm: '0.1rem',
    focusRing: '0.3rem',
  },
  fontSize: {
    root: '62.5%',
    sm: '1.3rem',
    md: '1.4rem',
    lg: '1.5rem',
    title: '2.6rem',
    pageTitle: '3rem',
  },
  size: {
    controlHeight: '4rem',
    controlEndPadding: '4.2rem',
    fieldErrorMinHeight: '1.8rem',
    iconButton: '2.8rem',
    icon: '1.9rem',
    authFormWidth: '45rem',
  },
  lineHeight: {
    tight: '1.2',
  },
} as const

export type AppTheme = typeof theme
