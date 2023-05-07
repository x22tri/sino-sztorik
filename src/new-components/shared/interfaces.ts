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
import { StateCreator } from 'zustand'

export const LessonStatuses = {
  NOT_IN_TIER: LESSON_NOT_IN_TIER,
  LOCKED: LESSON_LOCKED,
  UPCOMING: LESSON_UPCOMING,
  COMPLETED: LESSON_COMPLETED,
} as const

export type valueof<T> = T[keyof T]

export type Slice<A, B> = StateCreator<A & B, [], [], A>
export type ThreeWaySlice<A, B, C> = StateCreator<A & B & C, [], [], A>

export type LessonStatus = (typeof LessonStatuses)[keyof typeof LessonStatuses]

export const SideNavigationItems = {
  LESSON_SELECT: LESSON_SELECT_TITLE,
  CHARACTER_SEARCH: CHARACTER_SEARCH_TITLE,
} as const

export type SideNavigationItem = (typeof SideNavigationItems)[keyof typeof SideNavigationItems]

export type TierStatuses = [LessonStatus, LessonStatus, LessonStatus, LessonStatus]

export type NoteStyles = {
  color: string
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
  characters: Character[]
}

export type UseKeydownAction = { on: string; do: () => void }

export interface Phrase {
  phraseChinese: string
  phraseHungarian: string
  characters: (Pick<Character, 'keyword' | 'primitiveMeaning'> & Pick<Character, 'charChinese'> & Pick<Character, 'pinyin'>)[]
}

export type Constituent = Pick<Character, 'keyword' | 'primitiveMeaning'> & Pick<Character, 'charChinese'>

export interface Character {
  charChinese: string
  constituents?: Constituent[]
  explanation?: string
  frequency?: number
  keyword?: string
  newPrimitive?: boolean
  id: number
  otherUses?: string[]
  phrases?: Phrase[]
  pinyin?: string
  prequel?: boolean
  productivePhonetic?: boolean
  primitiveMeaning?: string
  reminder?: boolean
  story: Paragraph[]
}

/* Chips interfaces */

export const ChipIds = {
  FREQUENCY: 'frequency',
  NEW_PRIMITIVE: 'newPrimitive',
  REMINDER: 'reminder',
  PRODUCTIVE_PHONETIC: 'productivePhonetic',
  PREQUEL: 'prequel',
} as const

export type ChipId = valueof<typeof ChipIds>

export interface ChipType {
  id: ChipId
  icon: IconDefinition
  label: string
  explanation: string
}

/* Story interfaces */

export const StoryParagraphKeys = {
  KEYWORD: 'keyword',
  PRIMITIVE: 'primitive',
  CONSTITUENT: 'constituent',
} as const

const { KEYWORD, PRIMITIVE, CONSTITUENT } = StoryParagraphKeys

export type Segment = string | { [KEYWORD]: string } | { [PRIMITIVE]: string } | { [CONSTITUENT]: string; references: string }

export type SegmentKey = valueof<typeof StoryParagraphKeys>

export const NoteKeys = {
  GENERIC: 'generic',
  TIP: 'tip',
  WHENPRIMITIVE: 'whenPrimitive',
} as const

export type NoteKey = valueof<typeof NoteKeys>

export interface Note {
  noteTitle?: string
  noteText: string | Segment[]
  noteType?: NoteKey
}

export type Paragraph = Segment[] | Note
