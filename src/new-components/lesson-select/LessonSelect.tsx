import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonSelectContent from './lesson-select-content/LessonSelectContent'
import { useLoaderData, useParams } from 'react-router-dom'
import { useDrawer } from '../shared/hooks/useDrawer'
import { Box, Stack, useTheme } from '@mui/material'
import { SideNav } from '../shared/components/SideNav'
import { When } from 'react-if'
import { CharacterPreviews } from './lesson-start/CharacterPreviews'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { LoadLessonSelect } from '../shared/route-loaders/loadLessonSelect'
import { PrevNextLinks } from '../shared/components/PrevNextLinks'
import { LearnReviewButton } from './lesson-start/LearnReviewButton'

export default function LessonSelect() {
  const { constants } = useTheme()
  const isLargeScreen = useLargeScreen()
  const params = useParams<{ lessonNumber: string }>()
  const lessonNumber = Number(params.lessonNumber)
  const { isDrawerOpen, toggleDrawer } = useDrawer()
  const { nextLesson, prevLesson, selectedLesson } = useLoaderData() as LoadLessonSelect
  const { characters, tierStatuses } = selectedLesson

  return (
    <>
      <LessonSelectAppbar {...{ toggleDrawer }} />

      <Box
        display='grid'
        margin='auto'
        sx={{
          maxWidth: constants.maxContentWidth,
          gridTemplate: { xs: `"main" / auto`, md: `"nav main" / ${constants.drawerWidth}px auto` },
        }}
      >
        <Box component='nav' gridArea='nav'>
          <SideNav
            content={<LessonPickerContent {...{ toggleDrawer }} />}
            title={<LessonPickerTitle />}
            selected={lessonNumber - 1}
            {...{ isDrawerOpen, toggleDrawer }}
          />
        </Box>

        <Stack component='main' gridArea='main' px={{ xs: 3, md: 6 }} py={3}>
          <LessonSelectContent
            {...{ selectedLesson }}
            navigation={
              <PrevNextLinks
                middleElement={<LearnReviewButton />}
                prevTitle={prevLesson?.title}
                prevTo={`/lessons/${prevLesson?.lessonNumber}`}
                nextTitle={nextLesson?.title}
                nextTo={`/lessons/${nextLesson?.lessonNumber}`}
              />
            }
          />
        </Stack>
      </Box>
    </>
  )
}
