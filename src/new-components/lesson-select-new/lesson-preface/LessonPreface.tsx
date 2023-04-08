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
      borderRadius={2}
      boxSizing='border-box'
      margin={isSmallScreen ? 0 : 2}
      marginTop={isSmallScreen ? 1 : 2}
      padding={3}
      sx={{
        backgroundColor: palette.background.paper,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        maxHeight: isLargeScreen ? height : undefined,
        height: isLargeScreen ? undefined : height,
        overflowY: 'auto',
      }}
    >
      <Typography component='header' margin={1} textAlign='center' variant='h4'>
        {title}
      </Typography>

      <Typography component='p' marginTop={2} variant='body1'>
        {preface}
      </Typography>
    </Stack>
  )
}
