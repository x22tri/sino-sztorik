import { useEffect, useState } from 'react'
import { LessonStatuses } from '../shared/interfaces'
import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { SwiperSlide } from 'swiper/react'
import { isDisabledLesson } from '../shared/utility-functions'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonSelectContent from './lesson-select-content/LessonSelectContent'
import { LessonStart } from './lesson-start/LessonStart'
import { SwiperGrid } from '../shared/components/SwiperGrid'

export default function LessonSelect() {
  const { lessons, selectedLessonIndex, selectLessonIndex, setUpcomingLessonIndex } = useStore('lessonSelect')
  const { swiperInstance } = useStore('swiper')
  const [toolbarHeight, setToolbarHeight] = useState(0)

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
    <SwiperGrid
      keyboardControls={[
        { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
        { on: 'ArrowRight', do: () => slideNextIfLessonIsEnabled() },
      ]}
      sideNav={{
        title: <LessonPickerTitle />,
        content: <LessonPickerContent />,
        selected: selectedLessonIndex,
      }}
      swiperProps={{
        onActiveIndexChange: ({ activeIndex }) => selectLessonIndex(activeIndex),
        initialSlide: selectedLessonIndex,
      }}
    >
      <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

      {lessons.map((lesson, index) => (
        <SwiperSlide key={index}>
          <LessonSelectContent prevLesson={lessons[index - 1]} nextLesson={lessons[index + 1]} {...{ lesson, toolbarHeight }} />
        </SwiperSlide>
      ))}

      <LessonStart lesson={lessons[selectedLessonIndex]} />
    </SwiperGrid>
  )
}
