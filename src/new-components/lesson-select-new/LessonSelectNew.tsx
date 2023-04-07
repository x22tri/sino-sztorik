import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import LessonPicker from './lesson-picker-column/LessonPicker'
import {
  LessonStartDesktop,
  LessonStartMobile,
} from './lesson-start/LessonStart'
import LessonPrefaceColumn from './lesson-preface-column/LessonPrefaceColumn'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { If, Then, Else } from 'react-if'

export default function LessonSelectNew() {
  const { breakpoints, constants, zIndex } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLargeScreen = useMediaQuery(breakpoints.up('lg'))

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

      <Box component='main' marginTop={constants.toolbarHeight} width='100%'>
        <If condition={isLargeScreen}>
          <Then>
            <LessonSelectDesktop />
          </Then>
          <Else>
            <LessonSelectMobile />
          </Else>
        </If>
      </Box>
    </Box>
  )
}

function LessonSelectDesktop() {
  return (
    <Box display='grid' gap={1} gridTemplateColumns='3fr 1fr' padding={3}>
      <LessonPrefaceColumn />
      <LessonStartDesktop lesson={LESSONS[1]} />
    </Box>
  )
}

function LessonSelectMobile() {
  const { constants } = useTheme()
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      minHeight={`calc(100vh - ${constants.toolbarHeight})`}
    >
      <Box padding={3}>
        <LessonPrefaceColumn />
      </Box>
      <LessonStartMobile />
    </Box>
  )
}
