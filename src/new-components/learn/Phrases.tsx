import { Fragment } from 'react'
import Box from '@mui/material/Box'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { ChineseCharLink } from './chinese-char-link/ChineseCharLink'
import { Phrase } from '../shared/interfaces'

export function Phrases({ lessonChar, phrases }: { lessonChar: string; phrases: Phrase[] }) {
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
      {phrases.map(({ characters, phraseHungarian }, index) => (
        <Fragment key={index}>
          <Box display='flex' gap={0.25}>
            {characters.map(({ charChinese, keyword, pinyin, primitiveMeaning }, charIndex) => (
              <ChineseCharLink
                key={charIndex}
                {...{ charChinese, lessonChar, keyword, pinyin, primitiveMeaning }}
              ></ChineseCharLink>
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </Box>
  )
}
