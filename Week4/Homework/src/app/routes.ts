export const ROUTE_PATHS = {
  root: '/',
  login: '/login',
  signup: '/signup',
  myProfile: '/mypage/profile',
  memberSearch: '/mypage/members',
  memberDetail: (userId: number | string) => `/mypage/members/${userId}`,
} as const
