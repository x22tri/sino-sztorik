import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2'
import { ReactNode } from 'react'

export function LandingGrid({
  demoContent,
  demoProps,
  parentProps,
  textContent,
  textProps,
}: {
  demoContent: ReactNode
  demoProps?: Grid2Props
  parentProps?: Grid2Props
  textContent: ReactNode
  textProps?: Grid2Props
}) {
  return (
    <Grid container paddingX={3} paddingY={8} spacing={2} alignItems='center' {...parentProps}>
      <Grid xs={12} md={6} {...textProps}>
        {textContent}
      </Grid>

      <Grid xs={12} md={6} {...demoProps}>
        {demoContent}
      </Grid>
    </Grid>
  )
}
