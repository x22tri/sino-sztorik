import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import LogoTitle from '../shared/components/LogoTitle'

export function Landing() {
  const { constants } = useTheme()

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'transparent' }}>
        <Toolbar
          sx={{
            margin: 'auto',
            maxWidth: constants.maxContentWidth,
            width: '100%',
          }}
        >
          <LogoTitle />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box bgcolor='red'>aaaa aaaaaaa aaaaaaa</Box>
    </>
  )
}
