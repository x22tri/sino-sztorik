import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import LogoTitle from '../../shared/components/LogoTitle'
import { ProfileMenu } from './ProfileMenu'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { LESSON_SELECT_TITLE } from '../../shared/strings'

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

          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
