import LessonPreface from './LessonPreface'
import { LessonSwiper } from '../../shared/components/LessonSwiper'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from '../logic/useLessonSelect'

export function LessonPrefaceSwiper() {
  const { lessons, select, selected } = useLessonSelect()

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
