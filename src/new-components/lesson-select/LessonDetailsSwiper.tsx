import LessonDetails from './LessonDetails'
import { AssembledLesson } from '../shared/interfaces'
import { LessonSwiper } from '../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import { useTheme } from '@mui/material'
import { useSmallScreen } from '../shared/utility-functions'

export function LessonDetailsSwiper({
  upcomingLessonNumber,
  lessons,
  selectedLessonNumber,
}: {
  upcomingLessonNumber: number
  lessons: AssembledLesson[]
  selectedLessonNumber: number
}) {
  const { constants } = useTheme()

  const isSmallScreen = useSmallScreen()

  return (
    // initialSlide is zero-indexed.
    <LessonSwiper
      initialSlide={selectedLessonNumber - 1}
      style={{
        margin: 0,
        maxWidth: isSmallScreen ? undefined : constants.maxContentWidth,
      }}
    >
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonDetails
            isCurrentLesson={lessonNumber === upcomingLessonNumber}
            lesson={lessons[lessonNumber - 1]}
          />
        </SwiperSlide>
      ))}
    </LessonSwiper>
  )
}