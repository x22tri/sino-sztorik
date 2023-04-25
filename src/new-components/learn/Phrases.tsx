import { Fragment } from 'react'
import Box from '@mui/material/Box'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { ChineseCharLink } from './chinese-char-link/ChineseCharLink'

const MOCK_PHRASES = [
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
]

export function Phrases() {
  const isSmallScreen = useSmallScreen()

  return (
    <Box
      alignItems='baseline'
      display='grid'
      columnGap={5}
      paddingX={2}
      rowGap={2}
      sx={{ gridTemplateColumns: `repeat(${isSmallScreen ? 1 : 2}, max-content auto)` }}
    >
      {MOCK_PHRASES.map(({ characters, phraseHungarian }, index) => (
        <Fragment key={index}>
          <Box display='flex' gap={0.25}>
            {characters.map(({ charChinese, keyword, pinyin, primitiveMeaning }, charIndex) => (
              <ChineseCharLink key={charIndex} {...{ charChinese, keyword, pinyin, primitiveMeaning }}></ChineseCharLink>
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </Box>
  )
}
