import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import LessonPicker from './lesson-picker/LessonPicker'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { LessonStatuses } from '../shared/interfaces'
import { useLessonSelect } from './logic/useLessonSelect'
import { LessonSelectAppbar } from './lesson-select-appbar/LessonSelectAppbar'
import { LessonPrefaceSwiper } from './lesson-preface/LessonPrefaceSwiper'
import { LessonStart } from './lesson-start/LessonStart'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import 'swiper/css'

const stylesDesktop = { display: 'grid', gridTemplateColumns: '3fr 1fr', justifyItems: 'center' }
const stylesMobile = { display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }

export default function LessonSelect() {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { lessons, selected, select, setUpcoming } = useLessonSelect()
  const { constants } = useTheme()

  useEffect(() => {
    const upcoming = lessons.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber
    setUpcoming(upcoming)
    select(upcoming)
  }, [lessons, select])

  return !selected ? null : (
    <Box
      display='flex'
      justifyContent='center'
      margin='auto'
      maxWidth={constants.lessonSelectMaxWidth}
      // minHeight='100vh'
      height='100vh'
      // minHeight='fill-available'
      position='relative'
    >
      <LessonPicker />

      <Box
        marginLeft={isSmallScreen ? 0 : `${constants.drawerWidth}px`}
        width={isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px)`}
      >
        <LessonSelectAppbar />

        <Box
          component='main'
          boxSizing='border-box'
          // height={`calc(100% - ${constants.toolbarHeight})`}
          // height='100%'
          position='relative'
          {...(isLargeScreen ? stylesDesktop : stylesMobile)}
          sx={{
            height: { xs: `calc(100% - ${constants.toolbarHeightMobile})`, sm: `calc(100% - ${constants.toolbarHeight})` },
          }}
        >
          <LessonPrefaceSwiper />
          <LessonStart {...{ isLargeScreen }} lesson={lessons[selected - 1]} />
        </Box>
      </Box>
    </Box>
  )
}
