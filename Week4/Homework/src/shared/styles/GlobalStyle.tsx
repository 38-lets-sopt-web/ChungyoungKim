import { Global, css } from '@emotion/react'

export function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        html {
          font-family:
            Inter,
            Pretendard,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
          color: #1f2933;
          background: #f6f8fb;
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
      `}
    />
  )
}
