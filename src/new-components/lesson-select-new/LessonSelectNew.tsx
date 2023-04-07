import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { IconButton, useTheme } from '@mui/material'
import LessonPicker from './lesson-picker-column/LessonPicker'
import {
  LessonStartDesktop,
  LessonStartMobile,
} from './lesson-start/LessonStart'
import LessonPrefaceColumn from './lesson-preface-column/LessonPrefaceColumn'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { If, Then, Else, When } from 'react-if'
import { useLargeScreen, useSmallScreen } from '../shared/utility-functions'

export default function LessonSelectNew() {
  const { constants, zIndex } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      margin='auto'
      maxWidth={constants.lessonSelectPageMaxWidth}
    >
      <AppBar position='fixed' sx={{ zIndex: zIndex.drawer + 1 }}>
        <Box
          margin='auto'
          maxWidth={constants.lessonSelectPageMaxWidth}
          width='100%'
        >
          <Toolbar>
            <When condition={isSmallScreen}>
              <IconButton
                color='inherit'
                edge='start'
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </When>

            <Typography variant='h6' noWrap component='div'>
              Clipped drawer
            </Typography>
          </Toolbar>
        </Box>
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
    <Box display='grid' gap={2} gridTemplateColumns='3fr 1fr' padding={3}>
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
