import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Logo() {
  const { palette } = useTheme()

  const logoImage = require(`../../assets/logo.png`)

  return (
    <Box display='flex' flexGrow={1} alignItems='center'>
      <img src={logoImage} alt='' width='auto' height='28px' />

      <Typography
        className='disable-select'
        variant='h4'
        sx={{
          ml: 1.5,
          color: palette.primary.contrastText,
          display: { xs: 'none', md: 'block' },
        }}
      >
        Sino-sztorik
      </Typography>
    </Box>
  )
}

export default function AppbarWrapper() {
  const { palette } = useTheme()

  return (
    <Box justifyContent='center'>
      <AppBar position='static' sx={{ backgroundColor: palette.primary.dark }}>
        <Toolbar>
          <Logo />

          <Typography color='inherit' sx={{ mr: 1.5 }}>
            Szia, Péter!
          </Typography>

          <IconButton color='inherit' sx={{ p: 0 }}>
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
