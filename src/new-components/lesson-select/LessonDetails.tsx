import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../shared/interfaces'
import { useSmallScreen } from '../shared/utility-functions'
import { Stack, useTheme } from '@mui/material'

export default function LessonDetails({ lesson }: { lesson: AssembledLesson }) {
  const { palette } = useTheme()

  const { title, preface } = lesson

  return (
    <Stack
      border={`1px solid ${palette.grey[300]}`}
      borderRadius={2}
      paddingX={useSmallScreen() ? 1 : 2}
      paddingY={1}
      sx={{ backgroundColor: palette.background.paper }}
    >
      <Typography component='header' variant='h4' textAlign='center' margin={1}>
        {title}
      </Typography>

      <Typography component='p' variant='body1' marginY={3}>
        {preface}
      </Typography>
    </Stack>
  )
}
