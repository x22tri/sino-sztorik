import { Theme, useMediaQuery, useTheme } from '@mui/material'

export const useSmallScreen = () =>
  useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export function useNavButtonStyling() {
  const { palette } = useTheme()

  return {
    color: palette.grey[700],
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
