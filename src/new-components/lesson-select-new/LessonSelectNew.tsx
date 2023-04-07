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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { LessonStatuses } from '../shared/interfaces'
import { useSwiperInstance } from '../shared/state'
import 'swiper/css'

export default function LessonSelectNew() {
  const { constants, palette } = useTheme()
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

  const { setSwiperInstance } = useSwiperInstance()

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
      position='relative'
      justifyContent='center'
      margin='auto'
      maxWidth={constants.lessonSelectPageMaxWidth}
      minHeight='100vh'
      sx={{ backgroundColor: palette.common.white }}
    >
      <LessonPicker {...{ mobileOpen, toggleDrawer }} />

      <Box
        marginLeft={isSmallScreen ? 0 : `${constants.drawerWidth}px`}
        width={
          isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px)`
        }
      >
        <AppBar
          elevation={0}
          position='relative'
          color='inherit'
          sx={{
            borderBottom: `1px solid ${palette.grey[300]}`,
            width: '100%',
          }}
        >
          <Toolbar>
            <When condition={isSmallScreen}>
              <IconButton onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </IconButton>
            </When>
          </Toolbar>
        </AppBar>

        <Box
          component='main'
          width='100%'
          sx={{ backgroundColor: palette.background.default }}
        >
          <If condition={isLargeScreen}>
            <Then>
              <Box
                display='grid'
                gap={2}
                gridTemplateColumns='3fr 1fr'
                padding={3}
              >
                <LessonPrefaceColumn {...{ lessonDetailsSwiperProps }} />
                <LessonStartDesktop lesson={LESSONS[1]} />
              </Box>
            </Then>
            <Else>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                minHeight={`calc(100vh - ${constants.toolbarHeight})`}
              >
                <Box padding={3}>
                  <LessonPrefaceColumn {...{ lessonDetailsSwiperProps }} />
                </Box>
                <LessonStartMobile />
              </Box>
            </Else>
          </If>
        </Box>
      </Box>
    </Box>
  )
}

// function LessonSelectDesktop() {
//   return (
//     <Box display='grid' gap={2} gridTemplateColumns='3fr 1fr' padding={3}>
//       <LessonPrefaceColumn />
//       <LessonStartDesktop lesson={LESSONS[1]} />
//     </Box>
//   )
// }

// function LessonSelectMobile() {
//   const { constants } = useTheme()
//   return (
//     <Box
//       display='flex'
//       flexDirection='column'
//       justifyContent='space-between'
//       minHeight={`calc(100vh - ${constants.toolbarHeight})`}
//     >
//       <Box padding={3}>
//         <LessonPrefaceColumn />
//       </Box>
//       <LessonStartMobile />
//     </Box>
//   )
// }
