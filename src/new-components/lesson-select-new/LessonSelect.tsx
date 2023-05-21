import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { LessonStatuses } from '../shared/interfaces'
import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { SideNav } from '../shared/components/SideNav'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { SwiperSlide } from 'swiper/react'
import { SwiperWrapper } from '../shared/components/SwiperWrapper'
import { isDisabledLesson } from '../shared/utility-functions'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonPreface from './lesson-preface/LessonPreface'
import { LessonStart } from './lesson-start/LessonStart'

export default function LessonSelect() {
  const { lessons, selectedLessonIndex, selectLessonIndex, setUpcomingLessonIndex } = useStore('lessonSelect')
  const { swiperInstance } = useStore('swiper')
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { constants } = useTheme()

  useEffect(() => {
    const upcoming = lessons.findIndex(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))
    setUpcomingLessonIndex(upcoming)
    selectLessonIndex(upcoming)
  }, [lessons, selectLessonIndex, setUpcomingLessonIndex])

  function slideNextIfLessonIsEnabled(): void {
    const currentIndex = swiperInstance?.activeIndex

    if (currentIndex !== undefined && !isDisabledLesson(lessons[currentIndex + 1].tierStatuses)) {
      swiperInstance?.slideNext()
    }
  }

  return selectedLessonIndex === undefined ? null : (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      maxWidth={constants.maxContentWidth}
      sx={{ gridTemplate: { xs: `"main" / auto`, md: `"drawer main" / ${constants.drawerWidth}px auto` } }}
    >
      <SideNav title={<LessonPickerTitle />} content={<LessonPickerContent />} selected={selectedLessonIndex} />

      <SwiperWrapper
        customKeyboardControls={[
          { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
          { on: 'ArrowRight', do: () => slideNextIfLessonIsEnabled() },
        ]}
        initialSlide={selectedLessonIndex}
        onActiveIndexChange={({ activeIndex }) => selectLessonIndex(activeIndex)}
      >
        <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

        {lessons.map((lesson, index) => (
          <SwiperSlide key={index}>
            <LessonPreface prevLesson={lessons[index - 1]} nextLesson={lessons[index + 1]} {...{ lesson, toolbarHeight }} />
          </SwiperSlide>
        ))}

        <LessonStart lesson={lessons[selectedLessonIndex]} />
      </SwiperWrapper>
    </Box>
  )
}
