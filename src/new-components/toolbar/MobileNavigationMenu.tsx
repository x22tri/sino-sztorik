import { MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { SideNavigationItem } from '../shared/interfaces'
import MenuButton from './MenuButton'

export default function MobileNavigationMenu({
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
