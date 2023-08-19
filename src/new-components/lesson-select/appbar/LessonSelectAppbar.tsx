import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import LogoTitle from '../../shared/components/LogoTitle'
import { ProfileMenu } from './ProfileMenu'
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
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLDivElement | null>(null)
  const { toggleDrawer } = useStore('mobileDrawer')
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

  useEffect(() => {
    if (ref?.current) {
      resizeObserver.observe(ref.current)
    }

    return () => resizeObserver.disconnect()
  })

  function handleToolbarResized() {
    if (ref?.current && ref.current.offsetHeight !== toolbarHeight) {
      setToolbarHeight(ref.current.offsetHeight)
    }
  }

  return (
    // <Box
    //   component='header'
    //   position='fixed'
    //   sx={{
    //     bgcolor: 'background.paper',
    //     // maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
    //     top: 0,
    //     // width: `calc(100% - ${drawerWidth}px)`,
    //     zIndex: 1,
    //   }}
    // >
    <>
      <AppBar
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          // borderBottom: `1px solid ${palette.grey[200]}`
        }}
        position='fixed'
      >
        <Toolbar
          disableGutters
          {...{ ref }}
          sx={{
            justifyContent: 'space-between',
            m: 'auto',
            width: 1,
            maxWidth: constants.maxContentWidth,
            px: { xs: 1, sm: 2 },
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
    // </Box>
  )
}
