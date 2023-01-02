import { useEffect } from 'react'
import { Theme, useMediaQuery, useTheme } from '@mui/material'

export const useSmallScreen = () =>
  useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export function useNavButtonStyling() {
  const { constants, palette } = useTheme()

  return {
    transition: `${constants.animationDuration}ms`,
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: 'transparent',
        color: palette.grey[500],
        cursor: 'pointer',
      },
    },
    '&:active': {
      backgroundColor: 'transparent',
      color: palette.primary.main,
    },
  }
}

export default function useKeydown(
  handler: (event: KeyboardEvent) => void,
  capture = false,
  element = window
) {
  useEffect(() => {
    const isSupported = element && element.addEventListener

    if (!isSupported) {
      return
    }

    element.addEventListener('keydown', handler, { capture: capture })

    return () => {
      element.removeEventListener('keydown', handler, { capture: capture })
    }
  })
}
