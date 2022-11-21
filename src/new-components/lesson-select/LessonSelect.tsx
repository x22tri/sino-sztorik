import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Popover from '@mui/material/Popover'
import Grid from '@mui/material/Grid'
import { useRef, useState } from 'react'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import SideNavigation from './SideNavigation'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { Card, Grow, useTheme } from '@mui/material'
import { SideNavigationItem } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import Typography from '@mui/material/Typography'

export default function LessonSelect() {
  const { palette } = useTheme()

  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<SideNavigationItem>(LESSON_SELECT_TITLE)

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<
    number | null
  >(null)
  const [currentLessonNumber] = useState<number>(1)

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
    <Box display='flex'>
      <Box
        // display='grid'
        margin='auto'
        justifyContent='center'
        // gap={6}
        height={`calc(100vh - ${toolbarHeight})`}
        width='1400px'
        sx={{
          display: { xs: 'block', md: 'grid' },
          pt: toolbarHeight,
          px: 2,
          pb: 5,
          background: palette.background.default,
          gridTemplateColumns: 'min-content 1fr',
          gridColumnGap: '5em',
        }}
      >
        <SideNavigation
          {...{ selectedNavigationItem, setSelectedNavigationItem }}
        />

        {/* <Box
          component='main'
          display='grid'
          gridTemplateColumns='3fr 1fr'
          position='relative'
        > */}
        {/* ^ Needed to prevent grid items from being too tall. */}
        {selectedLesson === undefined ? (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={1}
            sx={{
              height: 'fit-content',
              maxWidth: { xs: 'auto', md: '800px' },
              // margin: { xs: '0 auto', md: 'initial' },
              // justifyContent: 'space-evenly',
            }}
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

        {/* <Box sx={{ display: { xs: 'none', lg: 'block' } }}>aa</Box> */}
      </Box>
    </Box>
  )
}
