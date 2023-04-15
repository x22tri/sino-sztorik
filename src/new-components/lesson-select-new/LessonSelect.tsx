import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import LessonPicker from './lesson-picker/LessonPicker'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { LessonStatuses } from '../shared/interfaces'
import { useLessonSelect } from './logic/useLessonSelect'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import { LessonPrefaceSwiper } from './lesson-preface/LessonPrefaceSwiper'
import { LessonStart } from './lesson-start/LessonStart'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { CharacterPreviews } from './lesson-start/CharacterPreviews'
import { When } from 'react-if'
import 'swiper/css'

const lessonSelectMaxWidth = '1600px'

export default function LessonSelect() {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { lessons, selected, select, setUpcoming } = useLessonSelect()
  const { constants, spacing } = useTheme()

  const getMainHeight = (toolbarHeight: number) => `calc(100% - ${spacing(toolbarHeight)} - ${constants.lessonStartMobileHeight})`

  useEffect(() => {
    const upcoming = lessons.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber
    setUpcoming(upcoming)
    select(upcoming)
  }, [lessons, select])

  return !selected ? null : (
    <Box display='flex' height='100vh' justifyContent='center' margin='auto' maxWidth={lessonSelectMaxWidth} position='relative'>
      <LessonPicker />

      <Box sx={{ ml: { xs: 0, md: `${constants.drawerWidth}px` } }}>
        <LessonSelectAppbar />

        <Box
          display='grid'
          component='main'
          gridTemplateColumns={!isLargeScreen ? '1fr' : '3fr 1fr'}
          sx={{ bgcolor: 'background.paper', height: { xs: getMainHeight(6), sm: getMainHeight(8) } }}
        >
          <LessonPrefaceSwiper />
          <When condition={isLargeScreen}>
            <CharacterPreviews characters={lessons[selected - 1].characters} />
          </When>
        </Box>
        <LessonStart lesson={lessons[selected - 1]} />
      </Box>
    </Box>
  )
}
