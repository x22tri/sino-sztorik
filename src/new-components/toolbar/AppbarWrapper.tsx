import { MouseEvent, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useMediaQuery, useTheme } from '@mui/material'
import Container from '@mui/material/Container'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE } from '../shared/strings'
import Logo from './Logo'
import MobileNavigationMenu from './MobileNavigationMenu'
import DesktopNavigationMenu from './DesktopNavigationMenu'
import ProfileMenu from './ProfileMenu'

export default function AppbarWrapper() {
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
    <AppBar position='static' sx={{ backgroundColor: palette.primary.dark }}>
      <Container disableGutters maxWidth='lg'>
        <Toolbar
          variant='dense'
          disableGutters={useMediaQuery(breakpoints.down('md'))}
        >
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
