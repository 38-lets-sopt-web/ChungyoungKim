export const API_ENDPOINTS = {
  signup: '/api/v1/auth/signup',
  signin: '/api/v1/auth/signin',
  users: '/api/v1/users',
  user: (userId: number | string) => `/api/v1/users/${userId}`,
} as const
