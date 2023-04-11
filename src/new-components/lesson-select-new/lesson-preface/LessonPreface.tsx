import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { Stack, useTheme } from '@mui/material'

export default function LessonPreface({ lesson }: { lesson: AssembledLesson }) {
  const { palette } = useTheme()
  const { title, preface } = lesson

  return (
    <Stack boxSizing='border-box' padding={4} sx={{ bgcolor: palette.background.paper, height: '100%', overflowY: 'auto' }}>
      <Typography component='header' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>
    </Stack>
  )
}
