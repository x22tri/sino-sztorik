import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { LessonStatuses } from '../shared/interfaces'
import { useLessonSelect } from './logic/useLessonSelect'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import { LessonPrefaceSwiper } from './lesson-preface/LessonPrefaceSwiper'
import { LessonStart } from './lesson-start/LessonStart'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { CharacterPreviews } from './lesson-start/CharacterPreviews'
import { When } from 'react-if'
import 'swiper/css'
import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { SideNav } from '../shared/components/SideNav'

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
  }, [lessons, select, setUpcoming])

  return !selected ? null : (
    <Box
      display='grid'
      height='100vh'
      margin='auto'
      maxWidth={lessonSelectMaxWidth}
      position='relative'
      gridTemplateRows={`${toolbarHeight}px auto ${constants.lessonStartHeight}`}
      sx={{
        gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px auto`, lg: `${constants.drawerWidth}px 3fr 1fr` },
        gridTemplateAreas: {
          xs: `"nav" "main" "start"`,
          md: `"drawer nav" "drawer main" "drawer start"`,
          lg: `"drawer nav nav" "drawer main chars" "drawer start start"`,
        },
      }}
    >
      <SideNav content={<LessonPickerContent />} />

      <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

      <LessonPrefaceSwiper />

      <When condition={isLargeScreen}>
        <CharacterPreviews characters={lessons[selected - 1].characters} />
      </When>

      <LessonStart lesson={lessons[selected - 1]} />
    </Box>
  )
}
