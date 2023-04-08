import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useEffect } from 'react'
import { IconButton, useTheme } from '@mui/material'
import LessonPicker from './lesson-picker/LessonPicker'
import { LessonStartDesktop, LessonStartMobile } from './lesson-start/LessonStart'
import { If, Then, Else, When } from 'react-if'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { LessonStatuses } from '../shared/interfaces'
import 'swiper/css'
import { LessonDetailsSwiper } from '../lesson-select/LessonDetailsSwiper'
import { useLessonSelect } from '../lesson-select/logic/useLessonSelect'

export default function LessonSelectNew() {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { lessons, selected, select, toggle } = useLessonSelect()
  const { constants, spacing } = useTheme()

  useEffect(() => {
    const upcomingLessonNumber = lessons.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber
    select(upcomingLessonNumber)
  }, [])

  return !selected ? null : (
    <Box
      display='flex'
      justifyContent='center'
      margin='auto'
      maxWidth={constants.lessonSelectPageMaxWidth}
      minHeight='100vh'
      position='relative'
    >
      <LessonPicker />

      <Box
        marginLeft={isSmallScreen ? 0 : `${constants.drawerWidth}px`}
        width={isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px)`}
      >
        <AppBar
          color='inherit'
          elevation={0}
          position='relative'
          sx={{
            mx: isSmallScreen ? 0 : 2,
            borderBottomLeftRadius: isSmallScreen ? 0 : spacing(1),
            borderBottomRightRadius: isSmallScreen ? 0 : spacing(1),
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            width: 'auto',
          }}
        >
          <Toolbar disableGutters sx={{ px: 2 }}>
            <When condition={isSmallScreen}>
              <IconButton onClick={toggle}>
                <FontAwesomeIcon icon={faGraduationCap} />
              </IconButton>
            </When>
          </Toolbar>
        </AppBar>

        <Box component='main' height={`calc(100% - ${constants.toolbarHeight})`} width='100%'>
          <If condition={isLargeScreen}>
            <Then>
              <Box display='grid' gridTemplateColumns='3fr 1fr' height='100%' justifyItems='center'>
                <LessonDetailsSwiper />
                <LessonStartDesktop lesson={lessons[selected - 1]} />
              </Box>
            </Then>
            <Else>
              <Box display='flex' flexDirection='column' height='100%' justifyContent='space-between' width='100%'>
                <LessonDetailsSwiper />
                <LessonStartMobile />
              </Box>
            </Else>
          </If>
        </Box>
      </Box>
    </Box>
  )
}
