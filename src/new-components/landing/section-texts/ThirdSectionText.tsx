import { Box } from '@mui/material'
import useTranslation from '../../shared/localization/useTranslation'

export function ThirdSectionText() {
  const strings = useTranslation()

  return (
    <>
      <Box component='h3' typography='h3' fontWeight='bold' textAlign={{ xs: 'center', md: 'start' }}>
        <div>{strings.landing.section3.header1}</div>
        <Box color='secondary.main'>{strings.landing.section3.header2}</Box>
      </Box>

      {strings.landing.section3.body.map((paragraph, index) => (
        <Box fontSize='110%' key={index} marginX={{ xs: 'auto', md: 0 }} maxWidth='48ch'>
          <p>{paragraph}</p>
        </Box>
      ))}
    </>
  )
}
