import { useTheme, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function CourseLocation({ tier, lessonNumber, index }: { tier: number; lessonNumber: number; index: number }) {
  const { spacing } = useTheme()

  return (
    <Link
      component={RouterLink}
      to={`/admin/lessons/${lessonNumber}`}
      underline='none'
      sx={{ borderRadius: spacing(0.5), width: 'max-content' }}
    >
      {tier}. kör / {lessonNumber}. lecke / {index}. karakter
    </Link>
  )
}
