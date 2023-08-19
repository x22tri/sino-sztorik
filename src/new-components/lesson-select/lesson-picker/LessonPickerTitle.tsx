import { Typography } from '@mui/material'
import { LESSON_SELECT_TITLE } from '../../shared/strings'

export function LessonPickerTitle() {
  return (
    <Typography variant='h5' fontWeight='bold' p={2} pb={1}>
      {LESSON_SELECT_TITLE}
    </Typography>
  )
}
