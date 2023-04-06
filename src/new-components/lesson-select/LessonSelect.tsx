import { useState } from 'react'
import { Box } from '@mui/material'
import { PreviewRow } from './preview-row/PreviewRow'
import { LessonDetailsSwiper } from './LessonDetailsSwiper'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { BackButton } from '../shared/basic-components'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import { LessonStatuses } from '../shared/interfaces'
import { useSmallScreen } from '../shared/utility-functions'
import { useSwiperInstance } from '../shared/state'
import 'swiper/css'
import { Display } from '../shared/utility-components'

export default function LessonSelect() {
  const upcomingLessonNumber = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!upcomingLessonNumber) {
    throw new Error('Current lesson is undefined.')
  }

  const { setSwiperInstance } = useSwiperInstance()

  const isSmallScreen = useSmallScreen()

  const [selectedLessonNumber, setSelectedLessonNumber] =
    useState(upcomingLessonNumber)

  const [areDetailsShown, showDetailsOnMobile] = useState(false)

  function closeLessonDetails() {
    showDetailsOnMobile(false)
    setSwiperInstance(undefined)
  }

  const lessonDetailsSwiperProps = {
    lessons: LESSONS,
    selectedLessonNumber: selectedLessonNumber!,
    setSelectedLessonNumber,
    upcomingLessonNumber,
  }

  const previewRowProps = {
    areDetailsShown,
    lessons: LESSONS,
    selectedLessonNumber,
    showDetailsOnMobile,
    setSelectedLessonNumber,
  }

  return isSmallScreen ? (
    <Display if={areDetailsShown} else={<PreviewRow {...previewRowProps} />}>
      <BackButton onClick={closeLessonDetails} text={LESSON_SELECT_TITLE} />
      <LessonDetailsSwiper {...lessonDetailsSwiperProps} />
    </Display>
  ) : (
    <Box display='flex' justifyContent='center' margin={1}>
      <LessonDetailsSwiper {...lessonDetailsSwiperProps} />
      <PreviewRow {...previewRowProps} />
    </Box>
  )
}
