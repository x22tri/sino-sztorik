import { useState } from 'react'
import { Box } from '@mui/material'
import { PreviewRow } from './preview-row/PreviewRow'
import { LessonDetailsSwiper } from '../lesson-select-new/lesson-preface/LessonDetailsSwiper'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { BackButton } from '../shared/basic-components'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import { LessonStatuses } from '../shared/interfaces'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { useSwiperInstance } from '../shared/state'
import 'swiper/css'
import { If, Then, Else } from 'react-if'

export default function LessonSelect() {
  const upcomingLessonNumber = LESSONS.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber

  if (!upcomingLessonNumber) {
    throw new Error('Current lesson is undefined.')
  }

  const { setSwiperInstance } = useSwiperInstance()

  const isSmallScreen = useSmallScreen()

  const [selectedLessonNumber, setSelectedLessonNumber] = useState(upcomingLessonNumber)

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
    <If condition={areDetailsShown}>
      <Then>
        <BackButton onClick={closeLessonDetails} text={LESSON_SELECT_TITLE} />
        <LessonDetailsSwiper />
      </Then>
      <Else>
        <PreviewRow {...previewRowProps} />
      </Else>
    </If>
  ) : (
    <Box display='flex' justifyContent='center' margin={1}>
      <LessonDetailsSwiper />
      <PreviewRow {...previewRowProps} />
    </Box>
  )
}
