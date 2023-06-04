import { Box } from '@mui/material'
import useTranslation from '../../shared/localization/useTranslation'

export function SecondSectionText() {
  const strings = useTranslation()

  return (
    <>
      <Box component='h3' typography='h3' fontWeight='bold' textAlign={{ xs: 'center', md: 'start' }}>
        <div>{strings.landing.section2.header1}</div>
        <Box color='primary.500'>{strings.landing.section2.header2}</Box>
      </Box>

      {strings.landing.section2.body.map((paragraph, index) => (
        <Box fontSize='110%' key={index} marginX={{ xs: 'auto', md: 0 }} maxWidth='48ch'>
          <p>{paragraph}</p>
        </Box>
      ))}
    </>
  )
}
