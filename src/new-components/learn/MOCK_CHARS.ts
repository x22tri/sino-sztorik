import { Character } from '../shared/interfaces'

export const CHARS: Character[] = [
  {
    id: 1,
    charChinese: '一',
    keyword: 'egy',
    primitiveMeaning: 'plafon, padló',
    story: `Az egy kínai jele épp olyan, mint a római egy (I), de 90 fokkal elforgatva.
(Ha alapelemként használjuk, gyakran nem „egy” jelentésben használjuk, hiszen ez túlságosan elvont.
Ehelyett – mivel egy vízszintes vonás – leginkább „plafonnak” vagy „padlónak” hívjuk majd: ha egy másik alapelem fölött áll, akkor plafonnak, ha alatta, padlónak.
Néha nem lesz más választásunk, mint hogy megtartsuk a karakter tényleges jelentését. Ilyenkor ki fogjuk hangsúlyozni, hogy „egyetlen” dologról van szó.)`,
    frequency: 2,
    pinyin: 'yī',
  },
  {
    id: 2,
    charChinese: '止',
    // keyword: 'megáll',
    primitiveMeaning: 'lábnyom',
    story: `Egy bal láb képe, ami azt jelképezi, hogy valaki itt elég sokáig megállt ahhoz, hogy a lábnyoma ott maradjon.`,
    frequency: 596,
    pinyin: 'zhǐ',
  },
  {
    id: 3,
    constituents: ['一', '止'],
    charChinese: '正',
    keyword: 'helyes',
    story: `Plafont szab a lábnyomnak egy vonás – ez egy zárt, lyukacsos gyógypapucsot, azaz egy ortopéd cipőt jelképez. 
Az ilyeneket lúdtalp ellen szokták hordani, hogy a láb helyes formáját megőrizze. 
Könnyen megjegyezhető, ha csak arra gondolunk: az „ortopéd” szó jelentése „helyes láb”, mint ahogy az „ortográfia” a „helyes írás”.`,
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
    story: `Az 1990-es években Amerikában nagy port kavart OJ Simpson pere, akit azzal vádoltak, hogy megölte feleségét és annak egy barátját. 
Végül felmentették, ebben pedig nagy szerepe volt ügyvédje záróbeszédének, amelyben azok a híressé vált szavak hangzottak el bizonyíték gyanánt, hogy „Ha nem megy fel, mentsed fel!" 
Ezzel arra utalt, hogy Simpson alig tudta belepasszírozni a kezét abba a kesztyűbe, amelyet elvileg a gyilkos viselt.
Ezen a karakteren hasonló dolog történik: az ügyvéd szavai, miszerint „ha nem megy védencemre az ortopéd cipő, ártatlan”, egyértelmű bizonyítékot szolgáltatnak a bíróságon.`,
    frequency: 373,
    pinyin: 'zhèng',
  },
]
