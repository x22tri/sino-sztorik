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
  const { lessons, selectedLessonIndex, selectLessonIndex, setUpcomingLessonIndex } = useStore('lessonSelect')
  const { constants } = useTheme()

  useEffect(() => {
    const upcoming = lessons.findIndex(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))
    setUpcomingLessonIndex(upcoming)
    selectLessonIndex(upcoming)
  }, [lessons, selectLessonIndex, setUpcomingLessonIndex])

  return selectedLessonIndex === undefined ? null : (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      maxWidth={constants.maxContentWidth}
      sx={{
        gridTemplateColumns: { xs: 'auto', md: `${constants.drawerWidth}px auto` },
        gridTemplateAreas: `"drawer main"`,
      }}
    >
      <SideNav title={<LessonPickerTitle />} content={<LessonPickerContent />} selected={selectedLessonIndex} />

      <LessonPrefaceSwiper />
    </Box>
  )
}
