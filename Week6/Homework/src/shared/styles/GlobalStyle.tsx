import { Global, css } from '@emotion/react'

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
          background: #f6f3ee;
        }

        button,
        input {
          font: inherit;
        }
      `}
    />
  )
}
