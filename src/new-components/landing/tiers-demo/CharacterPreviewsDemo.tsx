import { Box, Typography } from '@mui/material'
import { TiersDemoCharacter } from './TiersDemo'

const charWidth = '42px'
const minNumberOfColumns = 4
const maxNumberOfColumns = 8

export function CharacterPreviewsDemo({ characters, currentTier }: { characters: TiersDemoCharacter[]; currentTier: number }) {
  return (
    <Box display='flex' flexDirection='column' maxWidth='48ch' margin='auto' sx={{ borderRadius: ({ spacing }) => spacing(3) }}>
      <Box
        display='grid'
        gridTemplateColumns={`repeat(auto-fit, minmax(min(100%/${minNumberOfColumns}, max(${charWidth}, 100%/${maxNumberOfColumns})), 1fr))`}
        columnGap={1}
        rowGap={2}
        marginTop={2}
        marginX={2}
      >
        {characters.map(({ charChinese, tier }) => (
          <Typography
            key={charChinese}
            component='span'
            className='disable-select'
            variant='chineseText'
            sx={{
              bgcolor: tier <= currentTier ? 'grey.50' : 'transparent',
              color: tier <= currentTier ? 'text.primary' : 'transparent',
              borderRadius: 2,
              border: ({ palette }) => (tier <= currentTier ? '2px solid transparent' : `2px solid ${palette.grey[100]}`),
              m: 'auto',
              maxWidth: charWidth,
              p: 1,
            }}
          >
            {charChinese}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
