import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { Stack } from '@mui/material'
import { PrevNextButtons } from '../../learn/char-navigation/PrevNextButtons'
import { isDisabledLesson } from '../../shared/utility-functions'

export default function LessonPreface({
  nextLesson,
  lesson,
  prevLesson,
}: {
  nextLesson: AssembledLesson | undefined
  lesson: AssembledLesson
  prevLesson: AssembledLesson | undefined
}) {
  const { title, preface } = lesson

  return (
    <Stack boxSizing='border-box' component='main' sx={{ bgcolor: 'background.paper', height: '100%', overflowY: 'auto', p: 4 }}>
      <Typography component='header' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>

      <PrevNextButtons prev={getLessonTitleIfActive(prevLesson)} next={getLessonTitleIfActive(nextLesson)} />
    </Stack>
  )
}

function getLessonTitleIfActive(lesson: AssembledLesson | undefined) {
  return lesson && !isDisabledLesson(lesson.tierStatuses) ? lesson.title : null
}
