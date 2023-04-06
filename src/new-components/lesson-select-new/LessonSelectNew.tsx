import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { IconButton, useTheme } from '@mui/material'
import SelectionDrawer from './SelectionDrawer'
import { useSmallScreen } from '../shared/utility-functions'

export default function LessonSelectNew() {
  const { constants, zIndex } = useTheme()
  const isSmallScreen = useSmallScreen()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box display='flex'>
      <AppBar position='fixed' sx={{ zIndex: zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <SelectionDrawer {...{ mobileOpen, toggleDrawer }} />

      <Box
        component='main'
        display='grid'
        marginTop={constants.toolbarHeight}
        gap={1}
        gridTemplateColumns={isSmallScreen ? '1fr' : '3fr 1fr'}
        padding={3}
        width='100%'
      >
        <Box maxWidth={constants.maxContentWidth} margin='auto'>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
        <Box
        //   position='fixed'
        //   right={0}
        //   padding={3}
        //   top={constants.toolbarHeight}
        //   width='24vw'
        >
          aaaaaaaaaaaaaaa
        </Box>
      </Box>
    </Box>
  )
}
