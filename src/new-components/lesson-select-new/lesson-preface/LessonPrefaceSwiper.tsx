import LessonPreface from './LessonPreface'
import { LessonSwiper } from '../../shared/components/LessonSwiper'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from '../logic/useLessonSelect'
import { useSwiperInstance } from '../../shared/state'
import { isDisabledLesson } from '../../shared/utility-functions'

export function LessonPrefaceSwiper() {
  const { lessons, select, selected } = useLessonSelect()
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
      initialSlide={selected! - 1}
      onActiveIndexChange={({ activeIndex }) => select(activeIndex + 1)}
      style={{ gridArea: 'main', height: '100%', width: '100%' }}
    >
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonPreface lesson={lessons[lessonNumber - 1]} />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}
