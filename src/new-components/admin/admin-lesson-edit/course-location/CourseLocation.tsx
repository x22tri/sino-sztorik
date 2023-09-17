import { Box, Typography } from '@mui/material'

export function CourseLocation({ tier, lessonNumber }: { tier: number; lessonNumber: number }) {
  return (
    <Typography alignSelf='center' component='span' px={1} variant='button'>
      {tier}/{lessonNumber}
    </Typography>
  )
}
