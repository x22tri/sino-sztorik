import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import LessonPicker from './lesson-picker/LessonPicker'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { LessonStatuses } from '../shared/interfaces'
import { useLessonSelect } from '../lesson-select/logic/useLessonSelect'
import { LessonSelectAppbar } from './lesson-select-appbar/LessonSelectAppbar'
import { LessonSelectMain } from './LessonSelectMain'
import 'swiper/css'

export default function LessonSelect() {
  const isSmallScreen = useSmallScreen()
  const { lessons, selected, select } = useLessonSelect()
  const { constants } = useTheme()

  useEffect(() => {
    const upcomingLessonNumber = lessons.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber
    select(upcomingLessonNumber)
  }, [lessons, select])

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
        <LessonSelectAppbar />

        <LessonSelectMain />
      </Box>
    </Box>
  )
}
