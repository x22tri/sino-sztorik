import { Box, Typography } from '@mui/material'
import { ButtonRow } from '../ButtonRow'
import useTranslation from '../../shared/localization/useTranslation'

export function FirstSectionText() {
  const strings = useTranslation()

  return (
    <>
      <Box component='h1'>
        <Typography component='div' variant='h3'>
          {strings.landing.section1.header1}
        </Typography>

        <Typography component='div' variant='h2'>
          {strings.landing.section1.header2}
        </Typography>
      </Box>

      {strings.landing.section1.body.map((paragraph, index) => (
        <Typography
          color='primary.200'
          key={index}
          marginTop={6}
          fontSize='120%'
          maxWidth='48ch'
          sx={{ marginX: { xs: 'auto', md: 0 } }}
        >
          {paragraph}
        </Typography>
      ))}

      <ButtonRow />
    </>
  )
}
