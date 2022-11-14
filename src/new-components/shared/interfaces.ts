import {
  LESSON_NOT_IN_TIER,
  LESSON_LOCKED,
  LESSON_UPCOMING,
  LESSON_COMPLETED,
} from './strings'

const LessonStatuses = {
  NOT_IN_TIER: LESSON_NOT_IN_TIER,
  LOCKED: LESSON_LOCKED,
  UPCOMING: LESSON_UPCOMING,
  COMPLETED: LESSON_COMPLETED,
} as const

type LessonStatus = typeof LessonStatuses[keyof typeof LessonStatuses]

type TierStatuses = [LessonStatus, LessonStatus, LessonStatus, LessonStatus]

export { LessonStatuses }
export type { LessonStatus, TierStatuses }
