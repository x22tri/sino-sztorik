import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { Stack } from '@mui/material'

export default function LessonPreface({ lesson }: { lesson: AssembledLesson }) {
  const { title, preface } = lesson

  return (
    <Stack boxSizing='border-box' component='main' sx={{ bgcolor: 'background.paper', height: '100%', overflowY: 'auto', p: 4 }}>
      <Typography component='header' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>
    </Stack>
  )
}
