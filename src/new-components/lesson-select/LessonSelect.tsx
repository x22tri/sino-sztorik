import { useState } from 'react'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { AssembledLesson, LessonStatuses } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import { BackButton, LessonSwiper } from '../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useTheme } from '@mui/material'
import { PreviewRow } from './preview-row/PreviewRow'
import { Display } from '../shared/utility-components'

export default function LessonSelect() {
  const { constants } = useTheme()

  const hasUpcomingTier = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!hasUpcomingTier) {
    throw new Error('Current lesson is undefined.')
  }

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<
    number | null
  >(null)

  const [upcomingLessonNumber] = useState<number>(hasUpcomingTier)

  const [isLessonDetailsVisible, setIsLessonDetailsVisible] = useState(false)

  function closeLessonDetails() {
    setIsLessonDetailsVisible(false)
    setTimeout(() => {
      setSelectedLessonNumber(null)
    }, constants.animationDuration)
  }

  return (
    <Display
      if={selectedLessonNumber !== null}
      else={<PreviewRow lessons={LESSONS} {...{ setSelectedLessonNumber }} />}
    >
      <BackButton onClick={closeLessonDetails} text={LESSON_SELECT_TITLE} />

      <LessonDetailsSwiper
        lessons={LESSONS}
        selectedLessonNumber={selectedLessonNumber!}
        {...{ upcomingLessonNumber }}
      />
    </Display>
  )
}

function LessonDetailsSwiper({
  upcomingLessonNumber,
  lessons,
  selectedLessonNumber,
}: {
  upcomingLessonNumber: number
  lessons: AssembledLesson[]
  selectedLessonNumber: number
}) {
  return (
    // initialSlide is zero-indexed.
    <LessonSwiper initialSlide={selectedLessonNumber - 1}>
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
