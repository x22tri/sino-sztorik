import { useState, MouseEvent } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { TOP_NAV_TOOLTIP, TOP_NAV_ACCOUNT, TOP_NAV_LOGOUT } from '../../shared/strings'
import { faArrowRightFromBracket, faBars, faGear } from '@fortawesome/free-solid-svg-icons'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const settings = [
  // { icon: faGear, text: TOP_NAV_ACCOUNT },
  { icon: faArrowRightFromBracket, text: TOP_NAV_LOGOUT },
]

export function ProfileMenu() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const openMenu = (event: MouseEvent<HTMLElement>) => setAnchor(event.currentTarget)
  const closeMenu = () => setAnchor(null)

  return (
    <>
      <ToolbarButton icon={faBars} onClick={openMenu} tooltip={TOP_NAV_TOOLTIP} />

      <Menu
        anchorEl={anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        keepMounted
        onClose={closeMenu}
        open={!!anchor}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {settings.map(({ icon, text }) => (
          <MenuItem key={text} onClick={closeMenu} sx={{ gap: 1 }}>
            <FontAwesomeIcon {...{ icon }} />
            {text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
