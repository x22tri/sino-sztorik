import { Fragment } from 'react'
import { Box } from '@mui/material'
import { ChineseCharLink } from '../chinese-char-link/ChineseCharLink'
import { Phrase } from '../../shared/interfaces'

export function Phrases({ currentChar, phrases }: { currentChar: string; phrases: Phrase[] }) {
  return (
    <>
      {phrases.map(({ characters, phraseHungarian }, index) => (
        <Fragment key={index}>
          <Box display='flex'>
            {characters.map(({ charChinese, keyword, pinyin, primitiveMeaning }, charIndex) => (
              <ChineseCharLink key={charIndex} {...{ charChinese, currentChar, keyword, pinyin, primitiveMeaning }} />
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </>
  )
}
