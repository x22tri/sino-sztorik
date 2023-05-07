import LessonPreface from './LessonPreface'
import { SwiperWrapper } from '../../shared/components/SwiperWrapper'
import { SwiperSlide } from 'swiper/react'
import { isDisabledLesson } from '../../shared/utility-functions'
import { useStore } from '../../shared/logic/useStore'

export function LessonPrefaceSwiper() {
  const { lessons, selectLessonIndex, selectedLessonIndex } = useStore('lessonSelect')
  const { swiperInstance } = useStore('swiper')

  return (
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
      style={{ gridArea: 'main', height: '100%', width: '100%' }}
    >
      {lessons.map((lesson, index) => (
        <SwiperSlide key={index}>
          <LessonPreface prevLesson={lessons[index - 1]} nextLesson={lessons[index + 1]} {...{ lesson }} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  )
}
