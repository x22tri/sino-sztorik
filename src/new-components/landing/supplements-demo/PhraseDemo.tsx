import { Box, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Unless } from 'react-if'
import { ReferencedChar } from '../../shared/interfaces'

export function PhraseDemo({ characters, phraseHungarian }: { characters: ReferencedChar[]; phraseHungarian: string }) {
  return (
    <Box py={2} sx={{ borderTop: ({ palette }) => `1px solid ${palette.grey[300]}` }}>
      <Box display='flex' flexDirection='row' maxWidth='30ch' mx='auto'>
        {characters.map(({ charChinese, keyword }, charIndex) => (
          <Fragment key={charIndex}>
            <Unless condition={charIndex === 0}>
              <Typography component='span' color='grey.300'>
                +
              </Typography>
            </Unless>

            <Box display='flex' width={1} textAlign='center' flexDirection='column'>
              <Typography component='span' gridArea='char' variant='chineseText'>
                {charChinese}
              </Typography>

              <Typography component='span' gridArea='char' variant='h5' fontWeight='bold'>
                {keyword}
              </Typography>
            </Box>
          </Fragment>
        ))}
      </Box>

      <Box textAlign='center' typography='h5' pt={1}>
        {phraseHungarian}
      </Box>
    </Box>
  )
}
