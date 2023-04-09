import { useState, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { TOP_NAV_ARIA_LABEL, TOP_NAV_TOOLTIP, TOP_NAV_ACCOUNT, TOP_NAV_LOGOUT } from '../../shared/strings'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ToolbarButton from '../../shared/components/ToolbarButton'

const settings = [TOP_NAV_ACCOUNT, TOP_NAV_LOGOUT]

export default function TopNav() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)
  const closeMenu = () => setAnchor(null)

  return (
    <Box sx={{ flexGrow: 0 }}>
      <ToolbarButton ariaLabel={TOP_NAV_ARIA_LABEL} icon={faBars} onClick={openMenu} tooltip={TOP_NAV_TOOLTIP} />

      <Menu
        anchorEl={anchor}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        id='menu-appbar'
        keepMounted
        onClose={closeMenu}
        open={!!anchor}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {settings.map(setting => (
          <MenuItem key={setting} onClick={closeMenu}>
            {setting}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
