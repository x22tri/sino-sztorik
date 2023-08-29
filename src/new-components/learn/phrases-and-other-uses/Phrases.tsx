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
            {characters.map(({ glyph, keyword, pinyin, primitive }, charIndex) => (
              <ChineseCharLink key={charIndex} {...{ glyph, currentChar, keyword, pinyin, primitive }} />
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </>
  )
}
