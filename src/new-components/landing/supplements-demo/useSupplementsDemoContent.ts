import useTranslation from '../../shared/localization/useTranslation'

export function useSupplementsDemoContent() {
  const strings = useTranslation()

  const { supplementsDemo } = strings.landing.section3

  return {
    charChinese: '四',
    keyword: supplementsDemo.four,
    phrases: [
      {
        phraseChinese: '四月',
        phraseHungarian: supplementsDemo.april,
        characters: [
          { pinyin: 'sì', charChinese: '四', keyword: supplementsDemo.four },
          { pinyin: 'yuè', charChinese: '月', keyword: supplementsDemo.month },
        ],
      },

      {
        phraseChinese: '四边形',
        phraseHungarian: supplementsDemo.quadrilateral,
        characters: [
          { pinyin: 'sì', charChinese: '四', keyword: supplementsDemo.four },
          { pinyin: 'biān', charChinese: '边', keyword: supplementsDemo.border },
          { pinyin: 'xíng', charChinese: '形', keyword: supplementsDemo.shape },
        ],
      },

      {
        phraseChinese: '不三不四',
        phraseHungarian: supplementsDemo.dubious,
        characters: [
          { pinyin: 'bù', charChinese: '不', keyword: supplementsDemo.not },
          { pinyin: 'sān', charChinese: '三', keyword: supplementsDemo.three },
          { pinyin: 'bù', charChinese: '不', keyword: supplementsDemo.not },
          { pinyin: 'sì', charChinese: '四', keyword: supplementsDemo.four },
        ],
      },
    ],
    similarMeaning: { charChinese: '肆', keyword: supplementsDemo.fourBanking },
    similarAppearance: { charChinese: '匹', keyword: supplementsDemo.steed },
  }
}
