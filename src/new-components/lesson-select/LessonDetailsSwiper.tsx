import LessonDetails from './LessonDetails'
import { AssembledLesson } from '../shared/interfaces'
import { LessonSwiper } from '../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import { useTheme } from '@mui/material'
import { useSmallScreen } from '../shared/utility-functions'
import { Dispatch, SetStateAction } from 'react'

export function LessonDetailsSwiper({
  upcomingLessonNumber,
  lessons,
  selectedLessonNumber,
  setSelectedLessonNumber,
}: {
  upcomingLessonNumber: number
  lessons: AssembledLesson[]
  selectedLessonNumber: number
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
}) {
  const { constants } = useTheme()

  const isSmallScreen = useSmallScreen()

  const maxWidth = isSmallScreen ? undefined : constants.maxContentWidth

  return (
    // initialSlide is zero-indexed.
    <LessonSwiper
      onActiveIndexChange={({ activeIndex }) => {
        setSelectedLessonNumber(activeIndex + 1)
      }}
      initialSlide={selectedLessonNumber - 1}
      style={{ margin: 0, maxWidth }}
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
