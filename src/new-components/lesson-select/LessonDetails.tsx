import Typography from '@mui/material/Typography'
import { AssembledLesson } from '../shared/interfaces'
import { useLargeScreen, useSmallScreen } from '../shared/utility-functions'
import { Stack, useTheme } from '@mui/material'

export default function LessonDetails({ lesson }: { lesson: AssembledLesson }) {
  const { constants, palette } = useTheme()

  const { title, preface } = lesson

  const isSmallScreen = useSmallScreen()

  const isLargeScreen = useLargeScreen()

  return (
    <Stack
      borderRadius={2}
      boxSizing='border-box'
      margin={isSmallScreen ? 0 : 2}
      marginTop={isSmallScreen ? 1 : 2}
      padding={isSmallScreen ? 1 : 3}
      sx={{
        backgroundColor: palette.background.paper,
        boxShadow: isSmallScreen
          ? 'rgba(0, 0, 0, 0.1) 0px 20px 15px -15px'
          : 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        height: isSmallScreen
          ? `calc(100% - ${constants.lessonStartBottomHeight} - 16px)`
          : !isLargeScreen
          ? `calc(100% - ${constants.lessonStartBottomHeight} - 36px)`
          : 'calc(100% - 36px)',
        overflowY: 'auto',
      }}
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
