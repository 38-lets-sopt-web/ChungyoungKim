import { createBrowserRouter, Navigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/routes'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { SignupPage } from '@/features/auth/pages/SignupPage'
import { MemberDetailPage } from '@/features/members/pages/MemberDetailPage'
import { MemberSearchPage } from '@/features/members/pages/MemberSearchPage'
import { ProfilePage } from '@/features/profile/pages/ProfilePage'

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.root,
    element: <Navigate to={ROUTE_PATHS.login} replace />,
  },
  {
    path: ROUTE_PATHS.login,
    Component: LoginPage,
  },
  {
    path: ROUTE_PATHS.signup,
    Component: SignupPage,
  },
  {
    path: ROUTE_PATHS.myProfile,
    Component: ProfilePage,
  },
  {
    path: ROUTE_PATHS.memberSearch,
    Component: MemberSearchPage,
  },
  {
    path: ROUTE_PATHS.memberDetail(':userId'),
    Component: MemberDetailPage,
  },
])
