import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGraduationCap, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE } from '../../shared/strings'

export function LessonPickerTitle() {
  const { palette } = useTheme()

  return (
    <Accordion elevation={0} square sx={{ bgcolor: 'inherit', borderBottom: `1px solid ${palette.grey[200]}` }}>
      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} sx={{ px: 2, py: 1 }}>
        <LessonSelectorButton />
      </AccordionSummary>

      <AccordionDetails sx={{ borderTop: `1px solid ${palette.grey[200]}`, py: 0 }}>
        <CharacterFinderButton />
      </AccordionDetails>
    </Accordion>
  )
}

function LessonSelectorButton() {
  const { palette, spacing } = useTheme()

  return (
    <Typography variant='button' color={palette.grey[700]}>
      <FontAwesomeIcon className='fa-fw' icon={faGraduationCap} size='lg' style={{ marginRight: spacing(1) }} />
      {LESSON_SELECT_TITLE}
    </Typography>
  )
}

function CharacterFinderButton() {
  const { spacing } = useTheme()

  return (
    <Button disabled variant='text' color='neutral' sx={{ mx: -1, py: 2, width: 1, justifyContent: 'flex-start' }}>
      <FontAwesomeIcon className='fa-fw' icon={faMagnifyingGlass} size='lg' style={{ marginRight: spacing(1) }} />
      {CHARACTER_SEARCH_TITLE}
    </Button>
  )
}
