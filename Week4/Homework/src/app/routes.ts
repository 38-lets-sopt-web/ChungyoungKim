export const ROUTE_PATHS = {
  root: '/',
  login: '/login',
  signup: '/signup',
  mypage: '/mypage',
  myProfile: '/mypage/profile',
  memberSearch: '/mypage/members',
  memberDetail: (userId: number | string) => `/mypage/members/${userId}`,
} as const
