import { useMediaQuery } from '@mui/material'
import { Theme } from '@material-ui/core'

export function useStoryHorizontalPadding() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) ? 1 : 2
}
