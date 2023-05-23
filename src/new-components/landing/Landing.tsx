import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LogoTitle from '../shared/components/LogoTitle'
import { MainHeading } from './MainHeading'

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
        <Grid container padding={3} spacing={2} sx={{ ...containerStyles }}>
          <Grid xs={12} md={6}>
            <MainHeading />
          </Grid>

          <Grid xs={12} md={6}>
            <Demo />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

function Demo() {
  return <Box>aaaa</Box>
}
