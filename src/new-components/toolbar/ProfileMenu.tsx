import { useState, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { USER_SETTING_ACCOUNT, USER_SETTING_LOGOUT } from '../shared/strings'
import ProfileButton from './ProfileButton'

export default function ProfileMenu({ username }: { username: string }) {
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
