import { Box } from '@mui/material'
import {
  LANDING_THIRD_SECTION_TITLE_FIRST_ROW,
  LANDING_THIRD_SECTION_TITLE_SECOND_ROW,
  LANDING_THIRD_SECTION_FIRST_PARAGRAPH,
  LANDING_THIRD_SECTION_SECOND_PARAGRAPH,
} from '../../shared/strings'

export function ThirdSectionText() {
  return (
    <>
      <Box component='h3' typography='h3' fontWeight='bold' textAlign={{ xs: 'center', md: 'start' }}>
        <div>{LANDING_THIRD_SECTION_TITLE_FIRST_ROW}</div>
        <Box color='secondary.main'>{LANDING_THIRD_SECTION_TITLE_SECOND_ROW}</Box>
      </Box>

      <Box fontSize='110%' marginX={{ xs: 'auto', md: 0 }} marginTop={6} maxWidth='48ch' textAlign='start'>
        <p>{LANDING_THIRD_SECTION_FIRST_PARAGRAPH}</p>
        <p>{LANDING_THIRD_SECTION_SECOND_PARAGRAPH}</p>
      </Box>
    </>
  )
}
