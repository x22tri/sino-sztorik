import LessonPreface from './LessonPreface'
import { LessonSwiper } from '../../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from '../logic/useLessonSelect'
import { useTheme } from '@mui/material'

export function LessonPrefaceSwiper() {
  const { constants } = useTheme()
  const { lessons, select, selected } = useLessonSelect()

  return (
    <LessonSwiper
      initialSlide={selected! - 1} // initialSlide is zero-indexed.
      onActiveIndexChange={({ activeIndex }) => select(activeIndex + 1)}
      style={{
        boxShadow: constants.boxShadowLessonSelect,
        clipPath: `inset(0px -20px -20px -20px)`, // Cut off box shadow's top.
        height: '100%',
        width: '100%',
      }}
    >
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonPreface lesson={lessons[lessonNumber - 1]} />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}
