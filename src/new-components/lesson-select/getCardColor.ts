import { useTheme } from '@mui/material'
import { LessonStatuses, TierStatuses } from '../shared/interfaces'
const { UPCOMING, COMPLETED, LOCKED } = LessonStatuses

export function findLastEligibleTier(tierStatuses: TierStatuses): number {
  const upcomingIndex = tierStatuses.findIndex(
    tierStatus => tierStatus === UPCOMING
  )

  if (upcomingIndex !== -1) {
    return upcomingIndex
  }

  const lastCompletedLesson = [...tierStatuses]
    .reverse()
    .findIndex(tierStatus => tierStatus === COMPLETED) // findLastIndex seems to not be supported.

  if (lastCompletedLesson !== -1) {
    return tierStatuses.length - lastCompletedLesson - 1
  }

  const firstExistingLesson = tierStatuses.findIndex(
    tierStatus => tierStatus === LOCKED
  )

  if (firstExistingLesson !== -1) {
    return firstExistingLesson
  }

  return 0
}

export function useLessonCardStyling(tierStatuses: TierStatuses) {
  const { palette } = useTheme()

  const colorDictionary = {
    [LOCKED]: {
      background: palette.grey[100],
      outline: palette.primary.main,
      boxShadow: 'none',
    },
    [UPCOMING]: {
      background: palette.background.paper,
      outline: palette.primary.main,
      boxShadow: `4px 6px ${palette.secondary.dark}`,
    },
    [COMPLETED]: {
      background: palette.background.paper,
      outline: palette.primary.light,
      boxShadow: `3px 5px ${palette.grey[400]}`,
    },
  }

  if (tierStatuses.includes(UPCOMING)) {
    return colorDictionary[UPCOMING]
  }

  if (tierStatuses.includes(COMPLETED)) {
    return colorDictionary[COMPLETED]
  }

  return colorDictionary[LOCKED]
}

export function isLocked(tierStatuses: TierStatuses): boolean {
  return !tierStatuses.includes(UPCOMING) && !tierStatuses.includes(COMPLETED)
}
