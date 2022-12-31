import { MouseEvent, ReactNode, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import Container from '@mui/material/Container'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE } from '../shared/strings'
import Logo from './Logo'
import MobileNavigationMenu from './MobileNavigationMenu'
import DesktopNavigationMenu from './DesktopNavigationMenu'
import ProfileMenu from './ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../learn/useNavButtonStyling'

export function LessonSelectAppbar() {
  const username = 'Péter'

  const navigationItems = [LESSON_SELECT_TITLE, CHARACTER_SEARCH_TITLE] as const

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppbarWrapper>
      <Logo display={{ xs: 'none', md: 'flex' }} flexGrow={0} />

      <MobileNavigationMenu
        {...{
          anchorElNav,
          handleOpenNavMenu,
          handleCloseNavMenu,
          navigationItems,
        }}
      />

      <Logo display={{ xs: 'flex', md: 'none' }} flexGrow={1} />

      <DesktopNavigationMenu
        {...{
          handleOpenNavMenu,
          handleCloseNavMenu,
          navigationItems,
        }}
      />

      <ProfileMenu {...{ username }} />
    </AppbarWrapper>
  )
}

export function LearnAppbar({
  activeIndex,
  isLocked,
  lessonLength,
}: {
  activeIndex: number
  isLocked: boolean
  lessonLength: number
}) {
  const { constants } = useTheme()

  const navButtonStyling = useNavButtonStyling()

  const lessonProgress = (activeIndex / (lessonLength - 1)) * 100

  return (
    <AppbarWrapper>
      <Box whiteSpace='nowrap'>{'1. lecke'}</Box>
      <Box width='100%' sx={{ m: 1 }}>
        <LinearProgress
          variant='determinate'
          value={lessonProgress}
          color={isLocked ? 'neutral' : 'primary'}
          sx={{
            borderRadius: '8px',
            p: 0.5,
            mx: 'auto',
            maxWidth: constants.maxContentWidth,
          }}
        />
      </Box>
      {/* <Box>{'x'}</Box> */}
      <IconButton size='large' sx={{ ...navButtonStyling }}>
        <FontAwesomeIcon icon={faClose} />
      </IconButton>
    </AppbarWrapper>
  )
}

function AppbarWrapper({ children }: { children: ReactNode }) {
  const { breakpoints, constants, palette } = useTheme()

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        backgroundColor: palette.background.default,
        color: 'black',
        // borderBottom: `2px solid ${palette.grey[300]}`,
      }}
    >
      <Container disableGutters maxWidth='lg'>
        <Toolbar
          variant='dense'
          disableGutters={useMediaQuery(breakpoints.down('md'))}
          // sx={{ maxWidth: constants.maxContentWidth }}
        >
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
