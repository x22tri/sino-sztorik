import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import { IconButton, useTheme } from '@mui/material'
import LessonPicker from './lesson-picker-column/LessonPicker'
import {
  LessonStartDesktop,
  LessonStartMobile,
} from './lesson-start/LessonStart'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { If, Then, Else, When } from 'react-if'
import { useLargeScreen, useSmallScreen } from '../shared/utility-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { LessonStatuses } from '../shared/interfaces'
import 'swiper/css'
import { LessonDetailsSwiper } from '../lesson-select/LessonDetailsSwiper'

export default function LessonSelectNew() {
  const { constants } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const upcomingLessonNumber = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!upcomingLessonNumber) {
    throw new Error('Current lesson is undefined.')
  }

  const [selectedLessonNumber, setSelectedLessonNumber] =
    useState(upcomingLessonNumber)

  const lessonDetailsSwiperProps = {
    lessons: LESSONS,
    selectedLessonNumber: selectedLessonNumber!,
    setSelectedLessonNumber,
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      margin='auto'
      maxWidth={constants.lessonSelectPageMaxWidth}
      minHeight='100vh'
      position='relative'
    >
      <LessonPicker {...{ mobileOpen, toggleDrawer }} />

      <Box
        marginLeft={isSmallScreen ? 0 : `${constants.drawerWidth}px`}
        width={
          isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px)`
        }
      >
        <AppBar
          color='inherit'
          elevation={0}
          position='relative'
          sx={{
            mx: isSmallScreen ? 0 : 2,
            borderBottomLeftRadius: isSmallScreen ? 0 : '8px',
            borderBottomRightRadius: isSmallScreen ? 0 : '8px',
            boxShadow:
              'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            width: 'auto',
          }}
        >
          <Toolbar disableGutters sx={{ px: 1 }}>
            <When condition={isSmallScreen}>
              <IconButton onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </IconButton>
            </When>
          </Toolbar>
        </AppBar>

        <Box
          component='main'
          height={`calc(100% - ${constants.toolbarHeight})`}
          width='100%'
        >
          <If condition={isLargeScreen}>
            <Then>
              <Box
                display='grid'
                gridTemplateColumns='3fr 1fr'
                height='100%'
                justifyItems='center'
              >
                <LessonDetailsSwiper {...lessonDetailsSwiperProps} />
                <LessonStartDesktop lesson={LESSONS[1]} />
              </Box>
            </Then>
            <Else>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                height='100%'
                width='100%'
              >
                <LessonDetailsSwiper {...lessonDetailsSwiperProps} />
                <LessonStartMobile />
              </Box>
            </Else>
          </If>
        </Box>
      </Box>
    </Box>
  )
}
