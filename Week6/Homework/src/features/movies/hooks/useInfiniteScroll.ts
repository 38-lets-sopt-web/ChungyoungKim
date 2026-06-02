import { useEffect, useRef } from 'react'

import { theme } from '@/shared/styles/theme'

interface UseInfiniteScrollParams {
  enabled: boolean
  onIntersect: () => void
}

export function useInfiniteScroll({
  enabled,
  onIntersect,
}: UseInfiniteScrollParams) {
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = targetRef.current

    if (target === null || !enabled) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isTargetVisible = entry?.isIntersecting === true

        if (isTargetVisible) {
          onIntersect()
        }
      },
      {
        rootMargin: theme.layout.infiniteScrollRootMargin,
      },
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [enabled, onIntersect])

  return targetRef
}
