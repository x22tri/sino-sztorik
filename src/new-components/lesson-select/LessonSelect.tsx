import { useState, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { AssembledLesson, LessonStatuses } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  BackButton,
} from '../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useTheme } from '@mui/material'

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
    <Container component='main' maxWidth='lg' sx={{ pt: '2em', px: 0 }}>
      {selectedLessonNumber === null ? (
        <LessonPreviewGrid
          lessons={LESSONS}
          {...{
            upcomingLessonNumber,
            setIsLessonDetailsVisible,
            setSelectedLessonNumber,
          }}
        />
      ) : null}

      <Grow in={isLessonDetailsVisible} timeout={constants.animationDuration}>
        {selectedLessonNumber !== null ? (
          <Box maxWidth={constants.maxContentWidth} position='relative'>
            <BackButton
              onClick={closeLessonDetails}
              text={LESSON_SELECT_TITLE}
            />

            <LessonDetailsSwiper
              lessons={LESSONS}
              {...{ upcomingLessonNumber, selectedLessonNumber }}
            />
          </Box>
        ) : (
          <></>
        )}
      </Grow>
    </Container>
  )
}

function LessonPreviewGrid({
  upcomingLessonNumber,
  lessons,
  setIsLessonDetailsVisible,
  setSelectedLessonNumber,
}: {
  upcomingLessonNumber: number
  lessons: AssembledLesson[]
  setIsLessonDetailsVisible: Dispatch<SetStateAction<boolean>>
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
}) {
  const { constants } = useTheme()

  return (
    <Grid
      container
      sx={{ height: 'fit-content', maxWidth: constants.maxContentWidth }}
    >
      {lessons.map(({ lessonNumber, title, tierStatuses }) => (
        <LessonCard
          key={lessonNumber}
          {...{
            lessonNumber,
            title,
            tierStatuses,
            setSelectedLessonNumber,
            upcomingLessonNumber,
            setIsLessonDetailsVisible,
          }}
        />
      ))}
    </Grid>
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
    <CardSwiperWrapper initialSlide={selectedLessonNumber - 1}>
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <CardSwiperContent>
            <LessonDetails
              isCurrentLesson={lessonNumber === upcomingLessonNumber}
              lesson={lessons[lessonNumber - 1]}
            />
          </CardSwiperContent>
        </SwiperSlide>
      ))}
    </CardSwiperWrapper>
  )
}
