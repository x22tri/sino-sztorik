import LessonPreface from './LessonPreface'
import { LessonSwiper } from '../../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import { useLessonSelect } from '../logic/useLessonSelect'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { useTheme } from '@mui/material'

export function LessonPrefaceSwiper() {
  const isLargeScreen = useLargeScreen()
  const { constants, palette, spacing } = useTheme()
  const { lessons, select, selected } = useLessonSelect()

  return (
    // initialSlide is zero-indexed.
    <LessonSwiper
      initialSlide={selected! - 1}
      onActiveIndexChange={({ activeIndex }) => select(activeIndex + 1)}
      style={{
        height: `calc(100% ${isLargeScreen ? '' : `- ${constants.lessonStartMobileHeight}`})`,
        width: '100%',
        boxShadow: constants.boxShadowLessonSelect,
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
