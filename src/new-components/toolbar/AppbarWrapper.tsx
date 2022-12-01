import React, { MouseEvent, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery, useTheme } from '@mui/material'
import {
  faBars,
  faBook,
  faMagnifyingGlass,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import {
  CHARACTER_SEARCH_TITLE,
  CHARACTER_SEARCH_TOOLTIP,
  LESSON_SELECT_TITLE,
  LESSON_SELECT_TOOLTIP,
  MOBILE_NAVIGATION_ARIA_LABEL,
  MOBILE_NAVIGATION_TOOLTIP,
  USER_SETTINGS_ARIA_LABEL,
  USER_SETTINGS_TOOLTIP,
  USER_SETTING_ACCOUNT,
  USER_SETTING_LOGOUT,
} from '../shared/strings'
import { SideNavigationItem } from '../shared/interfaces'

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
          <Logo position='left' />

          <MobileNavigationMenu
            {...{
              anchorElNav,
              handleOpenNavMenu,
              handleCloseNavMenu,
              navigationItems,
            }}
          />

          <Logo position='center' />

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

function Logo({ position }: { position: 'left' | 'center' }) {
  const { palette } = useTheme()

  const logoImage = require(`../../assets/logo.png`)

  const display =
    position === 'left'
      ? { xs: 'none', md: 'flex' }
      : { xs: 'flex', md: 'none' }

  const flexGrow = position === 'left' ? 0 : 1

  return (
    <Box {...{ flexGrow }} sx={{ display: display, mr: 1 }}>
      <img src={logoImage} alt='' width='auto' height='28px' />

      <Typography
        className='disable-select'
        variant='h4'
        noWrap
        component='a'
        href='/'
        sx={{
          ml: 1.5,
          color: palette.primary.contrastText,
          textDecoration: 'none',
        }}
      >
        Sino-sztorik
      </Typography>
    </Box>
  )
}

function MobileNavigationMenu({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  navigationItems,
}: {
  anchorElNav: HTMLElement | null
  handleOpenNavMenu: (event: MouseEvent<HTMLElement>) => void
  handleCloseNavMenu: () => void
  navigationItems: readonly SideNavigationItem[]
}) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <MenuButton onClick={handleOpenNavMenu} />
      <Menu
        id='menu-appbar'
        anchorEl={anchorElNav}
        keepMounted
        open={!!anchorElNav}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {navigationItems.map(item => (
          <MenuItem key={item} onClick={handleCloseNavMenu}>
            <Typography textAlign='center'>{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

function MenuButton({
  onClick,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
}) {
  return (
    <ToolbarButton
      ariaLabel={MOBILE_NAVIGATION_ARIA_LABEL}
      icon={faBars}
      tooltip={MOBILE_NAVIGATION_TOOLTIP}
      {...{ onClick }}
    />
  )
}

function DesktopNavigationMenu({
  handleCloseNavMenu,
  navigationItems,
}: {
  handleCloseNavMenu: () => void
  navigationItems: readonly SideNavigationItem[]
}) {
  const { palette } = useTheme()

  const icons: { [key in SideNavigationItem]: IconDefinition } = {
    [LESSON_SELECT_TITLE]: faBook,
    [CHARACTER_SEARCH_TITLE]: faMagnifyingGlass,
  }

  const tooltips: { [key in SideNavigationItem]: string } = {
    [LESSON_SELECT_TITLE]: LESSON_SELECT_TOOLTIP,
    [CHARACTER_SEARCH_TITLE]: CHARACTER_SEARCH_TOOLTIP,
  }

  return (
    <Box
      sx={{ ml: 3, gap: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
    >
      {navigationItems.map(item => (
        <Tooltip title={tooltips[item]} key={item} sx={{ flexWrap: 'nowrap' }}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ color: palette.primary.contrastText }}
            startIcon={<FontAwesomeIcon icon={icons[item]} />}
          >
            <Typography component='span' variant='h6' textTransform='none'>
              {item}
            </Typography>
          </Button>
        </Tooltip>
      ))}
    </Box>
  )
}

function ProfileMenu({ username }: { username: string }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const profileSettings = [USER_SETTING_ACCOUNT, USER_SETTING_LOGOUT]

  return (
    <Box sx={{ flexGrow: 0 }}>
      <ProfileButton onClick={handleOpenUserMenu} {...{ username }} />
      <Menu
        sx={{ mt: '28px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorElUser}
        onClose={handleCloseUserMenu}
      >
        {profileSettings.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

function ProfileButton({
  onClick,
  username,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
  username: string
}) {
  const { breakpoints } = useTheme()

  const profileText = useMediaQuery(breakpoints.down('md'))
    ? username
    : `Szia, ${username}!`

  return (
    <Box display='flex' alignItems='center'>
      <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
        {profileText}
      </Typography>

      <ToolbarButton
        ariaLabel={USER_SETTINGS_ARIA_LABEL}
        icon={faUser}
        tooltip={USER_SETTINGS_TOOLTIP}
        {...{ onClick }}
      />
    </Box>
  )
}

function ToolbarButton({
  ariaLabel,
  icon,
  tooltip,
  onClick,
}: {
  ariaLabel?: string
  icon: IconDefinition
  tooltip: string
  onClick: (event: MouseEvent<HTMLElement>) => any
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        aria-label={ariaLabel}
        aria-controls='menu-appbar'
        aria-haspopup='true'
        color='inherit'
        {...{ onClick }}
        sx={{ mx: 1 }}
      >
        <FontAwesomeIcon {...{ icon }} />
      </IconButton>
    </Tooltip>
  )
}
