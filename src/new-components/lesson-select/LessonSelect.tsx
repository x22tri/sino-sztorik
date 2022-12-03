import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { Card, Grow, useTheme } from '@mui/material'
import { LessonStatuses, SideNavigationItem } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

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

  const toolbarHeight = '64px'
  const lessonDetailsTimeout = 150

  return (
    <Container
      component='main'
      maxWidth='lg'
      sx={{
        height: `calc(100vh - ${toolbarHeight})`,
        pt: '2em',
      }}
    >
      {selectedLesson === undefined ? (
        <Grid
          container
          rowSpacing={3}
          columnSpacing={2}
          sx={{ margin: 'auto', height: 'fit-content' }}
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
          <Card
            sx={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              maxWidth: { xs: 'auto', md: '800px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
              onClick={() => handleCloseLessonDetails()}
            >
              X
            </Box>

            <LessonDetails
              lesson={selectedLesson}
              isCurrentLesson={
                selectedLesson.lessonNumber === currentLessonNumber
              }
            />
          </Card>
        ) : (
          <></>
        )}
      </Grow>
    </Container>
  )
}
