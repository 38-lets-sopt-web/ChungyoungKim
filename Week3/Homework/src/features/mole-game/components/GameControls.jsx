import { memo } from 'react'
import styled from '@emotion/styled'
import Button from '../../../shared/ui/Button'

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[1]};
`

const GameControls = ({ isPlaying, onStart, onStop }) => {
  return (
    <Controls>
      <Button type="button" onClick={onStart} disabled={isPlaying}>
        시작
      </Button>
      <Button
        type="button"
        $variant="danger"
        onClick={onStop}
        disabled={!isPlaying}
      >
        중단
      </Button>
    </Controls>
  )
}

export default memo(GameControls)
