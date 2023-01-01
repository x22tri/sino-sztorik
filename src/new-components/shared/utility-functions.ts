import { Theme, useMediaQuery } from '@mui/material'

export const useSmallScreen = () =>
  useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
