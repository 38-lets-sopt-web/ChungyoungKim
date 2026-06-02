import { Global, css } from '@emotion/react'

import { theme } from '@/shared/styles/theme'

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${theme.colors.background};
        }

        button,
        input {
          font: inherit;
        }
      `}
    />
  )
}
