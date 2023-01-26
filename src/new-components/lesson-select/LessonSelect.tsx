import { Dispatch, SetStateAction, useState } from 'react'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { LessonStatuses } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import { BackButton } from '../shared/basic-components'
import 'swiper/css'
import { Box, useTheme } from '@mui/material'
import { PreviewRow } from './preview-row/PreviewRow'
import { Display } from '../shared/utility-components'
import { LessonDetailsSwiper } from './LessonDetailsSwiper'
import { useSmallScreen } from '../shared/utility-functions'

export default function LessonSelect() {
  const { constants } = useTheme()

  const upcomingLessonNumber = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!upcomingLessonNumber) {
    throw new Error('Current lesson is undefined.')
  }

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<
    number | null
  >(null)

  function closeLessonDetails() {
    setSelectedLessonNumber(null)
  }

  const isSmallScreen = useSmallScreen()

  if (isSmallScreen) {
    return (
      <Display
        if={selectedLessonNumber !== null}
        else={
          <PreviewRow
            lessons={LESSONS}
            {...{ selectedLessonNumber, setSelectedLessonNumber }}
          />
        }
      >
        <BackButton onClick={closeLessonDetails} text={LESSON_SELECT_TITLE} />

        <LessonDetailsSwiper
          lessons={LESSONS}
          selectedLessonNumber={selectedLessonNumber!}
          {...{ setSelectedLessonNumber, upcomingLessonNumber }}
        />
      </Display>
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
