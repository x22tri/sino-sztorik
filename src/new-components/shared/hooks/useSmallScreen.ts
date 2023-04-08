import { Theme, useMediaQuery } from '@mui/material'

export function useSmallScreen() {
  return useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))
}
