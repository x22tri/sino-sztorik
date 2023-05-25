import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LogoTitle from '../shared/components/LogoTitle'
import { MainHeading } from './MainHeading'
import { InteractiveDemo } from './interactive-demo/InteractiveDemo'

export function Landing() {
  const { constants } = useTheme()

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
        <Grid container rowGap={9} padding={3} spacing={2} sx={{ ...containerStyles }}>
          <Grid
            xs={12}
            md={6}
            component='h1'
            sx={{ color: 'primary.contrastText', m: 'auto', mt: 8, textAlign: { xs: 'center', md: 'start' } }}
          >
            <MainHeading />
          </Grid>

          <Grid xs={12} md={6} sx={{ display: 'grid', gap: 4, gridTemplateRows: '4em 21em 4em' }}>
            <InteractiveDemo />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
