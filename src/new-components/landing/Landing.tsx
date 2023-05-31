import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material'
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2'
import LogoTitle from '../shared/components/LogoTitle'
import { FirstSectionText } from './FirstSectionText'
import { InteractiveDemo } from './interactive-demo/InteractiveDemo'
import {
  LANDING_SECOND_SECTION_FIRST_PARAGRAPH,
  LANDING_SECOND_SECTION_SECOND_PARAGRAPH,
  LANDING_SECOND_SECTION_TITLE_FIRST_ROW,
  LANDING_SECOND_SECTION_TITLE_SECOND_ROW,
} from '../shared/strings'
import { ReactNode } from 'react'
import { SecondSectionText } from './SecondSectionText'

export function Landing() {
  const { constants, palette } = useTheme()

  const containerStyles = { margin: 'auto', maxWidth: constants.maxContentWidth, width: '100%' }

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={containerStyles}>
          <LogoTitle />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box bgcolor='primary.700' sx={{ backgroundImage: constants.synapsesBackground }}>
        <LandingGrid
          parentProps={containerStyles}
          demoChildContent={<InteractiveDemo />}
          demoChildProps={{ sx: { display: 'grid', gap: 4, gridTemplateRows: `4em minmax(21em, max-content) 4em` } }}
          textChildContent={<FirstSectionText />}
          textChildProps={{ sx: { color: 'primary.contrastText' } }}
        />
      </Box>

      <Box bgcolor='background.paper'>
        <LandingGrid
          parentProps={{ direction: { xs: 'column', md: 'row-reverse' }, ...containerStyles }}
          demoChildContent={<>sth</>}
          textChildContent={<SecondSectionText />}
          textChildProps={{ marginTop: 0 }}
        />
      </Box>
    </>
  )
}

function LandingGrid({
  demoChildContent,
  demoChildProps,
  parentProps,
  textChildContent,
  textChildProps,
}: {
  demoChildContent: ReactNode
  demoChildProps?: Grid2Props
  parentProps?: Grid2Props
  textChildContent: ReactNode
  textChildProps?: Grid2Props
}) {
  return (
    <Grid container rowGap={9} paddingX={3} paddingY={8} spacing={2} {...parentProps}>
      <Grid
        xs={12}
        md={6}
        margin='auto'
        marginTop={{ xs: 2, md: 8 }}
        textAlign={{ xs: 'center', md: 'start' }}
        {...textChildProps}
      >
        {textChildContent}
      </Grid>

      <Grid xs={12} md={6} {...demoChildProps}>
        {demoChildContent}
      </Grid>
    </Grid>
  )
}
