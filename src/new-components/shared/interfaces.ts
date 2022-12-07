import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { CSSProperties } from 'react'
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

export type valueof<T> = T[keyof T]

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

export interface SpecialParagraphPalette {
  main: string
  text: string
  background: string
}

export type SpecialParagraphStyles = {
  colors: SpecialParagraphPalette
  icon: IconDefinition
  title: string
}

export type SegmentStyles = {
  fontStyle: CSSProperties
  tooltip?: string
}

export interface AssembledLesson {
  lessonNumber: number
  title: string
  preface: string
  tierStatuses: TierStatuses
  characters: string[]
}

export interface Character {
  id: number
  charChinese: string
  keyword?: string
  primitiveMeaning?: string
  constituents?: string[]
  story: string
  pinyin?: string
  frequency?: number
  otherUses?: string[]
}
