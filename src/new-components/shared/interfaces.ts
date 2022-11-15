import {
  LESSON_NOT_IN_TIER,
  LESSON_LOCKED,
  LESSON_UPCOMING,
  LESSON_COMPLETED,
} from './strings'

export const LessonStatuses = {
  NOT_IN_TIER: LESSON_NOT_IN_TIER,
  LOCKED: LESSON_LOCKED,
  UPCOMING: LESSON_UPCOMING,
  COMPLETED: LESSON_COMPLETED,
} as const

export type LessonStatus = typeof LessonStatuses[keyof typeof LessonStatuses]

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
