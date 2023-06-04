import { Box, Typography } from '@mui/material'

export function SimilarDemo({ charChinese, keyword }: { charChinese: string; keyword: string }) {
  return (
    <Box
      alignItems='center'
      display='grid'
      gap={1}
      justifyContent='center'
      textAlign='center'
      sx={{ gridTemplate: `"not-equal char" ". keyword" / max-content minmax(8ch, max-content)` }}
    >
      <Typography component='span' fontSize='110%' gridArea='not-equal'>
        ≠
      </Typography>

      <Typography component='span' gridArea='char' variant='chineseText'>
        {charChinese}
      </Typography>

      <Typography component='span' gridArea='keyword' variant='h5' fontWeight='bold'>
        {keyword}
      </Typography>
    </Box>
  )
}
