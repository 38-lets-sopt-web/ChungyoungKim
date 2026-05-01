import { css } from '@emotion/react'

const GlobalStyle = (theme) => css`
  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: ${theme.focus.width} ${theme.focus.style} currentColor;
    outline-offset: ${theme.focus.offset};
  }

  body {
    margin: 0;
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.page};
    font-family: ${theme.fontFamilies.sans};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.light};
    line-height: ${theme.lineHeights.default};
    letter-spacing: ${theme.letterSpacings.body};
    font-feature-settings: 'kern' 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
  }
`

export default GlobalStyle
