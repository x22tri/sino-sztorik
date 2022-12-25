import { useTheme } from '@mui/material'

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
