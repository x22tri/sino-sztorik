import LessonPreface from './LessonPreface'
import { SwiperWrapper } from '../../shared/components/SwiperWrapper'
import { SwiperSlide } from 'swiper/react'
import { isDisabledLesson } from '../../shared/utility-functions'
import { useStore } from '../../shared/logic/useStore'
import { LessonSelectAppbar } from '../appbar/LessonSelectAppbar'
import { useState } from 'react'
import { LessonStart } from '../lesson-start/LessonStart'

export function LessonPrefaceSwiper() {
  const { lessons, selectLessonIndex, selectedLessonIndex } = useStore('lessonSelect')
  const { swiperInstance } = useStore('swiper')
  const [toolbarHeight, setToolbarHeight] = useState(0)

  return selectedLessonIndex === undefined ? null : (
    <SwiperWrapper
      customKeyboardControls={[
        { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
        {
          on: 'ArrowRight',
          do: () => {
            const currentIndex = swiperInstance?.activeIndex

            if (currentIndex !== undefined && !isDisabledLesson(lessons[currentIndex + 1].tierStatuses)) {
              swiperInstance?.slideNext()
            }
          },
        },
      ]}
      initialSlide={selectedLessonIndex!}
      onActiveIndexChange={({ activeIndex }) => selectLessonIndex(activeIndex)}
      style={{ gridArea: 'main', width: '100%' }}
    >
      <LessonSelectAppbar {...{ setToolbarHeight, toolbarHeight }} />

      {lessons.map((lesson, index) => (
        <SwiperSlide key={index}>
          <LessonPreface prevLesson={lessons[index - 1]} nextLesson={lessons[index + 1]} {...{ lesson, toolbarHeight }} />
        </SwiperSlide>
      ))}

      <LessonStart lesson={lessons[selectedLessonIndex]} />
    </SwiperWrapper>
  )
}
