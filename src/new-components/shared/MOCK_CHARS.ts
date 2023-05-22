import { Character } from './interfaces'

export const CHARS: Character[] = [
  {
    charChinese: '一',
    frequency: 2,
    id: 1,
    keyword: 'egy',
    pinyin: 'yī',
    primitiveMeaning: 'plafon, padló',
    reminder: true,
    similarMeaning: [{ charChinese: '壹', keyword: 'egyes' }],
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
    charChinese: '止',
    frequency: 596,
    id: 2,
    keyword: 'megáll',
    newPrimitive: true,
    phrases: [
      {
        phraseChinese: '停止',
        phraseHungarian: 'abbahagy; abbamarad',
        characters: [
          { pinyin: 'tíng', charChinese: '停', keyword: 'leáll' },
          { pinyin: 'zhĭ', charChinese: '止', keyword: 'megáll', primitiveMeaning: 'lábnyom' },
        ],
      },
    ],

    pinyin: 'zhĭ',
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
  },
  {
    charChinese: '正',
    constituents: [
      {
        charChinese: '一',
        keyword: 'egy',
        primitiveMeaning: 'plafon, padló',
      },
      {
        charChinese: '止',
        keyword: 'megáll',
        primitiveMeaning: 'lábnyom',
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
        phraseChinese: '正好',
        phraseHungarian: 'pont jó',
        characters: [
          { pinyin: 'zhèng', charChinese: '正', keyword: 'helyes', primitiveMeaning: 'ortopéd cipő' },
          { pinyin: 'hăo', charChinese: '好', keyword: 'jó' },
        ],
      },
      {
        phraseChinese: '真正',
        phraseHungarian: 'valódi',
        characters: [
          { pinyin: 'zhēn', charChinese: '真', keyword: 'tényleg', primitiveMeaning: 'hazugságvizsgáló' },
          { pinyin: 'zhèng', charChinese: '正', keyword: 'helyes', primitiveMeaning: 'ortopéd cipő' },
        ],
      },
      {
        phraseChinese: '光明正大',
        phraseHungarian: 'tisztességes, elvhű',
        characters: [
          { pinyin: 'guāng', charChinese: '光', keyword: 'sugár' },
          { pinyin: 'míng', charChinese: '明', keyword: 'világos' },
          { pinyin: 'zhèng', charChinese: '正', keyword: 'helyes', primitiveMeaning: 'ortopéd cipő' },
          { pinyin: 'dà', charChinese: '大', keyword: 'nagy', primitiveMeaning: 'bernáthegyi' },
        ],
      },
      {
        phraseChinese: '正视',
        phraseHungarian: 'szemtől szemben kiáll ellene',
        characters: [
          { pinyin: 'zhèng', charChinese: '正', keyword: 'helyes', primitiveMeaning: 'ortopéd cipő' },
          { pinyin: 'shì', charChinese: '视', keyword: 'megszemlél' },
        ],
      },
      {
        phraseChinese: '正则',
        phraseHungarian: 'szabályos (síkidom)',
        characters: [
          { pinyin: 'zhèng', charChinese: '正', keyword: 'helyes', primitiveMeaning: 'ortopéd cipő' },
          { pinyin: 'zé', charChinese: '则', keyword: 'szabály' },
        ],
      },
    ],
    primitiveMeaning: 'ortopéd cipő',
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
    charChinese: '证',
    constituents: [
      { charChinese: '讠', primitiveMeaning: 'szavak' },
      { charChinese: '正', keyword: 'helyes', primitiveMeaning: 'ortopéd cipő' },
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
        ' gyanánt, hogy „Ha nem megy fel, mentsed fel!"',
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
