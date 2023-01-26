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

export default function LessonSelect() {
  const upcomingLessonNumber = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!upcomingLessonNumber) {
    throw new Error('Current lesson is undefined.')
  }

  const { setSwiperInstance } = useSwiperInstance()

  const isSmallScreen = useSmallScreen()

  const [selectedLessonNumber, setSelectedLessonNumber] = useState(
    isSmallScreen ? null : upcomingLessonNumber
  )

  function closeLessonDetails() {
    setSelectedLessonNumber(null)
    setSwiperInstance(undefined)
  }

  if (isSmallScreen && selectedLessonNumber !== null) {
    return (
      <>
        <BackButton onClick={closeLessonDetails} text={LESSON_SELECT_TITLE} />

        <LessonDetailsSwiper
          lessons={LESSONS}
          {...{
            selectedLessonNumber,
            setSelectedLessonNumber,
            upcomingLessonNumber,
          }}
        />
      </>
    )
  }

  if (isSmallScreen) {
    return (
      <PreviewRow
        lessons={LESSONS}
        {...{ selectedLessonNumber, setSelectedLessonNumber }}
      />
    )
  }

  return (
    <Box display='flex' justifyContent='center' marginX={1}>
      <LessonDetailsSwiper
        lessons={LESSONS}
        selectedLessonNumber={selectedLessonNumber!}
        {...{ setSelectedLessonNumber, upcomingLessonNumber }}
      />
      <PreviewRow
        lessons={LESSONS}
        {...{ selectedLessonNumber, setSelectedLessonNumber }}
      />
    </Box>
  )
}
