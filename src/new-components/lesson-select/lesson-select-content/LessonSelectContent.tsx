import Typography from '@mui/material/Typography'
import { Stack, useTheme } from '@mui/material'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { When } from 'react-if'
import { CharacterPreviews } from '../lesson-start/CharacterPreviews'
import { useLoaderData } from 'react-router-dom'
import { LoadLessonSelect } from '../../shared/logic/loadLessonSelect'
import { PrevNextLinks } from '../../shared/components/PrevNextLinks'
import { LESSON_SELECT_PATH } from '../../shared/paths'

export default function LessonSelectContent({ toolbarHeight }: { toolbarHeight: number }) {
  const isLargeScreen = useLargeScreen()
  const { constants } = useTheme()
  const { nextLesson, prevLesson, selectedLesson } = useLoaderData() as LoadLessonSelect
  const { characters, title, preface } = selectedLesson

  return (
    <Stack
      boxSizing='border-box'
      component='main'
      columnGap={6}
      display='grid'
      marginTop={`${toolbarHeight}px`}
      marginBottom={constants.bottomToolbarHeight}
      minHeight={`calc(100vh - ${toolbarHeight}px - ${constants.bottomToolbarHeight})`}
      padding={2}
      sx={{
        bgcolor: 'background.paper',
        grid: {
          xs: `"title" max-content
               "preface" auto
               "prev-next" max-content
               / auto`,
          lg: `"title chars-title" max-content
               "preface chars" auto
               "prev-next prev-next" max-content 
               / 3fr 1fr`,
        },
      }}
    >
      <Typography gridArea='title' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' gridArea='preface' marginTop={2}>
        {preface}
      </Typography>

      <When condition={isLargeScreen && characters.length}>
        <CharacterPreviews {...{ characters }} />
      </When>

      <PrevNextLinks
        prevTitle={prevLesson?.title}
        prevTo={`${LESSON_SELECT_PATH}/${prevLesson?.lessonNumber}`}
        nextTitle={nextLesson?.title}
        nextTo={`${LESSON_SELECT_PATH}/${nextLesson?.lessonNumber}`}
      />
    </Stack>
  )
}
