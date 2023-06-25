import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export function CourseLocation({
  tier,
  lessonNumber,
  indexInLesson,
}: {
  tier: number
  lessonNumber: number
  indexInLesson: number
}) {
  return (
    <Button
      component={Link}
      to={`/admin/lessons/${lessonNumber}`}
      variant='text'
      size='small'
      sx={{ alignSelf: 'center', height: 'fit-content' }}
    >
      {tier}/{lessonNumber}/{indexInLesson}
    </Button>
  )
}
