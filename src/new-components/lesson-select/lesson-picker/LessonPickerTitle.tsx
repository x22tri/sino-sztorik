import { Box, Typography, useTheme } from '@mui/material'
import { LESSON_SELECT_TITLE } from '../../shared/strings'

export function LessonPickerTitle() {
  const { palette } = useTheme()

  return (
    <Box p={2} pb={1}>
      <Typography variant='h5' fontWeight='bold'>
        {LESSON_SELECT_TITLE}
      </Typography>
    </Box>
  )
}
