import LessonDetails from './LessonPreface'
import { LessonSwiper } from '../../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from '../../lesson-select/logic/useLessonSelect'

export function LessonPrefaceSwiper() {
  const { lessons, select, selected } = useLessonSelect()

  return (
    // initialSlide is zero-indexed.
    <LessonSwiper
      initialSlide={selected! - 1}
      onActiveIndexChange={({ activeIndex }) => select(activeIndex + 1)}
      style={{ height: '100%', overflowY: 'auto', width: '100%' }}
    >
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonDetails lesson={lessons[lessonNumber - 1]} />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}
