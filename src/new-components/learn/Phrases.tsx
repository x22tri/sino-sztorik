import { Fragment } from 'react'
import Box from '@mui/material/Box'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { ChineseCharLink } from './chinese-char-link/ChineseCharLink'

const MOCK_PHRASES = [
  { phraseChinese: '正好', phraseHungarian: 'pont jó' },
  { phraseChinese: '真正', phraseHungarian: 'valódi' },
  { phraseChinese: '光明正大', phraseHungarian: 'tisztességes, elvhű' },
  { phraseChinese: '正视', phraseHungarian: 'szemtől szemben kiáll ellene' },
  { phraseChinese: '正则', phraseHungarian: 'szabályos (síkidom)' },
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
      {MOCK_PHRASES.map(({ phraseChinese, phraseHungarian }, index) => (
        <Fragment key={index}>
          <Box display='flex' gap={0.25}>
            {phraseChinese.split('').map((char, charIndex) => (
              <ChineseCharLink key={charIndex} {...{ char }}></ChineseCharLink>
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </Box>
  )
}
