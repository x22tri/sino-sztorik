import { Theme, useMediaQuery } from '@mui/material'

export function useLargeScreen() {
  return !useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('lg'))
}
