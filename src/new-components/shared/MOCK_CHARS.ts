import { Character } from './interfaces'

export const CHARS: Character[] = [
  {
    glyph: '一',
    frequency: 2,
    id: 1,
    keyword: 'egy',
    pinyin: 'yī',
    primitive: 'plafon, padló',
    reminder: true,
    similarMeaning: [{ glyph: '壹', keyword: 'egyes' }],
    story: [
      [
        'Az ',
        { keyword: 'egy' },
        ' kínai jele ',
        { keyword: 'egy' },
        ' vízszintes vonás. Vagy, ha úgy tetszik, a római ',
        { keyword: 'egy' },
        ' (I), de 90 fokkal elforgatva.',
      ],
      {
        noteType: 'whenPrimitive',
        noteText: [
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
  },
  {
    glyph: '止',
    frequency: 596,
    id: 2,
    keyword: 'megáll',
    newPrimitive: true,
    phrases: [
      {
        characters: [
          { pinyin: 'tíng', glyph: '停', keyword: 'leáll' },
          { pinyin: 'zhĭ', glyph: '止', keyword: 'megáll', primitive: 'lábnyom' },
        ],
        translation: 'abbahagy; abbamarad',
      },
    ],

    pinyin: 'zhĭ',
    primitive: 'lábnyom',
    story: [
      [
        'Egy bal láb képe, ami azt jelképezi, hogy valaki itt elég sokáig ',
        { keyword: 'megállt' },
        ' ahhoz, hogy a ',
        { primitive: 'lábnyoma' },
        ' ott maradjon.',
      ],
    ],
  },
  {
    glyph: '正',
    constituents: [
      {
        glyph: '一',
        keyword: 'egy',
        primitive: 'plafon, padló',
      },
      {
        glyph: '止',
        keyword: 'megáll',
        primitive: 'lábnyom',
      },
    ],
    explanation: 'A magyarhoz hasonlóan jelentheti azt, hogy „igaz, helytálló”, de azt is, hogy „csinos”.',
    frequency: 129,
    id: 3,
    keyword: 'helyes',
    otherUses: [
      { pinyin: 'zhèng', meanings: ['kijavít', 'épp'] },
      { pinyin: 'zhēng', meanings: ['holdév első hónapja'] },
    ],
    pinyin: 'zhèng',
    phrases: [
      {
        characters: [
          { pinyin: 'zhèng', glyph: '正', keyword: 'helyes', primitive: 'ortopéd cipő' },
          { pinyin: 'hăo', glyph: '好', keyword: 'jó' },
        ],
        translation: 'pont jó',
      },
      {
        characters: [
          { pinyin: 'zhēn', glyph: '真', keyword: 'tényleg', primitive: 'hazugságvizsgáló' },
          { pinyin: 'zhèng', glyph: '正', keyword: 'helyes', primitive: 'ortopéd cipő' },
        ],
        translation: 'valódi',
      },
      {
        characters: [
          { pinyin: 'guāng', glyph: '光', keyword: 'sugár' },
          { pinyin: 'míng', glyph: '明', keyword: 'világos' },
          { pinyin: 'zhèng', glyph: '正', keyword: 'helyes', primitive: 'ortopéd cipő' },
          { pinyin: 'dà', glyph: '大', keyword: 'nagy', primitive: 'bernáthegyi' },
        ],
        translation: 'tisztességes, elvhű',
      },
      {
        characters: [
          { pinyin: 'zhèng', glyph: '正', keyword: 'helyes', primitive: 'ortopéd cipő' },
          { pinyin: 'shì', glyph: '视', keyword: 'megszemlél' },
        ],
        translation: 'szemtől szemben kiáll ellene',
      },
      {
        characters: [
          { pinyin: 'zhèng', glyph: '正', keyword: 'helyes', primitive: 'ortopéd cipő' },
          { pinyin: 'zé', glyph: '则', keyword: 'szabály' },
        ],
        translation: 'szabályos (síkidom)',
      },
    ],
    primitive: 'ortopéd cipő',
    productivePhonetic: true,
    story: [
      [
        { constituent: 'Plafont', references: '一' },
        ' szab a ',
        { constituent: 'lábnyomnak', references: '止' },
        ' egy vonás – ez egy zárt, lyukacsos gyógypapucsot, azaz egy ',
        { primitive: 'ortopéd cipőt' },
        ' jelképez.',
      ],
      ['Az ilyet lúdtalp ellen szokták hordani, hogy a láb ', { keyword: 'helyes' }, ' formáját megőrizze.'],
      [
        'Talán segíthet a szó etimológiája is: az „ortopéd” szó jelentése „',
        { keyword: 'helyes' },
        ' láb”, mint ahogy az „ortográfia” a „',
        { keyword: 'helyes' },
        ' írás”.',
      ],
    ],
  },
  {
    glyph: '证',
    constituents: [
      { glyph: '讠', primitive: 'szavak' },
      { glyph: '正', keyword: 'helyes', primitive: 'ortopéd cipő' },
    ],
    frequency: 373,
    id: 4,
    keyword: 'bizonyíték',
    pinyin: 'zhèng',
    prequel: true,
    story: [
      [
        'Az 1990-es években Amerikában nagy port kavart OJ Simpson pere, akit azzal vádoltak, hogy megölte feleségét és annak egy barátját.',
      ],
      [
        'Végül felmentették, ebben pedig nagy szerepe volt ügyvédje záróbeszédének, amelyben azok a híressé vált szavak hangzottak el ',
        { keyword: 'bizonyíték' },
        ' gyanánt, hogy „Ha nem megy fel, mentsed fel!”',
      ],
      ['Ezzel arra utalt, hogy Simpson alig tudta belepasszírozni a kezét abba a kesztyűbe, amelyet elvileg a gyilkos viselt.'],
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
  },
]
