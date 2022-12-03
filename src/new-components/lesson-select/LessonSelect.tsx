import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { Grow, useTheme } from '@mui/material'
import { LessonStatuses, SideNavigationItem } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import WestIcon from '@mui/icons-material/West'
import { LightenOnHoverButton } from '../shared/basic-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const maxContentWidth = '48rem'
const lessonDetailsTimeout = 150

export default function LessonSelect() {
  const { palette } = useTheme()

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

  const selectedLesson = LESSONS.find(
    ({ lessonNumber }) => lessonNumber === selectedLessonNumber
  )

  const [isLessonDetailsVisible, setIsLessonDetailsVisible] = useState(false)

  function handleCloseLessonDetails() {
    setIsLessonDetailsVisible(false)
    setTimeout(() => {
      setSelectedLessonNumber(null)
    }, lessonDetailsTimeout)
  }

  return (
    <Container component='main' maxWidth='lg' sx={{ pt: '2em' }}>
      {selectedLesson === undefined ? (
        <Grid
          container
          sx={{ height: 'fit-content', maxWidth: maxContentWidth }}
        >
          {LESSONS.map(({ lessonNumber, title, tierStatuses }) => (
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
      ) : null}

      <Grow in={isLessonDetailsVisible} timeout={lessonDetailsTimeout}>
        {selectedLesson !== undefined ? (
          <Box maxWidth={maxContentWidth} position='relative'>
            <LightenOnHoverButton
              onClick={() => handleCloseLessonDetails()}
              startIcon={<WestIcon fontSize='small' />}
              sx={{ color: palette.grey[600] }}
            >
              <Typography component='span' textTransform='none'>
                {LESSON_SELECT_TITLE}
              </Typography>
            </LightenOnHoverButton>

            <LessonDetails
              lesson={selectedLesson}
              isCurrentLesson={
                selectedLesson.lessonNumber === currentLessonNumber
              }
            />
          </Box>
        ) : (
          <></>
        )}
      </Grow>
    </Container>
  )
}
