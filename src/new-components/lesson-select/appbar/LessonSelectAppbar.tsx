import {
  faArrowRightFromBracket,
  faBookOpen,
  faGraduationCap,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import LogoTitle from '../../shared/components/LogoTitle'
import { AppbarButton } from './AppbarButton'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE, TOP_NAV_ACCOUNT, TOP_NAV_LOGOUT } from '../../shared/strings'

export function LessonSelectAppbar({ toggleDrawer }: { toggleDrawer: () => void }) {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}` }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            m: 'auto',
            maxWidth: constants.maxContentWidth,
            px: { xs: 1, sm: 2 },
            width: 1,
          }}
        >
          <When condition={isSmallScreen}>
            <ToolbarButton icon={faGraduationCap} onClick={toggleDrawer} tooltip={LESSON_SELECT_TITLE} />
          </When>

          <LogoTitle />

          <Box display='flex' gap={1.5}>
            {/* To-Do: Make into hamburger menu on mobile */}
            <AppbarButton icon={faBookOpen} text='Tanulás' />

            <AppbarButton disabled icon={faMagnifyingGlass} text='Kereső' />

            <AppbarButton disabled icon={faUser} text={TOP_NAV_ACCOUNT} />

            <AppbarButton icon={faArrowRightFromBracket} text={TOP_NAV_LOGOUT} />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
