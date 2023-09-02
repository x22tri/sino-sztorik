import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useSupplementsDemoContent } from './useSupplementsDemoContent'
import { SimilarDemo } from './SimilarDemo'
import { PhraseDemo } from './PhraseDemo'

export function SupplementsDemo() {
  const { glyph, keyword, phrases, similarAppearance, similarMeaning } = useSupplementsDemoContent()

  return (
    <Box bgcolor='background.paper' borderRadius={2} margin='auto' maxWidth='48ch' p={1}>
      <Grid container marginBottom={1}>
        <Grid bgcolor='secondary.100' xs={6} sx={{ borderRadius: ({ spacing }) => `${spacing(1)} ${spacing(1)} 0 0` }}>
          <Typography display='flex' justifyContent='center' variant='chineseText' lineHeight={0.9} fontSize={80} width={1}>
            {glyph}
          </Typography>
        </Grid>

        <Grid xs={6} margin='auto' marginTop={3}>
          <SimilarDemo glyph={similarAppearance.glyph} keyword={similarAppearance.keyword} />
        </Grid>

        <Grid bgcolor='secondary.100' xs={6} sx={{ borderRadius: ({ spacing }) => `0 0 ${spacing(1)} ${spacing(1)}` }}>
          <Typography display='flex' justifyContent='center' variant='h4'>
            {keyword}
          </Typography>
        </Grid>

        <Grid xs={6} margin='auto'>
          <SimilarDemo glyph={similarMeaning.glyph} keyword={similarMeaning.keyword} />
        </Grid>
      </Grid>

      {phrases!.map(({ characters, translation }, index) => (
        <PhraseDemo key={index} {...{ characters, translation }} />
      ))}
    </Box>
  )
}
