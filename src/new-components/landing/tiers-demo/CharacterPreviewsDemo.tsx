import { Box, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { TiersDemoCharacter } from './tiersDemoContent'

const charWidth = '42px'

export function CharacterPreviewsDemo({ characters, currentTier }: { characters: TiersDemoCharacter[]; currentTier: number }) {
  const { spacing } = useTheme()
  return (
    <Grid
      container
      rowSpacing={2}
      maxWidth={{ xs: `calc((${charWidth} + ${spacing(1)}) * 6)`, sm: `calc((${charWidth} + ${spacing(1)}) * 8)` }}
      margin='auto'
      width='fit-content'
    >
      {characters.map(({ charChinese, tier }) => {
        const isEligibleForChar = tier <= currentTier

        return (
          <Grid component='span' key={charChinese} xs={3} sm={2}>
            <Typography
              bgcolor={isEligibleForChar ? 'grey.100' : 'transparent'}
              color={isEligibleForChar ? 'text.primary' : 'transparent'}
              className='disable-select'
              display='flex'
              justifyContent='center'
              variant='chineseText'
              sx={{
                borderRadius: 2,
                border: ({ palette }) => (isEligibleForChar ? '2px solid transparent' : `2px solid ${palette.grey[200]}`),
                m: 'auto',
                textAlign: 'center',
                maxWidth: charWidth,
                transition: ({ constants }) => constants.animationDuration,
                p: 1,
              }}
            >
              {charChinese}
            </Typography>
          </Grid>
        )
      })}
    </Grid>
  )
  // {
  /* </Box>
    </Box> */
  // }
  // )
}
