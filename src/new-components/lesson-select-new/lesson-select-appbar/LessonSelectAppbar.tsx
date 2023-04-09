import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar, Toolbar, IconButton, useTheme } from '@mui/material'
import { Else, If, Then, When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { useLessonSelect } from '../logic/useLessonSelect'
import LogoTitle from './LogoTitle'
import ProfileMenu from './TopNav'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { LESSON_SELECT_TITLE } from '../../shared/strings'

export function LessonSelectAppbar() {
  const isSmallScreen = useSmallScreen()
  const { toggle } = useLessonSelect()
  const { spacing } = useTheme()

  return (
    <AppBar
      color='inherit'
      elevation={0}
      position='relative'
      sx={{
        borderBottomLeftRadius: isSmallScreen ? 0 : spacing(1),
        borderBottomRightRadius: isSmallScreen ? 0 : spacing(1),
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        mx: isSmallScreen ? 0 : 2,
        width: 'auto',
      }}
    >
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
