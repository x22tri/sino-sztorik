import LessonPreface from './LessonPreface'
import { LessonSwiper } from '../../shared/components/LessonSwiper'
import { SwiperSlide } from 'swiper/react'
import { useSwiperInstance } from '../../shared/state'
import { isDisabledLesson } from '../../shared/utility-functions'
import { useStore } from '../../shared/logic/useStore'

export function LessonPrefaceSwiper() {
  const { lessons, selectLessonIndex, selectedLessonIndex } = useStore(({ lessonSelect }) => lessonSelect)
  const { swiperInstance } = useSwiperInstance()

  return (
    <LessonSwiper
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
      style={{ gridArea: 'main', height: '100%', width: '100%' }}
    >
      {lessons.map((lesson, index) => (
        <SwiperSlide key={index}>
          <LessonPreface {...{ lesson }} />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}
