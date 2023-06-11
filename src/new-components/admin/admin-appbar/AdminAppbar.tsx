import { faChevronLeft, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { ADMIN_BACK_FROM_SUBMENU, ADMIN_CHARACTER_LIST, LESSON_SELECT_TITLE } from '../../shared/strings'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useStore } from '../../shared/logic/useStore'
import { ProfileMenu } from '../../lesson-select/appbar/ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LightenOnHoverButton } from '../../shared/components/LightenOnHoverButton'

export function AdminAppbar({
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
    <Box
      component='header'
      position='fixed'
      sx={{
        bgcolor: 'background.paper',
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        top: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        zIndex: 1,
      }}
    >
      <Toolbar
        disableGutters
        {...{ ref }}
        sx={{
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: `repeat(${isSmallScreen ? 3 : 2}, 1fr)`,
          px: { xs: 1, sm: 2 },
        }}
      >
        <LightenOnHoverButton
          color='neutral'
          startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-3' />}
          onClick={() => {}}
          variant='text'
          sx={{ justifyContent: 'flex-start' }}
        >
          {ADMIN_BACK_FROM_SUBMENU}
        </LightenOnHoverButton>

        <When condition={isSmallScreen}>
          <Button
            color='primary'
            onClick={toggleDrawer}
            variant='text'
            sx={{ m: 'auto', width: 'max-content', typography: 'titleSubtitle.subtitle' }}
          >
            {ADMIN_CHARACTER_LIST}
          </Button>
        </When>

        <Box marginLeft='auto'>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </Box>
  )
}
