import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { LESSON_SELECT_TITLE } from '../../shared/strings'

export function LessonPickerTitle() {
  const { palette, spacing } = useTheme()

  return (
    <Accordion elevation={0} square sx={{ bgcolor: 'inherit', borderBottom: `1px solid ${palette.grey[200]}` }}>
      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} sx={{ px: 2, py: 1 }}>
        <Typography variant='button' color={palette.grey[700]}>
          <FontAwesomeIcon icon={faGraduationCap} size='lg' style={{ marginRight: spacing(1) }} />
          {LESSON_SELECT_TITLE}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{/* To-Do: Add "Character Finder" etc. when applicable */}</AccordionDetails>
    </Accordion>
  )
}
