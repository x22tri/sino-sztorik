import { AppBar, Toolbar } from '@mui/material'
import LogoTitle from '../shared/components/LogoTitle'

export function LandingAppbar() {
  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ m: 'auto', maxWidth: ({ constants }) => constants.maxContentWidth, width: 1 }}>
          <LogoTitle />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
