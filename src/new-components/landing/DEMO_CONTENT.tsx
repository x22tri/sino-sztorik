export const DEMO_CONTENT = [
  {
    charChinese: '麻',
    children: ['磨'],
    keyword: 'kender',
    parents: ['广', '林'],
    story: [
      [
        'Mivel a ',
        { keyword: 'kender' },
        ' egyes fajtái kábítószernek minősülnek, el kell rejtőznie annak, aki termeszteni akarja.',
      ],
      [
        'Ezt látjuk e karakteren is: egy sötét ',
        { constituent: 'barlang', references: '广' },
        ' legmélyén rejlik egy „',
        { constituent: 'liget', references: '林' },
        '”, de fák helyett itt ',
        { keyword: 'kender' },
        ' terem.',
      ],
    ],
  },
  {
    charChinese: '磨',
    keyword: 'köszörül',
    parents: ['麻', '石'],
    story: [
      [
        'E karakteren egy fifikás kábítószer-kereskedőt látunk, aki úgy próbál plusz haszonra szert tenni, hogy egy ',
        { constituent: 'kövön', references: '石' },
        'mindenféle növényt',
        { constituent: 'kender', references: '麻' },
        'formájúra',
        { keyword: 'köszörül' },
      ],
      [
        'Legyen bár lapulevél, lóhere vagy sás, ő addig-addig',
        { keyword: 'köszörüli' },
        'amíg meg nem kapja a',
        { constituent: 'kender', references: '麻' },
        ' jellegzetesen hegyes, recés alakját. A vevők úgysem nézik.',
      ],
    ],
  },
  {
    charChinese: '月',
    children: ['朋'],
    keyword: 'hold',
    story: [['A ', { keyword: 'hold' }, ' stilizált képe. Éppen dagadófélben van, hiszen D alakú.']],
  },
  {
    charChinese: '朋',
    children: ['崩'],
    keyword: 'társ',
    parents: ['月', '月'],
    story: [
      ['Miért csökken és dagad a ', { constituent: 'hold', references: '月' }, '?'],
      [
        'Nos, a ',
        { constituent: 'hold', references: '月' },
        ' igazából nem kerek, hanem félgömb alakú. De van egy ',
        { keyword: 'társa' },
        ', egy másik félgömb alakú ',
        { constituent: 'hold', references: '月' },
        '. Félholdkor a mi ',
        { constituent: 'holdunk', references: '月' },
        ' egyedül van, de utána minden éjjel meglátogatja a ',
        { keyword: 'társa' },
        ' – csak egy kicsit elbújik a mi ',
        { constituent: 'holdunk', references: '月' },
        'mögé, így nem látni teljesen.',
      ],
      ['Végül teliholdkor egymás mellé kerül a két ', { keyword: 'társ' }, ', kiadva egy egész kört.'],
    ],
  },
  {
    charChinese: '山',
    children: ['崩'],
    keyword: 'hegy',
    story: [['Egy ', { keyword: 'hegy' }, ' stilizált képe.']],
  },
  {
    charChinese: '崩',
    keyword: 'összeomlik',
    parents: ['山', '朋'],
    story: [
      [
        'Két bányász',
        { constituent: 'társ', references: '朋' },
        ' felett a ',
        { constituent: 'hegy', references: '山' },
        ' egyszer elkezdett ',
        { keyword: 'összeomlani' },
        '.',
      ],
      [
        'Tudták: egyiküknek meg kell tartania a ',
        { constituent: 'hegyet', references: '山' },
        ', hogy lelassítsa az ',
        { keyword: 'összeomlást' },
        ', míg a másik kimenekül.',
      ],
      [
        'De egyik sem volt hajlandó kimenekülni – így a két ',
        { constituent: 'társ', references: '朋' },
        'megfogta egymás kezét és hagyta, hogy a ',
        { constituent: 'hegy', references: '山' },
        { keyword: 'összeomoljon' },
        'körülöttük, agyonnyomva mind a kettőt.',
      ],
    ],
  },
]
