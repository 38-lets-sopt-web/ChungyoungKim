import type { ReactNode } from 'react'

import { pageShellStyle } from '@/shared/styles/pageShellStyle'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return <main css={pageShellStyle}>{children}</main>
}
