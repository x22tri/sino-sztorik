import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar, Toolbar, IconButton, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { useLessonSelect } from '../logic/useLessonSelect'

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
        mx: isSmallScreen ? 0 : 2,
        borderBottomLeftRadius: isSmallScreen ? 0 : spacing(1),
        borderBottomRightRadius: isSmallScreen ? 0 : spacing(1),
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        width: 'auto',
      }}
    >
      <Toolbar disableGutters sx={{ px: 2 }}>
        <When condition={isSmallScreen}>
          <IconButton onClick={toggle}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </IconButton>
        </When>
      </Toolbar>
    </AppBar>
  )
}
