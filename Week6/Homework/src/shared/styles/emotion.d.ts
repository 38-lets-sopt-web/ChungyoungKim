import '@emotion/react'
import type { theme } from '@/shared/styles/theme'

type AppTheme = typeof theme

declare module '@emotion/react' {
  export interface Theme {
    colors: AppTheme['colors']
    spacing: AppTheme['spacing']
    radius: AppTheme['radius']
    shadow: AppTheme['shadow']
    typography: AppTheme['typography']
    layout: AppTheme['layout']
    size: AppTheme['size']
    aspectRatio: AppTheme['aspectRatio']
    breakpoint: AppTheme['breakpoint']
  }
}
