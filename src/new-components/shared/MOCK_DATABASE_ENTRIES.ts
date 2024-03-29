export interface CharacterEntryV2 {
  glyph: string
  lessonNumber: number
  phrases?: number[]
  similars?: number[]
  constituents?: string[]
  frequency?: number
  keyword?: string
  occurrences: Occurrence[]
  otherUses?: { pinyin: string; meanings: string[] }[]
  pinyin?: string
  primitive?: string
}

export type OtherUse = { pinyin: string; meanings: string[] }

export interface CharacterEntryV3 {
  glyph: string
  explanation?: string
  lessonNumber: number
  phrases?: number[]
  similars?: number[]
  constituents?: string[]
  frequency?: number
  keyword?: string
  occurrences: OccurrenceV3[]
  otherUses?: OtherUse[]
  pinyin?: string
  primitive?: string
  productivePinyin?: boolean
}

export interface Occurrence {
  index: number
  story?: (string | { constituent: string; references: string } | { keyword: string } | { primitive: string })[][]
  tier: number
  type: OccurrencePresentation
}

export type OccurrenceV3 =
  | FullOccurrence
  | ReminderOccurrence
  | WithheldKeywordOccurrence
  | WithheldPrimitiveOccurrence
  | WithheldConstituentsOccurrence

export type OccurrenceType = 'full' | 'reminder' | 'withheldKeyword' | 'withheldPrimitive' | 'withheldConstituents'

export type OccurrencePresentation = 'keyword' | 'keywordAndPrimitive' | 'keywordLite' | 'primitive' | 'reminder' | 'unset'

export type SortedOccurrence = OccurrenceV3 | UnsetOccurrence

export interface UnsetOccurrence {
  tier: number
}

export interface SetOccurrence extends UnsetOccurrence {
  index: number
}

export interface FullOccurrence extends SetOccurrence {
  story: (string | { constituent: string; references: string } | { keyword: string } | { primitive: string })[][]
}

export interface ReminderOccurrence extends SetOccurrence {}

export interface WithheldKeywordOccurrence extends SetOccurrence {
  withhold: 'keyword'
  story: (string | { constituent: string; references: string } | { primitive: string })[][]
}

export interface WithheldPrimitiveOccurrence extends SetOccurrence {
  withhold: 'primitive'
  story: (string | { constituent: string; references: string } | { keyword: string })[][]
}

export interface WithheldConstituentsOccurrence extends SetOccurrence {
  withhold: 'constituents'
  story: (string | { keyword: string })[][]
}

export type WithheldOccurrence = WithheldKeywordOccurrence | WithheldPrimitiveOccurrence | WithheldConstituentsOccurrence

export interface CharacterEntry {
  // blueprint: Blueprint
  glyph: string
  lessonNumber: number
  phrases?: number[]
  similars?: number[]
  variants: CharacterEntryVariant[]
}

export interface CharacterEntryVariant {
  constituents?: string[]
  frequency?: number
  index: number
  keyword?: string
  otherUses?: { pinyin: string; meanings: string[] }[]
  pinyin?: string
  primitive?: string
  reminder?: boolean
  story?: (string | { constituent: string; references: string } | { keyword: string } | { primitive: string })[][]
  tier: number
}

export const CHAR_ENTRY_V3: CharacterEntryV3 = {
  glyph: '早',
  constituents: ['日', '十'], // Call getUnlockedMeanings before presenting to the user.
  frequency: 462,
  lessonNumber: 2,
  keyword: 'korai',
  occurrences: [
    {
      index: 11,
      tier: 1,
      story: [
        [
          `Egy `,
          { constituent: 'nap', references: '日' },
          `, amely egy `,
          { constituent: 'tűn', references: '十' },
          ` pihen meg – gyakorlatilag ilyen egy napraforgó, annak vékony szárával és ragyogó virágával.`,
        ],
        [
          `Ismeretes, hogy azért hívjuk a napraforgót napraforgónak, mert követi a `,
          { constituent: 'nap', references: '日' },
          ` mozgását – magyarán, a kertben a `,
          { constituent: 'nap', references: '日' },
          ` erre a virágra süt a leg`,
          { keyword: 'korábban' },
          `. Nem csoda hát, hogy a karakter jelentése `,
          { keyword: '„korai”' },
          `.`,
        ],
      ],
      withhold: 'primitive',
    },
    {
      index: 8,
      tier: 2,
      story: [
        [
          `Egy `,
          { constituent: 'nap', references: '日' },
          `, amely egy `,
          { constituent: 'tűn', references: '十' },
          ` pihen meg – gyakorlatilag ilyen egy `,
          { primitive: 'napraforgó' },
          `, annak vékony szárával és ragyogó virágával.`,
        ],
        [
          `Ismeretes, hogy azért hívjuk a `,
          { primitive: 'napraforgót napraforgónak' },
          `, mert követi a `,
          { constituent: 'nap', references: '日' },
          ` mozgását – magyarán, a kertben a `,
          { constituent: 'nap', references: '日' },
          ` erre a virágra süt a leg`,
          { keyword: 'korábban' },
          `. Nem csoda hát, hogy a karakter jelentése `,
          { keyword: '„korai”' },
          `.`,
        ],
      ],
    },
    {
      index: 2,
      tier: 4,
    },
  ],
  otherUses: [
    { pinyin: 'zhèng', meanings: ['test1', 'test2'] },
    { pinyin: 'zhēng', meanings: ['test3'] },
  ],
  phrases: [1, 2], // An array of phrase ID's.
  pinyin: 'zӑo',
  primitive: 'napraforgó',
  similars: [3], // An array of "similar" ID's.
}

