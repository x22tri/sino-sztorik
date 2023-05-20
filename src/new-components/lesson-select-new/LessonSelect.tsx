import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { LessonStatuses } from '../shared/interfaces'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import { LessonPrefaceSwiper } from './lesson-preface/LessonPrefaceSwiper'
import { LessonStart } from './lesson-start/LessonStart'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { CharacterPreviews } from './lesson-start/CharacterPreviews'
import { When } from 'react-if'
import 'swiper/css'
import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { SideNav } from '../shared/components/SideNav'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'

export default function LessonSelect() {
  const isSmallScreen = useSmallScreen()
  // const [toolbarHeight, setToolbarHeight] = useState(0)
  const { lessons, selectedLessonIndex, selectLessonIndex, setUpcomingLessonIndex } = useStore('lessonSelect')
  const { constants } = useTheme()

  useEffect(() => {
    const upcoming = lessons.findIndex(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))
    setUpcomingLessonIndex(upcoming)
    selectLessonIndex(upcoming)
  }, [lessons, selectLessonIndex, setUpcomingLessonIndex])

  return selectedLessonIndex === undefined ? null : (
    // <Box
    //   display='flex'
    // maxWidth='100vw'
    // height='100vh'
    // margin='auto'
    // maxWidth={constants.maxContentWidth}
    // position='relative'
    // gridTemplateRows={`${toolbarHeight}px auto ${constants.lessonStartHeight}`}
    // gridTemplateRows='auto 1fr auto'
    // sx={{
    //   // overflowY: 'auto',
    //   gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px auto` },
    //   gridTemplateRows: 'auto 1fr auto',
    //   gridTemplateAreas: {
    //     xs: `"nav" "main" "start"`,
    //     md: `"drawer nav" "drawer main" "drawer start"`,
    //     // lg: `"drawer nav nav" "drawer main main" "drawer start start"`,
    //   },
    // }}
    // >
    //  <When condition={!isSmallScreen}>
    // <SideNav title={<LessonPickerTitle />} content={<LessonPickerContent />} selected={selectedLessonIndex} />
    //  </When>

    // <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

    <Box display='flex' margin='auto' maxWidth={constants.maxContentWidth}>
      <When condition={!isSmallScreen}>
        <SideNav title={<LessonPickerTitle />} content={<LessonPickerContent />} selected={selectedLessonIndex} />
      </When>

      <LessonPrefaceSwiper />
    </Box>

    // <When condition={isLargeScreen}>
    //   <CharacterPreviews characters={lessons[selectedLessonIndex].characters} />
    // </When>

    // <LessonStart lesson={lessons[selectedLessonIndex]} />
    // </Box>
  )
}
