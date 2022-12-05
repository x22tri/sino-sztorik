function isValidCharacterKey(string: string) {
  return /\p{Script=Han}/u.test(string)
}

type KeywordSegment = { keyword: string }

type PrimitiveMeaningSegment = { primitive: string }

type ConstituentSegment = { constituent: string; references: string }

type Segment =
  | string
  | KeywordSegment
  | PrimitiveMeaningSegment
  | ConstituentSegment

export type ExplanationParagraphKey = 'explanation'
export type TipParagraphKey = 'explanation'
export type NotesParagraphKey = 'explanation'
export type PrimitiveNotesParagraphKey = 'explanation'

// const SpecialParagraphKeys = {
//   EXPLANATION: 'explanation',
//   TIP: 'tip',
//   NOTES: 'notes',
//   WHENPRIMITIVE: 'whenPrimitive',
// } as const

type OneKeyIn<K extends keyof any, V, KK extends keyof any = K> = {
  [P in K]: { [Q in P]: V } & { [Q in Exclude<KK, P>]?: never } extends infer O
    ? { [Q in keyof O]: O[Q] }
    : never
}[K]

export type SpecialParagraphKey =
  | 'explanation'
  | 'tip'
  | 'notes'
  | 'whenPrimitive'

type SingletonUnion<K extends PropertyKey, T> = K extends any
  ? { [Key in K]: T }
  : never

export type SpecialParagraphType = SingletonUnion<
  SpecialParagraphKey,
  string | Segment[]
>

export type ExplanationParagraph = SpecialParagraphType & {
  explanation: string | Segment[]
}

export type TipParagraph = SpecialParagraphType & {
  tip: string | Segment[]
}

export type NotesParagraph = SpecialParagraphType & {
  notes: string | Segment[]
}

export type PrimitiveNotesParagraph = SpecialParagraphType & {
  whenPrimitive: string | Segment[]
}

// export type SpecialParagraph =
//   | ExplanationParagraph
//   | TipParagraph
//   | NotesParagraph
//   | PrimitiveNotesParagraph

// export type SpecialParagraph = {
//   [key in keyof typeof SpecialParagraphKeys]: string | Segment[]
// }

// export type SpecialParagraph = OneKeyIn<SpecialParagraphKey, string | Segment[]>

type StoryParagraph = Segment[]

type Paragraph = StoryParagraph | SpecialParagraphType

export type StoryType = Paragraph[]

export const mockStory: StoryType = [
  {
    explanation:
      'A magyarhoz hasonlóan jelentheti azt is, hogy „igaz, helytálló”, és azt is, hogy „csinos”.',
  },
  [
    { constituent: 'Plafont', references: '‾' },
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
