import { Box, Typography } from '@mui/material'
import { LANDING_HEADER_FIRST_ROW, LANDING_HEADER_SECOND_ROW, LANDING_HEADER_PARAGRAPH } from '../shared/strings'
import { ButtonRow } from './ButtonRow'

export function MainHeading() {
  return (
    <>
      <Typography component='div' variant='h3'>
        {LANDING_HEADER_FIRST_ROW}
      </Typography>
      <Typography component='div' variant='h2'>
        {LANDING_HEADER_SECOND_ROW}
      </Typography>

      <Typography color='primary.200' marginTop={6} fontSize='60%' maxWidth='48ch' sx={{ marginX: { xs: 'auto', md: 0 } }}>
        {LANDING_HEADER_PARAGRAPH}
      </Typography>

      <ButtonRow />
    </>
  )
}
