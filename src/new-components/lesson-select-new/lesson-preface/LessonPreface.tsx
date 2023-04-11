import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Stack, useTheme } from '@mui/material'

export default function LessonPreface({ lesson }: { lesson: AssembledLesson }) {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { constants, palette, spacing } = useTheme()
  const { title, preface } = lesson
  const height = `calc(100% - ${spacing(isSmallScreen ? 2 : 4)} ${isLargeScreen ? '' : `- ${constants.lessonStartMobileHeight}`})`

  return (
    <Stack
      boxSizing='border-box'
      padding={4}
      sx={{
        backgroundColor: palette.background.paper,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography component='header' textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>
    </Stack>
  )
}
