import useTranslation from '../../shared/localization/useTranslation'

export function useSupplementsDemoContent() {
  const strings = useTranslation()

  const { supplementsDemo } = strings.landing.section3

  return {
    glyph: '四',
    keyword: supplementsDemo.four,
    phrases: [
      {
        phraseChinese: '四月',
        phraseHungarian: supplementsDemo.april,
        characters: [
          { pinyin: 'sì', glyph: '四', keyword: supplementsDemo.four },
          { pinyin: 'yuè', glyph: '月', keyword: supplementsDemo.month },
        ],
      },

      {
        phraseChinese: '四边形',
        phraseHungarian: supplementsDemo.quadrilateral,
        characters: [
          { pinyin: 'sì', glyph: '四', keyword: supplementsDemo.four },
          { pinyin: 'biān', glyph: '边', keyword: supplementsDemo.border },
          { pinyin: 'xíng', glyph: '形', keyword: supplementsDemo.shape },
        ],
      },

      {
        phraseChinese: '不三不四',
        phraseHungarian: supplementsDemo.dubious,
        characters: [
          { pinyin: 'bù', glyph: '不', keyword: supplementsDemo.not },
          { pinyin: 'sān', glyph: '三', keyword: supplementsDemo.three },
          { pinyin: 'bù', glyph: '不', keyword: supplementsDemo.not },
          { pinyin: 'sì', glyph: '四', keyword: supplementsDemo.four },
        ],
      },
    ],
    similarMeaning: { glyph: '肆', keyword: supplementsDemo.fourBanking },
    similarAppearance: { glyph: '匹', keyword: supplementsDemo.steed },
  }
}
