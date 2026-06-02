export const theme = {
  colors: {
    background: '#f6f3ee',
    surface: '#fffdf8',
    text: '#202124',
    subtleText: '#5f6368',
    muted: '#7b6f61',
    border: '#ded7ca',
    primary: '#b9382f',
    onPrimary: '#ffffff',
    accent: '#0f766e',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '32px',
    8: '40px',
  },
  radius: {
    sm: '6px',
    md: '8px',
  },
  shadow: {
    card: '0 16px 40px rgb(32 33 36 / 8%)',
    focus: '0 10px 24px rgb(185 56 47 / 22%)',
  },
  typography: {
    display: '40px',
    title: '32px',
    subtitle: '22px',
    body: '16px',
    caption: '13px',
  },
} as const
