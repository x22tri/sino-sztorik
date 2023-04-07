import { useEffect, useRef } from 'react'
import { Theme, useMediaQuery, useTheme } from '@mui/material'

export const useSmallScreen = () =>
  useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))

export const useLargeScreen = () =>
  !useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('lg'))

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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

export function useKeydown(actionArray: { on: string; do: () => void }[]) {
  const handler = ({ key }: KeyboardEvent) => {
    actionArray.forEach(action => {
      if (key === action.on && action.do) {
        action.do()
      }
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  })
}

export function useOnChange<T>(value: T, effect: (prev: T, next: T) => void) {
  const latestValue = useRef(value)
  const callback = useRef(effect)
  callback.current = effect

  useEffect(
    function onChange() {
      if (value !== latestValue.current) {
        callback.current(latestValue.current, value)
      }
    },
    [value]
  )
}
