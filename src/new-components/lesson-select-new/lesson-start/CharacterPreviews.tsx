import { Box, Typography } from '@mui/material'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { Character } from '../../shared/interfaces'

const charWidth = '42px'
const minNumberOfColumns = 4
const maxNumberOfColumns = 6

export function CharacterPreviews({ characters }: { characters: Character[] }) {
  return (
    <>
      <Typography gridArea='chars-title' marginX='auto' textAlign='center' variant='overline'>
        {characters.length} {CHARACTER_AMOUNT_LABEL}
      </Typography>

      <Box display='flex' flexDirection='column' gridArea='chars' sx={{ borderRadius: ({ spacing }) => spacing(3) }}>
        <Box
          display='grid'
          gridTemplateColumns={`repeat(auto-fit, minmax(min(100%/${minNumberOfColumns}, max(${charWidth}, 100%/${maxNumberOfColumns})), 1fr))`}
          columnGap={1}
          rowGap={2}
          marginTop={2}
          marginX={2}
        >
          {characters.map(({ charChinese }) => (
            <Typography
              key={charChinese}
              component='span'
              variant='chineseText'
              sx={{ bgcolor: 'grey.50', borderRadius: 2, m: 'auto', maxWidth: charWidth, p: 1 }}
            >
              {charChinese}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  )
}
