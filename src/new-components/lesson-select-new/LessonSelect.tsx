import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import LessonPicker from './lesson-picker/LessonPicker'
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
  const isLargeScreen = useLargeScreen()
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { lessons, selected, select, setUpcoming } = useLessonSelect()
  const { constants } = useTheme()

  useEffect(() => {
    const upcoming = lessons.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber
    setUpcoming(upcoming)
    select(upcoming)
  }, [lessons, select])

  return !selected ? null : (
    <Box display='flex' height='100vh' justifyContent='center' margin='auto' maxWidth={lessonSelectMaxWidth} position='relative'>
      <LessonPicker />

      <Box
        display='grid'
        component='main'
        height='100%'
        position='relative'
        gridTemplateColumns='repeat(4, 1fr)'
        gridTemplateRows={`${toolbarHeight}px auto ${constants.lessonStartMobileHeight}`}
        sx={{
          ml: { xs: 0, md: `${constants.drawerWidth}px` },
          gridTemplateAreas: {
            xs: `"nav nav nav nav" "main main main main" "start start start start"`,
            lg: `"nav nav nav nav" "main main main chars" "start start start start"`,
          },
        }}
      >
        <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

        <LessonPrefaceSwiper />

        <When condition={isLargeScreen}>
          <CharacterPreviews characters={lessons[selected - 1].characters} />
        </When>

        <LessonStart lesson={lessons[selected - 1]} />
      </Box>
    </Box>
  )
}
