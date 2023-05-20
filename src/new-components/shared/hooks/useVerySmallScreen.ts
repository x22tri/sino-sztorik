import { Theme, useMediaQuery } from '@mui/material'

export function useVerySmallScreen() {
  return useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'))
}
