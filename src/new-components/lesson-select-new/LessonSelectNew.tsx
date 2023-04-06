import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { IconButton, useTheme } from '@mui/material'
import LessonPicker from './lesson-picker-column/LessonPicker'
import LessonStartColumn from './lesson-start-column/LessonStartColumn'

export default function LessonSelectNew() {
  const { constants, zIndex } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box display='flex' maxWidth='1600px' justifyContent='center' margin='auto'>
      <AppBar position='fixed' sx={{ zIndex: zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            color='inherit'
            edge='start'
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <LessonPicker {...{ mobileOpen, toggleDrawer }} />

      <Box
        component='main'
        display='grid'
        gap={1}
        marginTop={constants.toolbarHeight}
        padding={3}
        width='100%'
        sx={{ gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' } }}
      >
        <Box maxWidth={constants.maxContentWidth} margin='0 auto'>
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
        <LessonStartColumn />
      </Box>
    </Box>
  )
}
