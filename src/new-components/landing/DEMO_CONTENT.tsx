import { Character } from '../shared/interfaces'

export type DemoContentRelationshipChar = Pick<Character, 'keyword' | 'charChinese'>
type DemoContentRelationships = { children?: DemoContentRelationshipChar[]; parents?: DemoContentRelationshipChar[] }
export type DemoContentChar = Pick<Character, 'keyword' | 'charChinese' | 'story'> & DemoContentRelationships

export const demoContent: DemoContentChar[] = [
  {
    charChinese: '月',
    children: [{ charChinese: '朋', keyword: 'társ' }],
    keyword: 'hold',
    story: [['A ', { keyword: 'hold' }, ' stilizált képe. Éppen dagadófélben van, hiszen D alakú.']],
  },
  {
    charChinese: '朋',
    children: [{ charChinese: '崩', keyword: 'összeomlik' }],
    keyword: 'társ',
    parents: [
      { charChinese: '月', keyword: 'hold' },
      { charChinese: '月', keyword: 'hold' },
    ],
    story: [
      [
        'A ',
        { constituent: 'hold', references: '月' },
        ' igazából nem kerek, hanem félgömb alakú. De van egy ',
        { keyword: 'társa' },
        ', egy másik félgömb alakú ',
        { constituent: 'hold', references: '月' },
        '. Félholdkor a mi ',
        { constituent: 'holdunk', references: '月' },
        ' egyedül van, de utána minden éjszaka meglátogatja a ',
        { keyword: 'társa' },
        ' – csak elbújik a mi ',
        { constituent: 'holdunk', references: '月' },
        ' mögé, így nem látni teljesen. Minden éjjel egyre jobban előbújik, míg végül teliholdkor egymás mellé kerül a két ',
        { keyword: 'társ' },
        ', kiadva egy egész kört.',
      ],
    ],
  },
  {
    charChinese: '山',
    children: [{ charChinese: '崩', keyword: 'összeomlik' }],
    keyword: 'hegy',
    story: [['Egy ', { keyword: 'hegy' }, ' stilizált képe.']],
  },
  {
    charChinese: '崩',
    keyword: 'összeomlik',
    parents: [
      { charChinese: '山', keyword: 'hegy' },
      { charChinese: '朋', keyword: 'társ' },
    ],
    story: [
      [
        'Két bányász',
        { constituent: 'társ', references: '朋' },
        ' felett a ',
        { constituent: 'hegy', references: '山' },
        ' egyszer elkezdett ',
        { keyword: 'összeomlani' },
        '. Rájöttek: ha egyikük megtartja a ',
        { constituent: 'hegyet', references: '山' },
        ', hogy lelassítsa az ',
        { keyword: 'összeomlást' },
        ', a másik kimenekülhet.',
      ],
      [
        'De egyik sem volt hajlandó kimenekülni a másik élete árán – így a két ',
        { constituent: 'társ', references: '朋' },
        ' megfogta egymás kezét és hagyta, hogy a ',
        { constituent: 'hegy', references: '山' },
        ' ',
        { keyword: 'összeomoljon' },
        ' körülöttük, agyonnyomva mind a kettőt.',
      ],
    ],
  },
]
