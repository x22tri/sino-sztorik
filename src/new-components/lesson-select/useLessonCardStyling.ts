import { useTheme } from '@mui/material'
import {
  LessonStatus,
  LessonStatuses,
  TierStatuses,
} from '../shared/interfaces'
const { UPCOMING, COMPLETED, LOCKED } = LessonStatuses

interface LessonCardStyling {
  backgroundColor?: string
  borderColor?: string
  boxShadow?: string
}

export function useLessonCardStyling(tierStatuses: TierStatuses) {
  const { palette } = useTheme()

  const colorDictionary: { [key in LessonStatus]?: LessonCardStyling } = {
    [LOCKED]: {
      backgroundColor: palette.grey[100],
      borderColor: palette.grey[300],
      boxShadow: 'none',
    },
    [UPCOMING]: {
      borderColor: palette.secondary.main,
      boxShadow: `3px 5px ${palette.secondary.dark}`,
    },
    [COMPLETED]: {}, // Default styles apply.
  }

  if (tierStatuses.includes(UPCOMING)) {
    return colorDictionary[UPCOMING]
  }

  if (tierStatuses.includes(COMPLETED)) {
    return colorDictionary[COMPLETED]
  }

  return colorDictionary[LOCKED]
}
