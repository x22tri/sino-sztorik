import { MouseEvent, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {
  CHARACTER_SEARCH_TITLE,
  LESSON_SELECT_TITLE,
} from '../../shared/strings'
import LogoTitle from './LogoTitle'
import MobileNavigationMenu from './MobileNavigationMenu'
import DesktopNavigationMenu from './DesktopNavigationMenu'
import ProfileMenu from './ProfileMenu'
import { useSmallScreen } from '../../shared/utility-functions'
import { When } from 'react-if'

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

  const isSmallScreen = useSmallScreen()

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant='dense' disableGutters sx={{ mx: 1 }}>
        <When condition={!isSmallScreen}>
          <LogoTitle />
        </When>

        <MobileNavigationMenu
          {...{
            anchorElNav,
            handleOpenNavMenu,
            handleCloseNavMenu,
            navigationItems,
          }}
        />

        <When condition={isSmallScreen}>
          <LogoTitle noLogo />
        </When>

        <DesktopNavigationMenu
          {...{
            handleOpenNavMenu,
            handleCloseNavMenu,
            navigationItems,
          }}
        />

        <ProfileMenu {...{ username }} />
      </Toolbar>
    </AppBar>
  )
}
