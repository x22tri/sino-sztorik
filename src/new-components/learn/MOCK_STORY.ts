import { valueof } from '../shared/interfaces'

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

export type StoryType = Paragraph[]

export const mockStory: StoryType = [
  {
    explanation:
      'A magyarhoz hasonlóan jelentheti azt, hogy „igaz, helytálló”, és azt is, hogy „csinos”.',
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
    ' formáját megőrizze.',
  ],
  [
    'Könnyen megjegyezhető, ha csak arra gondolunk: az „ortopéd” szó jelentése „',
    { keyword: 'helyes' },
    ' láb”, mint ahogy az „ortográfia” a „',
    { keyword: 'helyes' },
    ' írás”.',
  ],
]

export {}
