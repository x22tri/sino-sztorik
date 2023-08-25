import { faChevronLeft, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { ADMIN_BACK_FROM_SUBMENU, ADMIN_BACK_FROM_SUBMENU_SHORT, ADMIN_CHARACTER_LIST } from '../../shared/strings'
import { ProfileMenu } from '../../lesson-select/appbar/ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LightenOnHoverButton } from '../../shared/components/LightenOnHoverButton'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export function AdminAppbar({
  setToolbarHeight,
  toolbarHeight,
  toggleDrawer,
}: {
  setToolbarHeight: Dispatch<SetStateAction<number>>
  toolbarHeight: number
  toggleDrawer: () => void
}) {
  const { constants } = useTheme()
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLDivElement | null>(null)
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
      <AppBar elevation={0} sx={{ bgcolor: 'background.default' }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'grid',
            justifyContent: 'space-between',
            gridTemplateColumns: `repeat(3, minmax(max-content, 1fr))`,
            m: 'auto',
            maxWidth: constants.maxContentWidth,
            px: { xs: 1, sm: 2 },
            width: 1,
          }}
          {...{ ref }}
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

          <Box alignItems='center' display='flex' color='text.primary' gap={0.5} marginX='auto'>
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
      </AppBar>
      <Toolbar />
    </>
  )
}
