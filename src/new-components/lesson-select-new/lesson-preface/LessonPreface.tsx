import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { Stack, useTheme } from '@mui/material'
import { PrevNextButtons } from '../../shared/components/PrevNextButtons'
import { isDisabledLesson } from '../../shared/utility-functions'

export default function LessonPreface({
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
  const { title, preface } = lesson

  return (
    <Stack
      boxSizing='border-box'
      component='main'
      display='grid'
      gridTemplateRows='max-content auto max-content'
      sx={{
        bgcolor: 'background.paper',
        p: 4,
        mt: `${toolbarHeight}px`,
        mb: constants.lessonStartHeight,
        minHeight: `calc(100vh - ${toolbarHeight}px - ${constants.lessonStartHeight})`,
        width: 1,
      }}
    >
      <Typography component='header' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>

      <PrevNextButtons prev={getTitleIfActive(prevLesson)} next={getTitleIfActive(nextLesson)} />
    </Stack>
  )
}

function getTitleIfActive(lesson: AssembledLesson | undefined) {
  return lesson && !isDisabledLesson(lesson.tierStatuses) ? lesson.title : null
}
