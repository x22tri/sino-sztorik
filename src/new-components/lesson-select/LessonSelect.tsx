import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { Grow } from '@mui/material'
import {
  AssembledLesson,
  LessonStatuses,
  SideNavigationItem,
} from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import WestIcon from '@mui/icons-material/West'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  LightenOnHoverButton,
} from '../shared/basic-components'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'

const maxContentWidth = '48rem'
const lessonDetailsTimeout = 150

export default function LessonSelect() {
  const hasUpcomingTier = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!hasUpcomingTier) {
    throw new Error('Current lesson is undefined.')
  }

  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<SideNavigationItem>(LESSON_SELECT_TITLE)

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<
    number | null
  >(null)

  const [currentLessonNumber] = useState<number>(hasUpcomingTier)

  const [isLessonDetailsVisible, setIsLessonDetailsVisible] = useState(false)

  function closeLessonDetails() {
    setIsLessonDetailsVisible(false)
    setTimeout(() => {
      setSelectedLessonNumber(null)
    }, lessonDetailsTimeout)
  }

  return (
    <Container component='main' maxWidth='lg' sx={{ pt: '2em', px: 0 }}>
      {selectedLessonNumber === null ? (
        <LessonPreviewGrid
          lessons={LESSONS}
          {...{
            currentLessonNumber,
            setIsLessonDetailsVisible,
            setSelectedLessonNumber,
          }}
        />
      ) : null}

      <Grow in={isLessonDetailsVisible} timeout={lessonDetailsTimeout}>
        {selectedLessonNumber !== null ? (
          <Box maxWidth={maxContentWidth} position='relative'>
            <BackToLessonSelectButton onClick={closeLessonDetails} />

            <LessonDetailsSwiper
              lessons={LESSONS}
              {...{ currentLessonNumber, selectedLessonNumber }}
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
  currentLessonNumber,
  lessons,
  setIsLessonDetailsVisible,
  setSelectedLessonNumber,
}: {
  currentLessonNumber: number
  lessons: AssembledLesson[]
  setIsLessonDetailsVisible: Dispatch<SetStateAction<boolean>>
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
}) {
  return (
    <Grid container sx={{ height: 'fit-content', maxWidth: maxContentWidth }}>
      {lessons.map(({ lessonNumber, title, tierStatuses }) => (
        <LessonCard
          key={lessonNumber}
          {...{
            lessonNumber,
            title,
            tierStatuses,
            setSelectedLessonNumber,
            currentLessonNumber,
            setIsLessonDetailsVisible,
          }}
        />
      ))}
    </Grid>
  )
}

function BackToLessonSelectButton({
  onClick,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
}) {
  return (
    <LightenOnHoverButton
      {...{ onClick }}
      startIcon={<WestIcon fontSize='small' />}
      sx={{ ml: 1.5 }}
    >
      <Typography component='span' textTransform='none'>
        {LESSON_SELECT_TITLE}
      </Typography>
    </LightenOnHoverButton>
  )
}

function LessonDetailsSwiper({
  currentLessonNumber,
  lessons,
  selectedLessonNumber,
}: {
  currentLessonNumber: number
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
              isCurrentLesson={lessonNumber === currentLessonNumber}
              lesson={lessons[lessonNumber - 1]}
            />
          </CardSwiperContent>
        </SwiperSlide>
      ))}
    </CardSwiperWrapper>
  )
}
