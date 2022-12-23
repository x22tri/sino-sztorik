import { Character } from '../shared/interfaces'

export const CHARS: Character[] = [
  {
    id: 1,
    charChinese: '一',
    keyword: 'egy',
    primitiveMeaning: 'plafon, padló',
    story: [
      [
        'Az ',
        { keyword: 'egy' },
        ' kínai jele épp olyan, mint a római ',
        { keyword: 'egy' },
        ' (I), de 90 fokkal elforgatva.',
      ],
      {
        whenPrimitive: [
          'Mivel az ',
          { keyword: '„egy”' },
          ' fogalmát nehéz történetbe építeni, gyakran ',
          { primitive: 'plafonnak' },
          ' vagy ',
          { primitive: 'padlónak' },
          ' hívjuk majd, attól függően, másik alapelem felett vagy alatt áll-e.',
        ],
      },
    ],
    frequency: 2,
    pinyin: 'yī',
  },
  {
    id: 2,
    charChinese: '止',
    keyword: 'megáll',
    primitiveMeaning: 'lábnyom',
    story: [
      [
        'Egy bal láb képe, ami azt jelképezi, hogy valaki itt elég sokáig ',
        { keyword: 'megállt' },
        ' ahhoz, hogy a ',
        { primitive: 'lábnyoma' },
        ' ott maradjon.',
      ],
    ],
    frequency: 596,
    pinyin: 'zhǐ',
  },
  {
    id: 3,
    constituents: ['一', '止'],
    charChinese: '正',
    keyword: 'helyes',
    story: [
      {
        explanation:
          'A magyarhoz hasonlóan jelentheti azt, hogy „igaz, helytálló”, de azt is, hogy „csinos”.',
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
    ],
    primitiveMeaning: 'ortopéd cipő',
    frequency: 129,
    pinyin: 'zhèng',
    otherUses: ['kijavít', 'holdhónap első napja'],
  },
  {
    id: 4,
    constituents: ['讠', '正'],
    charChinese: '证',
    keyword: 'bizonyíték',
    story: [
      [
        'Az 1990-es években Amerikában nagy port kavart OJ Simpson pere, akit azzal vádoltak, hogy megölte feleségét és annak egy barátját.',
      ],
      [
        'Végül felmentették, ebben pedig nagy szerepe volt ügyvédje záróbeszédének, amelyben azok a híressé vált szavak hangzottak el ',
        { keyword: 'bizonyíték' },
        ' gyanánt, hogy „Ha nem megy fel, mentsed fel!"',
      ],
      [
        'Ezzel arra utalt, hogy Simpson alig tudta belepasszírozni a kezét abba a kesztyűbe, amelyet elvileg a gyilkos viselt.',
      ],
      [
        'Ezen a karakteren hasonló dolog történik: az ügyvéd ',
        { constituent: 'szavai', references: '讠' },
        ', miszerint „ha nem megy védencemre az ',
        { constituent: 'ortopéd cipő', references: '正' },
        ', ártatlan”, egyértelmű ',
        { keyword: 'bizonyítékot' },
        ' szolgáltatnak a bíróságon.',
      ],
    ],
    frequency: 373,
    pinyin: 'zhèng',
  },
]
