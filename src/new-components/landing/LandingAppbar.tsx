import { AppBar, Toolbar, useTheme } from '@mui/material'
import LogoTitle from '../shared/components/LogoTitle'

export function LandingAppbar() {
  const { palette } = useTheme()
  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}` }}>
        <Toolbar sx={{ m: 'auto', maxWidth: ({ constants }) => constants.maxContentWidth, width: 1 }}>
          <LogoTitle />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
