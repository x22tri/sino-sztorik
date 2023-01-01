import { Theme, useMediaQuery } from '@mui/material'

export const useSmallScreen = () =>
  useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))
