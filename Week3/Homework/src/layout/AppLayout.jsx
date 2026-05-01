import styled from '@emotion/styled'

const AppShell = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[5]} ${({ theme }) => theme.space[3]}
    ${({ theme }) => theme.space[5]};
  background-color: ${({ theme }) => theme.colors.background.page};
`

const AppLayout = ({ header, children }) => {
  return (
    <AppShell>
      {header}
      {children}
    </AppShell>
  )
}

export default AppLayout
