import { useTheme } from '@mui/material'
import {
  LessonStatus,
  LessonStatuses,
  TierStatuses,
} from '../shared/interfaces'
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

interface LessonCardStyling {
  background: string
  outline: string
  boxShadow: string
  variant: 'outlined' | 'elevation'
}

export function useLessonCardStyling(tierStatuses: TierStatuses) {
  const { palette } = useTheme()

  const colorDictionary: { [key in LessonStatus]?: LessonCardStyling } = {
    [LOCKED]: {
      background: palette.grey[100],
      outline: 'none',
      boxShadow: 'none',
      variant: 'outlined',
    },
    [UPCOMING]: {
      background: palette.background.paper,
      outline: palette.secondary.main,
      boxShadow: `3px 5px ${palette.secondary.main}`,
      variant: 'elevation',
    },
    [COMPLETED]: {
      background: palette.background.paper,
      outline: palette.grey[200],
      boxShadow: `3px 5px ${palette.grey[400]}`,
      variant: 'elevation',
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
