import { css } from '@emotion/react'

export const pageShellStyle = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 3.2rem 2rem;

  h1 {
    margin: 0;
    font-size: 3.2rem;
    line-height: 1.2;
  }

  a {
    border-radius: 0.8rem;
    background: #1f2933;
    color: #ffffff;
    padding: 1.2rem 1.6rem;
    font-weight: 700;
  }
`
