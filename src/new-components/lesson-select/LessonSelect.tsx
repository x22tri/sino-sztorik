import { useEffect, useState } from 'react'
import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { SwiperSlide } from 'swiper/react'
import { isDisabledLesson } from '../shared/utility-functions'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonSelectContent from './lesson-select-content/LessonSelectContent'
import { LessonStart } from './lesson-start/LessonStart'
import { SwiperGrid } from '../shared/components/SwiperGrid'
import { useLoaderData } from 'react-router-dom'
import { loadLessonSelect } from '../shared/logic/loadLessonSelect'

export default function LessonSelect() {
  const { lessons, upcomingIndex } = useLoaderData() as ReturnType<typeof loadLessonSelect>
  const { selectedLessonIndex, selectLessonIndex } = useStore('lessonSelect')
  const [toolbarHeight, setToolbarHeight] = useState(0)

  useEffect(() => {
    selectLessonIndex(upcomingIndex)
  }, [selectLessonIndex, upcomingIndex])

  return selectedLessonIndex === undefined ? null : (
    <SwiperGrid
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

      {lessons
        .filter(({ tierStatuses }) => !isDisabledLesson(tierStatuses))
        .map((lesson, index) => (
          <SwiperSlide key={index}>
            <LessonSelectContent prevLesson={lessons[index - 1]} nextLesson={lessons[index + 1]} {...{ lesson, toolbarHeight }} />
          </SwiperSlide>
        ))}

      <LessonStart lesson={lessons[selectedLessonIndex]} />
    </SwiperGrid>
  )
}
