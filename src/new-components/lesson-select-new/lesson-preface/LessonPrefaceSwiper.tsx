import LessonPreface from './LessonPreface'
import { LessonSwiper } from '../../shared/components/LessonSwiper'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from '../logic/useLessonSelect'
import { useSwiperInstance } from '../../shared/state'
import { useKeydown } from '../../shared/hooks/useKeydown'
import { isDisabledLesson } from '../../shared/utility-functions'

export function LessonPrefaceSwiper() {
  const { lessons, select, selected } = useLessonSelect()
  const { swiperInstance } = useSwiperInstance()

  useKeydown([
    { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
    {
      on: 'ArrowRight',
      do: () => {
        if (
          swiperInstance?.activeIndex !== undefined &&
          !isDisabledLesson(lessons[swiperInstance.activeIndex + 1].tierStatuses)
        ) {
          swiperInstance?.slideNext()
        }
      },
    },
  ])

  return (
    <LessonSwiper
      initialSlide={selected! - 1}
      onActiveIndexChange={({ activeIndex }) => select(activeIndex + 1)}
      style={{ height: '100%', width: '100%' }}
    >
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonPreface lesson={lessons[lessonNumber - 1]} />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}