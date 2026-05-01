import styled from '@emotion/styled'

const HeaderContainer = styled.header`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.nav};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space[3]};
  width: ${({ theme }) => theme.layout.contentWidth};
  min-height: ${({ theme }) => theme.layout.navHeight};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.background.container};
  border-radius: ${({ theme }) => theme.radii.card};
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.subHeading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.compact};
  letter-spacing: ${({ theme }) => theme.letterSpacings.subHeading};
`

const TabList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[1]};
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: transparent;
`

const TabButton = styled.button`
  min-width: 72px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: 8px 18px 10px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.activeTab : 'transparent'};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.activeTab};
  box-shadow: inset 0 0 0 1px
    ${({ $isActive, theme }) => ($isActive ? 'transparent' : theme.colors.activeTab)};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
  line-height: ${({ theme }) => theme.lineHeights.body};
  letter-spacing: ${({ theme }) => theme.letterSpacings.body};
  transition:
    background-color ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    opacity ${({ theme }) => theme.transitions.base};

  &:hover {
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.62)};
  }
`

const AppHeader = ({ activeTabId, tabs, onTabChange }) => {
  return (
    <HeaderContainer>
      <Title>두더지 게임</Title>
      <TabList aria-label="화면 탭" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId

          return (
            <TabButton
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              $isActive={isActive}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </TabButton>
          )
        })}
      </TabList>
    </HeaderContainer>
  )
}

export default AppHeader
