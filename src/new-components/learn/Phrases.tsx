import { Fragment } from 'react'
import Box from '@mui/material/Box'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { ChineseCharLink } from './chinese-char-link/ChineseCharLink'
import { Phrase } from '../shared/interfaces'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { Theme, useMediaQuery } from '@mui/material'

export function Phrases({ currentChar, phrases }: { currentChar: string; phrases: Phrase[] }) {
  const isMediumScreen = useMediaQuery(({ breakpoints }: Theme) => breakpoints.between('sm', 'lg'))

  return (
    <Box
      alignItems='baseline'
      display='grid'
      columnGap={5}
      paddingX={2}
      rowGap={2}
      sx={{ gridTemplateColumns: `repeat(${isMediumScreen ? 2 : 1}, max-content auto)` }}
    >
      {phrases.map(({ characters, phraseHungarian }, index) => (
        <Fragment key={index}>
          <Box display='flex' gap={0.25}>
            {characters.map(({ charChinese, keyword, pinyin, primitiveMeaning }, charIndex) => (
              <ChineseCharLink key={charIndex} {...{ charChinese, currentChar, keyword, pinyin, primitiveMeaning }} />
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </Box>
  )
}
