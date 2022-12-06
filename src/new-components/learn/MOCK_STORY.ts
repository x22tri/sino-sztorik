function isValidCharacterKey(string: string) {
  return /\p{Script=Han}/u.test(string)
}

type KeywordSegment = { keyword: string }

type PrimitiveMeaningSegment = { primitive: string }

type ConstituentSegment = { constituent: string; references: string }

export type Segment =
  | string
  | KeywordSegment
  | PrimitiveMeaningSegment
  | ConstituentSegment

export type ExplanationParagraphKey = 'explanation'
export type TipParagraphKey = 'explanation'
export type NotesParagraphKey = 'explanation'
export type PrimitiveNotesParagraphKey = 'explanation'

export const SpecialParagraphKeys = {
  EXPLANATION: 'explanation',
  TIP: 'tip',
  NOTES: 'notes',
  WHENPRIMITIVE: 'whenPrimitive',
} as const

export type SpecialParagraphKey =
  typeof SpecialParagraphKeys[keyof typeof SpecialParagraphKeys]

export type ExplanationParagraph = {
  [SpecialParagraphKeys.EXPLANATION]: string | Segment[]
}

export type TipParagraph = {
  [SpecialParagraphKeys.TIP]: string | Segment[]
}

export type NotesParagraph = {
  [SpecialParagraphKeys.NOTES]: string | Segment[]
}

export type PrimitiveNotesParagraph = {
  [SpecialParagraphKeys.WHENPRIMITIVE]: string | Segment[]
}

export type SpecialParagraph =
  | ExplanationParagraph
  | TipParagraph
  | NotesParagraph
  | PrimitiveNotesParagraph

type StoryParagraph = Segment[]

type Paragraph = StoryParagraph | SpecialParagraph
// | ExplanationParagraph
// | NotesParagraph
// | TipParagraph
// | PrimitiveNotesParagraph

export type StoryType = Paragraph[]

export const mockStory: StoryType = [
  {
    explanation:
      'A magyarhoz hasonlóan jelentheti azt is, hogy „igaz, helytálló”, és azt is, hogy „csinos”.',
  },
  [
    { constituent: 'Plafont', references: '一' },
    ' szab a ',
    { constituent: 'lábnyomnak', references: '止' },
    ' egy vonás – ez egy zárt, lyukacsos gyógypapucsot, azaz egy ',
    { primitive: 'ortopéd cipőt' },
    ' jelképez.',
  ],
  [
    'Az ilyeneket lúdtalp ellen szokták hordani, hogy a láb ',
    { keyword: 'helyes' },
    'formáját megőrizze.',
  ],
  [
    'Könnyen megjegyezhető, ha csak arra gondolunk: az „ortopéd” szó jelentése „',
    { keyword: 'helyes' },
    'láb”, mint ahogy az „ortográfia” a „',
    { keyword: 'helyes' },
    'írás”.',
  ],
]

export {}
