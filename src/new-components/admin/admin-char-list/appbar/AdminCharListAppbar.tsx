import { AppBar, Toolbar, useTheme } from '@mui/material'
import LogoTitle from '../../../shared/components/LogoTitle'
import { ProfileMenu } from '../../../lesson-select/appbar/ProfileMenu'

export function AdminCharListAppbar() {
  const { constants, palette } = useTheme()

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}` }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            m: 'auto',
            maxWidth: constants.maxContentWidth,
            px: { xs: 1, sm: 2 },
            width: 1,
          }}
        >
          <LogoTitle />

          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
