import { ThemeProvider } from '@emotion/react'
import { RouterProvider } from 'react-router/dom'

import { router } from '@/app/router'
import { GlobalStyle } from '@/shared/styles/GlobalStyle'
import { theme } from '@/shared/styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
