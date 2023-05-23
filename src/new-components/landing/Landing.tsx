import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import LogoTitle from '../shared/components/LogoTitle'

export function Landing() {
  const { constants } = useTheme()

  const containerStyles = { margin: 'auto', maxWidth: constants.maxContentWidth, width: '100%' }

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'transparent' }}>
        <Toolbar sx={containerStyles}>
          <LogoTitle />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box bgcolor='primary.700' sx={{ backgroundImage: constants.synapsesBackground }}>
        <Grid container padding={3} sx={{ ...containerStyles }}>
          <Grid xs={12} md={6}>
            <Sting />
          </Grid>

          <Grid xs={12} md={6}>
            <Box>aaaa</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

function Sting() {
  return (
    <Box sx={{ margin: 'auto', textAlign: { xs: 'center', md: 'start' }, width: 'max-content' }}>
      <Typography component='h1' variant='h3' color='primary.contrastText'>
        Tanulj meg olvasni
      </Typography>
      <Typography component='h1' variant='h2' color='primary.contrastText'>
        kínaiul, kín nélkül
      </Typography>
    </Box>
  )
}
