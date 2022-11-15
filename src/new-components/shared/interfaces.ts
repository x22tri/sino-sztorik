import {
  LESSON_NOT_IN_TIER,
  LESSON_LOCKED,
  LESSON_UPCOMING,
  LESSON_COMPLETED,
  LESSON_SELECT_TITLE,
  CHARACTER_SEARCH_TITLE,
} from './strings'

export const LessonStatuses = {
  NOT_IN_TIER: LESSON_NOT_IN_TIER,
  LOCKED: LESSON_LOCKED,
  UPCOMING: LESSON_UPCOMING,
  COMPLETED: LESSON_COMPLETED,
} as const

export type LessonStatus = typeof LessonStatuses[keyof typeof LessonStatuses]

export const SideNavigationItems = {
  LESSON_SELECT: LESSON_SELECT_TITLE,
  CHARACTER_SEARCH: CHARACTER_SEARCH_TITLE,
} as const

export type SideNavigationItem =
  typeof SideNavigationItems[keyof typeof SideNavigationItems]

export type TierStatuses = [
  LessonStatus,
  LessonStatus,
  LessonStatus,
  LessonStatus
]

export interface AssembledLesson {
  lessonNumber: number
  title: string
  preface: string
  tierStatuses: TierStatuses
  characters: string[]
}
