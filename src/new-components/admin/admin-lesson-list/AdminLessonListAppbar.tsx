import { AppBar, Toolbar, useTheme } from '@mui/material'
import LogoTitle from '../../shared/components/LogoTitle'
import { AppbarButton } from '../../lesson-select/appbar/AppbarButton'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { TOP_NAV_LOGOUT } from '../../shared/strings'

export function AdminLessonListAppbar() {
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

          <AppbarButton icon={faArrowRightFromBracket} text={TOP_NAV_LOGOUT} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