export const MOCK_CHARS_IN_TIER_1 = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '口', '日', '月', '田', '目']

export const MOCK_CHARS_IN_TIER_2 = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '凹', '凸']

export const LESSON_ENTRIES: LessonEntry[] = [
  {
    characters: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '口', '日', '月', '田', '目', '凹', '凸'], // Call getUnlockedMeanings upon hover.
    lessonNumber: 1,
    title: 'Első lépések',
    variants: [
      { preface: 'Lorem ipsum tier 1', tier: 1 },
      { preface: 'Lorem ipsum tier 2', tier: 2 },
    ],
  },
  {
    characters: ['朋', '明', '昌', '唱', '晶', '品', '叱', '叶', '古', '咕', '胡', '吾', '世', '旭', '早'],
    lessonNumber: 2,
    title: 'Több, mint a részek összege',
    variants: [
      { preface: 'Lorem ipsum tier 1', tier: 1 },
      { preface: 'Lorem ipsum tier 2', tier: 2 },
    ],
  },
  {
    characters: ['古', '咕', '早'],
    lessonNumber: 3,
    title: 'Vízszintes és függőleges',
    variants: [
      { preface: 'Lorem ipsum tier 1', tier: 1 },
      { preface: 'Lorem ipsum tier 2', tier: 2 },
    ],
  },
]

export type LessonCharReference = { glyph: string; tiers: number[] }

export type LessonVariant = { preface: string; tier: number }

export interface LessonEntry {
  characters: string[]
  lessonNumber: number
  title: string
  variants: LessonVariant[]
}

export const LESSON_ENTRY: LessonEntry = {
  characters: ['朋', '明', '昌', '唱', '晶', '品', '叱', '叶', '古', '咕', '胡', '吾', '世', '旭', '早'],
  lessonNumber: 2,
  title: 'Több, mint a részek összege',
  variants: [
    { preface: 'Lorem ipsum tier 1', tier: 1 },
    { preface: 'Lorem ipsum tier 2', tier: 2 },
  ],
}

const PHRASE_ENTRY = {
  characters: [
    { glyph: '早', pinyin: 'zǎo' }, // Call getUnlockedMeanings before presenting to the user in Character Finder.
    { glyph: '安', pinyin: 'ān' },
  ],
  meaning: 'jó reggelt',
  id: 1,
  unlockedAt: { tier: 1, lesson: 12, index: 19 },
}
// When creating or updating the entry, get each character's first occurrence. The last of these is set as unlockedAt.

const SIMILAR_ENTRY = {
  characters: [
    { glyph: '妻', pinyin: 'qī', unlockedAt: { tier: 1, lesson: 53, index: 11 } },
    { glyph: '安', pinyin: 'ān', similarToPrimitive: true, unlockedAt: { tier: 2, lesson: 12, index: 18 } }, // First occurrence of primitive
  ],
  id: 1,
  type: 'meaning',
}
// When querying from Character Finder, find keyword and primitive among variants user is eligible for.
// Keywords and primitive meanings are guaranteed to not change once introduced, so a later entry can't override a previous one.
// This will need to be a reusable method ("getUnlockedMeanings") as constituents in the characters DB will also use it.
// The "keyword + primitive" combo is christened "meanings".

const SIMILAR_ENTRY_2 = {
  characters: [
    { glyph: '的', pinyin: 'de', unlockedAt: { tier: 1, lesson: 5, index: 10 } }, // Call getUnlockedMeanings.
    { glyph: '其', pinyin: 'qí', unlockedAt: { tier: 1, lesson: 80, index: 6 } },
    { glyph: '之', pinyin: 'zhī', unlockedAt: { tier: 1, lesson: 56, index: 5 } },
  ],
  id: 2,
  type: 'meaning',
}

const SIMILAR_ENTRY_3 = {
  characters: [
    { glyph: '早', pinyin: 'zǎo', unlockedAt: { tier: 1, lesson: 2, index: 11 } },
    { glyph: '晨', pinyin: 'chén', unlockedAt: { tier: 2, lesson: 90, index: 2 } },
  ],
  id: 3,
  type: 'meaning',
}

const SIMILAR_ENTRY_4 = {
  characters: [
    { glyph: '叨', pinyin: 'dāo', unlockedAt: { tier: 2, lesson: 6, index: 3 } },
    { glyph: '召', pinyin: 'zhào', unlockedAt: { tier: 2, lesson: 6, index: 5 } },
  ],
  id: 3,
  type: 'appearance',
}

const USER_ENTRY = {
  email: 'email@email.com',
  id: 1,
  lessonNumber: 2,
  name: 'Name',
  password: 'hashedpw',
  tier: 1,
}
