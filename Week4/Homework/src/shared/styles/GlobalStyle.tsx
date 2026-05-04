import { Global, css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

export function GlobalStyle() {
  return <Global styles={globalStyle} />
}

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: ${theme.fontSize.root};
    font-family:
      Inter,
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
  }

  button,
  input,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
