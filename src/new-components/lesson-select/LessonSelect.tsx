import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import SideNavigation from './SideNavigation'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { useTheme } from '@mui/material'
import { SideNavigationItem } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'

export default function LessonSelect() {
  const { palette } = useTheme()

  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<SideNavigationItem>(LESSON_SELECT_TITLE)

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number>(1)
  const [currentLessonNumber] = useState<number>(1)

  const selectedLesson = LESSONS.find(
    ({ lessonNumber }) => lessonNumber === selectedLessonNumber
  )

  const toolbarHeight = '48px'

  return (
    <Box
      display='flex'
      justifyContent='center'
      gap={4}
      height='100vh'
      sx={{
        pt: toolbarHeight,
        px: 2,
        background: palette.background.default,
      }}
    >
      <SideNavigation
        {...{ selectedNavigationItem, setSelectedNavigationItem }}
      />

      <Box component='main'>
        <Grid container rowSpacing={2} columnSpacing={1}>
          {LESSONS.map(({ lessonNumber, title, tierStatuses }) => (
            <LessonCard
              key={lessonNumber}
              {...{
                lessonNumber,
                title,
                tierStatuses,
                selectedLessonNumber,
                setSelectedLessonNumber,
                currentLessonNumber,
              }}
            />
          ))}
        </Grid>
      </Box>

      {selectedLesson && (
        <LessonDetails
          lesson={selectedLesson}
          isCurrentLesson={selectedLesson.lessonNumber === currentLessonNumber}
        />
      )}
    </Box>
  )
}
