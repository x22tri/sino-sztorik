import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../../shared/interfaces'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Stack, useTheme } from '@mui/material'

export default function LessonDetails({ lesson }: { lesson: AssembledLesson }) {
  const { constants, palette, spacing } = useTheme()

  const { title, preface } = lesson

  const isSmallScreen = useSmallScreen()

  const isLargeScreen = useLargeScreen()

  const height = `calc(100% 
    - ${spacing(isSmallScreen ? 2 : 4)} 
    - ${isLargeScreen ? '0px' : constants.lessonStartBottomHeight})`

  return (
    <Stack
      borderRadius={2}
      boxSizing='border-box'
      margin={isSmallScreen ? 0 : 2}
      marginTop={isSmallScreen ? 1 : 2}
      padding={3}
      sx={{
        backgroundColor: palette.background.paper,
        boxShadow: isSmallScreen
          ? 'rgba(0, 0, 0, 0.1) 0px 20px 15px -15px'
          : 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        height,
        overflowY: 'auto',
      }}
    >
      <Typography component='header' variant='h4' textAlign='center' margin={1}>
        {title}
      </Typography>

      <Typography component='p' variant='body1' marginTop={2}>
        {preface}
      </Typography>
    </Stack>
  )
}
