import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { useLessonSelect } from '../logic/useLessonSelect'
import LogoTitle from './LogoTitle'
import ProfileMenu from './TopNav'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { LESSON_SELECT_TITLE } from '../../shared/strings'

export function LessonSelectAppbar() {
  const isSmallScreen = useSmallScreen()
  const { toggle } = useLessonSelect()
  const { constants } = useTheme()

  return (
    <AppBar color='inherit' elevation={0} position='relative' sx={{ boxShadow: constants.boxShadowLessonSelect }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', px: 2 }}>
        <When condition={isSmallScreen}>
          <ToolbarButton ariaLabel={LESSON_SELECT_TITLE} icon={faGraduationCap} onClick={toggle} tooltip={LESSON_SELECT_TITLE} />
        </When>

        <LogoTitle noLogo={isSmallScreen} />

        <ProfileMenu />
      </Toolbar>
    </AppBar>
  )
}
