import { MouseEvent, ReactNode, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { useMediaQuery, useTheme } from '@mui/material'
import Container from '@mui/material/Container'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE } from '../shared/strings'
import Logo from './Logo'
import MobileNavigationMenu from './MobileNavigationMenu'
import DesktopNavigationMenu from './DesktopNavigationMenu'
import ProfileMenu from './ProfileMenu'

export function LessonSelectAppbar() {
  const { breakpoints, palette } = useTheme()

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
  lessonLength,
}: {
  activeIndex: number
  lessonLength: number
}) {
  const lessonProgress = (activeIndex / (lessonLength - 1)) * 100

  return (
    <AppbarWrapper>
      <Box>{'<-'}</Box>
      <Box width='100%' sx={{ m: 1 }}>
        <LinearProgress
          variant='determinate'
          value={lessonProgress}
          color='secondary'
          sx={{
            borderRadius: '8px',
            p: 0.5,
            mx: 'auto',
            maxWidth: ({ constants }) => constants.maxContentWidth,
          }}
        />
      </Box>
      <Box>{'x'}</Box>
    </AppbarWrapper>
  )
}

function AppbarWrapper({ children }: { children: ReactNode }) {
  const { breakpoints, palette } = useTheme()
  return (
    <AppBar position='static' sx={{ backgroundColor: palette.primary.dark }}>
      <Container disableGutters maxWidth='lg'>
        <Toolbar
          variant='dense'
          disableGutters={useMediaQuery(breakpoints.down('md'))}
        >
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
