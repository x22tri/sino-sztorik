import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { Box, Stack, useTheme } from '@mui/material'
import { PrevNextButtons } from '../../shared/components/PrevNextButtons'
import { isDisabledLesson } from '../../shared/utility-functions'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { When } from 'react-if'
import { CharacterPreviews } from '../lesson-start/CharacterPreviews'

export default function LessonSelectContent({
  nextLesson,
  lesson,
  prevLesson,
  toolbarHeight,
}: {
  nextLesson: AssembledLesson | undefined
  lesson: AssembledLesson
  prevLesson: AssembledLesson | undefined
  toolbarHeight: number | undefined
}) {
  const { constants } = useTheme()
  const isLargeScreen = useLargeScreen()
  const { characters, title, preface } = lesson

  return (
    <Stack
      boxSizing='border-box'
      component='main'
      display='grid'
      sx={{
        bgcolor: 'background.paper',
        gridTemplateColumns: { xs: 'auto', lg: '3fr 1fr' },
        gridTemplateRows: 'max-content auto max-content',
        gridTemplateAreas: {
          xs: `"title" "preface" "prev-next"`,
          lg: `"title chars-title" "preface chars" "prev-next prev-next"`,
        },
        columnGap: 2,
        p: 4,
        mt: `${toolbarHeight}px`,
        mb: constants.lessonStartHeight,
        minHeight: `calc(100vh - ${toolbarHeight}px - ${constants.lessonStartHeight})`,
        width: 1,
      }}
    >
      <Typography gridArea='title' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography gridArea='preface' component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>

      <When condition={isLargeScreen && characters.length}>
        <CharacterPreviews {...{ characters }} />
      </When>

      <PrevNextButtons prev={getTitleIfActive(prevLesson)} next={getTitleIfActive(nextLesson)} />
    </Stack>
  )
}

function getTitleIfActive(lesson: AssembledLesson | undefined) {
  return lesson && !isDisabledLesson(lesson.tierStatuses) ? lesson.title : null
}
