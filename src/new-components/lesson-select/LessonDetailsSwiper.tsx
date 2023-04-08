import LessonDetails from './LessonDetails'
import { LessonSwiper } from '../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from './logic/useLessonSelect'

export function LessonDetailsSwiper() {
  const { lessons, select, selected } = useLessonSelect()

  return (
    // initialSlide is zero-indexed.
    <LessonSwiper
      onActiveIndexChange={({ activeIndex }) => {
        select(activeIndex + 1)
      }}
      initialSlide={selected! - 1}
      style={{
        height: '100%',
        overflowY: 'auto',
        width: '100%',
      }}
    >
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonDetails lesson={lessons[lessonNumber - 1]} />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}
