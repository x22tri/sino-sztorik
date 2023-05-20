import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import LogoTitle from '../../shared/components/LogoTitle'
import ProfileMenu from './TopNav'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { LESSON_SELECT_TITLE } from '../../shared/strings'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useStore } from '../../shared/logic/useStore'

export function LessonSelectAppbar({
  setToolbarHeight,
  toolbarHeight,
}: {
  setToolbarHeight: Dispatch<SetStateAction<number>>
  toolbarHeight: number
}) {
  const { constants } = useTheme()
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLDivElement | null>(null)
  const { toggleDrawer } = useStore('mobileDrawer')
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

  useEffect(() => {
    if (ref?.current) {
      resizeObserver.observe(ref?.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  })

  function handleToolbarResized() {
    if (ref?.current && ref?.current.offsetHeight !== toolbarHeight) {
      setToolbarHeight(ref?.current.offsetHeight)
    }
  }

  return (
    <Box
      // color='inherit'
      // elevation={0}
      position='fixed'
      sx={{
        bgcolor: 'background.paper',
        // contain: 'none !important',
        // transform: 'translateZ(0)',
        // willChange: 'auto',
        // transform: 'none !important',
        // width: '100%',
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        width: `calc(100% - ${drawerWidth}px)`,
        zIndex: 1,
        // gridArea: 'nav',
        top: 0,
        // left: 0,
        '&.MuiPaper-root': {
          // maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
          // width: `calc(100% - ${drawerWidth}px)`,
          // right: 'auto',
        },
      }}
    >
      <Toolbar disableGutters {...{ ref }} sx={{ justifyContent: 'space-between', px: 2 }}>
        <When condition={isSmallScreen}>
          <ToolbarButton icon={faGraduationCap} onClick={toggleDrawer} tooltip={LESSON_SELECT_TITLE} />
        </When>

        <LogoTitle />

        <ProfileMenu />
      </Toolbar>
    </Box>
  )
}
