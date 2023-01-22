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

  // const [isLessonDetailsVisible, setIsLessonDetailsVisible] = useState(false)

  function closeLessonDetails() {
    // setIsLessonDetailsVisible(false)
    setSelectedLessonNumber(null)
    // setTimeout(() => {

    // }, constants.animationDuration)
  }

  const isSmallScreen = useSmallScreen()

  if (isSmallScreen) {
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

  return (
    <Box display='flex' justifyContent='center' marginX={1}>
      <LessonDetailsSwiper
        lessons={LESSONS}
        selectedLessonNumber={selectedLessonNumber!}
        {...{ upcomingLessonNumber }}
      />
      <PreviewRow lessons={LESSONS} {...{ setSelectedLessonNumber }} />
    </Box>
  )
}

function LessonSelectLayoutDesktop({
  selectedLessonNumber,
  setSelectedLessonNumber,
  upcomingLessonNumber,
}: {
  selectedLessonNumber: number
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
  upcomingLessonNumber: number
}) {
  return (
    <>
      <LessonDetailsSwiper
        lessons={LESSONS}
        selectedLessonNumber={selectedLessonNumber!}
        {...{ upcomingLessonNumber }}
      />
      <PreviewRow lessons={LESSONS} {...{ setSelectedLessonNumber }} />
    </>
  )
}
