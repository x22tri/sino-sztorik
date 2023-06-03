import { Box, Typography } from '@mui/material'
import {
  LANDING_FIRST_SECTION_FIRST_ROW,
  LANDING_FIRST_SECTION_SECOND_ROW,
  LANDING_FIRST_SECTION_PARAGRAPH,
} from '../../shared/strings'
import { ButtonRow } from '../ButtonRow'

export function FirstSectionText() {
  return (
    <>
      <Box component='h1'>
        <Typography component='div' variant='h3'>
          {LANDING_FIRST_SECTION_FIRST_ROW}
        </Typography>

        <Typography component='div' variant='h2'>
          {LANDING_FIRST_SECTION_SECOND_ROW}
        </Typography>
      </Box>

      <Typography color='primary.200' marginTop={6} fontSize='120%' maxWidth='48ch' sx={{ marginX: { xs: 'auto', md: 0 } }}>
        {LANDING_FIRST_SECTION_PARAGRAPH}
      </Typography>

      <ButtonRow />
    </>
  )
}
