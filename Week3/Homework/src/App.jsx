import { useState } from 'react'
import AppHeader from './layout/AppHeader'
import AppLayout from './layout/AppLayout'
import { TAB_IDS, TABS } from './tabs'
import MoleGame from './features/mole-game/MoleGame'
import RankingPage from './features/ranking/RankingPage'

function App() {
  const [activeTabId, setActiveTabId] = useState(TAB_IDS.GAME)

  const isRankingTab = activeTabId === TAB_IDS.RANKING

  return (
    <AppLayout
      header={
        <AppHeader
          activeTabId={activeTabId}
          tabs={TABS}
          onTabChange={setActiveTabId}
        />
      }
    >
      {isRankingTab ? <RankingPage /> : <MoleGame />}
    </AppLayout>
  )
}

export default App
