export const theme = {
  colors: {
    white: '#ffffff',
    background: {
      page: '#effcff',
      card: '#dcf8fc',
      container: '#d9f8fc',
      board: '#f5feff',
    },
    text: {
      primary: '#12385c',
      muted: '#4c7690',
    },
    border: {
      default: '#c8f3fa',
      subtle: '#dff9fc',
    },
    overlay: 'rgba(0, 0, 0, 0.48)',
    feedbackSurface: 'rgba(255, 255, 255, 0.78)',
    hole: '#a8eef6',
    success: '#49c52d',
    danger: '#f39ca8',
    activeTab: '#67d8ef',
  },
  fontFamilies: {
    sans:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    mono: "'SF Mono', Menlo, Monaco, Consolas, ui-monospace, monospace",
  },
  fontWeights: {
    light: 340,
    regular: 400,
    strong: 480,
    emphasis: 540,
    bold: 700,
  },
  fontSizes: {
    subHeading: '1.625rem',
    featureTitle: '1.5rem',
    bodyLarge: '1.25rem',
    body: '1rem',
    small: '0.875rem',
    monoSmall: '0.75rem',
  },
  lineHeights: {
    display: 1,
    compact: 1.3,
    comfortable: 1.35,
    body: 1.4,
    default: 1.45,
  },
  letterSpacings: {
    subHeading: '-0.26px',
    bodyLarge: '-0.14px',
    body: '-0.14px',
    none: '0',
    monoSmall: '0.6px',
  },
  space: {
    1: '0.5rem',
    1.5: '0.75rem',
    2: '1rem',
    3: '1.5rem',
    4: '2rem',
    5: '2.5rem',
    6: '3rem',
  },
  radii: {
    subtle: '6px',
    card: '16px',
    pill: '12px',
    circle: '100%',
  },
  shadows: {
    floating: '0 12px 28px rgba(18, 56, 92, 0.06)',
  },
  focus: {
    width: '2px',
    style: 'dashed',
    offset: '3px',
  },
  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
  },
  layout: {
    contentWidth: '1200px',
    navHeight: '64px',
  },
  zIndices: {
    nav: 100,
  },
}
