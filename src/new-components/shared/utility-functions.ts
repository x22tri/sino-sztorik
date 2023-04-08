import { useTheme } from '@mui/material'

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
