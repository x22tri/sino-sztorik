import { faArrowRightFromBracket, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { ADMIN_CHARACTER_LIST, TOP_NAV_LOGOUT } from '../../shared/strings'
import { AppbarButton } from '../../lesson-select/appbar/AppbarButton'
import LogoTitle from '../../shared/components/LogoTitle'

export function AdminAppbar({ toggleDrawer }: { toggleDrawer: () => void }) {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()

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
          <When condition={isSmallScreen}>
            <ToolbarButton icon={faLanguage} onClick={toggleDrawer} tooltip={ADMIN_CHARACTER_LIST} />
          </When>

          <LogoTitle />

          <AppbarButton icon={faArrowRightFromBracket} text={TOP_NAV_LOGOUT} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
