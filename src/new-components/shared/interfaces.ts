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
}

export type SpecialParagraphStyles = {
  color: string
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
  explanation?: string
  primitiveMeaning?: string
  constituents?: string[]
  story: Paragraph[]
  pinyin?: string
  frequency?: number
  otherUses?: string[]
}

/* Story interfaces */

function isValidCharacterKey(string: string) {
  return /\p{Script=Han}/u.test(string)
}

export const StoryParagraphKeys = {
  KEYWORD: 'keyword',
  PRIMITIVE: 'primitive',
  CONSTITUENT: 'constituent',
} as const

const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys

export type Segment =
  | string
  | { [KEYWORD]: string }
  | { [PRIMITIVE]: string }
  | { [CONSTITUENT]: string; references: string }

export type SegmentKey = valueof<typeof StoryParagraphKeys>

export const SpecialParagraphKeys = {
  EXPLANATION: 'explanation',
  TIP: 'tip',
  NOTES: 'notes',
  WHENPRIMITIVE: 'whenPrimitive',
} as const

const { EXPLANATION, TIP, NOTES, WHENPRIMITIVE } = SpecialParagraphKeys

export type SpecialParagraphKey = valueof<typeof SpecialParagraphKeys>

export type SpecialParagraph =
  | { [EXPLANATION]: string | Segment[] }
  | { [TIP]: string | Segment[] }
  | { [NOTES]: string | Segment[] }
  | { [WHENPRIMITIVE]: string | Segment[] }

export type Paragraph = Segment[] | SpecialParagraph
