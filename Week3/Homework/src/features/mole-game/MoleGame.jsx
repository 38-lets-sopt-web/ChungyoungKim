import styled from '@emotion/styled'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import GameMessage from './components/GameMessage'
import GameStatus from './components/GameStatus'
import LevelSelector from './components/LevelSelector'
import ResultModal from './components/ResultModal'
import Panel from '../../shared/ui/Panel'
import useMoleGame from './hooks/useMoleGame'

const GameSection = styled.section`
  width: ${({ theme }) => theme.layout.contentWidth};
  margin: ${({ theme }) => theme.space[4]} auto 0;
`

const GameLayout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: ${({ theme }) => theme.space[3]};
  align-items: stretch;
`

const SidePanel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const BoardPanel = styled(Panel)`
  min-height: 620px;
  padding: ${({ theme }) => theme.space[3]};
`

const BoardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[3]};
`

const BoardFrame = styled(Panel)`
  width: 640px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[4]};
`

const MoleGame = () => {
  const {
    levelId,
    levelConfig,
    levels,
    gameState,
    isPlaying,
    isEnded,
    startGame,
    resetGame,
    changeLevel,
    handleCellClick,
  } = useMoleGame()

  return (
    <GameSection>
      <GameLayout>
        <SidePanel>
          <GameStatus
            timeLeft={gameState.timeLeft}
            score={gameState.score}
            successCount={gameState.successCount}
            failureCount={gameState.failureCount}
          />
          <GameMessage message={gameState.message} />
        </SidePanel>

        <BoardPanel>
          <BoardHeader>
            <LevelSelector
              levels={levels}
              selectedLevelId={levelId}
              disabled={isPlaying}
              onLevelChange={changeLevel}
            />
            <GameControls
              isPlaying={isPlaying}
              onStart={startGame}
              onStop={resetGame}
            />
          </BoardHeader>

          <BoardFrame>
            <GameBoard
              cells={gameState.cells}
              columns={levelConfig.columns}
              onCellClick={handleCellClick}
            />
          </BoardFrame>
        </BoardPanel>
      </GameLayout>

      <ResultModal
        isOpen={isEnded}
        result={gameState.result}
        onClose={resetGame}
      />
    </GameSection>
  )
}

export default MoleGame
