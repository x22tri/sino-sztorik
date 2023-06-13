import { faChevronLeft, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { Box, Toolbar, Typography, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { ADMIN_BACK_FROM_SUBMENU, ADMIN_BACK_FROM_SUBMENU_SHORT, ADMIN_CHARACTER_LIST } from '../../shared/strings'
import { useStore } from '../../shared/logic/useStore'
import { ProfileMenu } from '../../lesson-select/appbar/ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LightenOnHoverButton } from '../../shared/components/LightenOnHoverButton'

export function AdminAppbar({}: {}) {
  const { constants } = useTheme()
  const { toggleDrawer } = useStore('mobileDrawer')
  const isSmallScreen = useSmallScreen()
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

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
