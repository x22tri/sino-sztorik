import { Box, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { TiersDemoCharacter } from './TiersDemo'

const charWidth = '42px'
const minNumberOfColumns = 4
const maxNumberOfColumns = 7

export function CharacterPreviewsDemo({ characters, currentTier }: { characters: TiersDemoCharacter[]; currentTier: number }) {
  const { spacing } = useTheme()
  return (
    // <Box display='flex' flexDirection='column' maxWidth='48ch' margin='auto'>
    //   <Box
    //     display='grid'
    //     gridTemplateColumns={`repeat(auto-fit,
    //       minmax(min(100%/${minNumberOfColumns},
    //       max(${charWidth},
    //       100%/${maxNumberOfColumns + 1})),
    //     1fr))`}
    //     columnGap={1}
    //     rowGap={2}
    //     marginTop={2}
    //     marginX={2}
    //   >
    <Grid
      container
      // display='flex'
      rowSpacing={2}
      maxWidth={{ xs: `calc((${charWidth} + ${spacing(1)}) * 6)`, sm: `calc((${charWidth} + ${spacing(1)}) * 8)` }}
      // justifyItems='center'
      // justifyContent='center'
      margin='auto'
      width='fit-content'
    >
      {characters.map(({ charChinese, tier }) => {
        const isEligibleForChar = tier <= currentTier

        return (
          <Grid component='span' key={charChinese} xs={3} sm={2}>
            <Typography
              className='disable-select'
              display='flex'
              justifyContent='center'
              variant='chineseText'
              sx={{
                bgcolor: isEligibleForChar ? 'grey.50' : 'transparent',
                color: isEligibleForChar ? 'text.primary' : 'transparent',
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
