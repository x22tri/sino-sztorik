import { useTheme } from '@mui/material'
import { LessonStatuses, TierStatuses } from './interfaces'

const { UPCOMING, COMPLETED } = LessonStatuses

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function isDisabledLesson(tierStatuses: TierStatuses) {
  return !(tierStatuses.includes(UPCOMING) || tierStatuses.includes(COMPLETED))
}

export function useNavButtonStyling() {
  const { constants } = useTheme()

  return {
    transition: `${constants.animationDuration}ms`,
    '@media (hover: hover)': { '&:hover': { backgroundColor: 'transparent', color: 'grey[500]', cursor: 'pointer' } },
    '&:active': { backgroundColor: 'transparent', color: 'primary.main' },
  }
}
