import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import LessonCard from './LessonCard'

import {
  LEARN_BUTTON,
  REVIEW_BUTTON,
  LESSON_SELECT_TITLE,
  CHARACTER_AMOUNT_LABEL,
} from '../shared/strings'

import LESSONS from '../shared/MOCK_LESSONS'
import { useTheme } from '@mui/material'
import Drawer from '@mui/material/Drawer/Drawer'

function LessonSelect() {
  const { palette } = useTheme()

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number>(1)
  const [currentLessonNumber] = useState<number>(1)

  const selectedLesson = LESSONS.find(
    ({ lessonNumber }) => lessonNumber === selectedLessonNumber
  )

  const toolbarHeight = '48px'

  return (
    <>
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        a
      </Drawer> */}
      <Box
        display='flex'
        justifyContent='center'
        gap={4}
        sx={{
          pt: toolbarHeight,
          px: 2,
          background: palette.background.default,
        }}
      >
        {/* <Grid
          container
          maxWidth='1200px'
          mx={2}
          spacing={3}
          justifyContent='center'
        > */}
        {/* <Grid item xs={12}>
          <Typography variant='h3' my={3}>
            {LESSON_SELECT_TITLE}
          </Typography>
        </Grid> */}
        {/* <Grid item>{LESSON_SELECT_TITLE}</Grid> */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {LESSON_SELECT_TITLE}
        </Box>
        <Box>
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
        <Box
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          flexDirection='column'
          width='300px'
          // To-Do: On xs and sm, appears on click
        >
          {selectedLesson && ( // To-Do: Extract this into LessonDetails component
            <Box
              display='flex'
              flexDirection='column'
              component='aside'
              width='100%'
              flexGrow={2}
              sx={{
                backgroundColor: palette.background.paper,
                borderRadius: '16px',
                p: 2,
              }}
            >
              <Box textAlign='center' fontSize='large' fontWeight='bold'>
                {selectedLesson.title}
              </Box>
              <Box sx={{ my: 3 }}>{selectedLesson.preface}</Box>
              <Box
                display='flex'
                width='100%'
                gap='20px'
                justifyContent='center'
                sx={{
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                {selectedLesson.lessonNumber === currentLessonNumber && (
                  <Button variant='contained' color='secondary'>
                    {LEARN_BUTTON}
                  </Button>
                )}
                <Button variant='outlined' color='primary'>
                  {REVIEW_BUTTON}
                </Button>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>
                {selectedLesson.characters.length} {CHARACTER_AMOUNT_LABEL}
              </Box>
              <Box display='flex' gap='4px' justifyContent='center'>
                {selectedLesson.characters.map(char => (
                  <Box component='span' key={char}>
                    {char}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
        {/* </Grid> */}
      </Box>
    </>
  )
}

export default LessonSelect
