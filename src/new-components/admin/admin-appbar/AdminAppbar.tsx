import { faChevronLeft, faGraduationCap, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Box, Button, Toolbar, Typography, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import ToolbarButton from '../../shared/components/ToolbarButton'
import {
  ADMIN_BACK_FROM_SUBMENU,
  ADMIN_BACK_FROM_SUBMENU_SHORT,
  ADMIN_CHARACTER_LIST,
  LESSON_SELECT_TITLE,
} from '../../shared/strings'
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
    <>
      <Box
        component='header'
        position='fixed'
        sx={{
          bgcolor: 'background.paper',
          maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
          top: 0,
          width: `calc(100% - ${drawerWidth}px)`,
          zIndex: 1100,
        }}
      >
        <Toolbar
          disableGutters
          {...{ ref }}
          sx={{
            display: 'grid',
            justifyContent: 'space-between',
            gridTemplateColumns: `repeat(3, minmax(max-content, 1fr))`,
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
            {isSmallScreen ? ADMIN_BACK_FROM_SUBMENU_SHORT : ADMIN_BACK_FROM_SUBMENU}
          </LightenOnHoverButton>
          {/* <When condition={isSmallScreen}>
            <Button
              color='primary'
              onClick={toggleDrawer}
              variant='text'
              sx={{ m: 'auto', width: 'max-content', typography: 'titleSubtitle.subtitle' }}
            >
              {ADMIN_CHARACTER_LIST}
            </Button>
          </When> */}
          <Box alignItems='center' display='flex' gap={0.5} marginX='auto'>
            <Typography component='span' variant='h6' fontWeight='bold'>
              Szerkesztés:
            </Typography>

            <Typography component='span' variant='chineseText' fontSize={20} fontWeight='bold' mb={0.5}>
              早
            </Typography>
          </Box>

          <Box display='flex' gap={1} marginLeft='auto'>
            <When condition={isSmallScreen}>
              <ToolbarButton icon={faLanguage} onClick={toggleDrawer} tooltip={ADMIN_CHARACTER_LIST} />
            </When>

            <ProfileMenu />
          </Box>
        </Toolbar>
      </Box>
      <Toolbar />
    </>
  )
}
