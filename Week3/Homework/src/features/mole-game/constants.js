export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  ENDED: 'ended',
}

export const CELL_STATUS = {
  HOLE: 'hole',
  MOLE: 'mole',
  BOMB: 'bomb',
  HIT: 'hit',
  MISS: 'miss',
}

export const LEVEL_CONFIG = {
  level1: {
    id: 'level1',
    label: 'Level 1',
    rows: 2,
    columns: 2,
    durationSeconds: 15,
    visibleMilliseconds: 1000,
  },
  level2: {
    id: 'level2',
    label: 'Level 2',
    rows: 3,
    columns: 3,
    durationSeconds: 20,
    visibleMilliseconds: 850,
  },
  level3: {
    id: 'level3',
    label: 'Level 3',
    rows: 4,
    columns: 4,
    durationSeconds: 30,
    visibleMilliseconds: 750,
  },
}

export const DEFAULT_LEVEL_ID = LEVEL_CONFIG.level1.id

export const FEEDBACK_VISIBLE_MS = 700

export const GAME_TIMER_INTERVAL_MS = 1000

export const TIME_LEFT_DECREASE_SECONDS = 1

export const MIN_RANKING_SCORE = 1

export const MOLE_SPAWN_PROBABILITY = 0.65

export const SCORE_CHANGE = {
  MOLE: 1,
  BOMB: -1,
}

export const GAME_MESSAGES = {
  READY: '레벨을 선택하고 게임을 시작하세요.',
  PLAYING: '랜덤하게 열린 두더지 또는 폭탄을 클릭하세요.',
  SUCCESS: '성공! 두더지를 잡았습니다.',
  FAILURE: '실패! 폭탄을 눌렀습니다.',
  FINISHED: '게임이 종료되었습니다.',
}
