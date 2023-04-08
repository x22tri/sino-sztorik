import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CHARACTER_AMOUNT_LABEL, LESSON_START_MORE_OPTIONS } from '../../shared/strings'
import { AssembledLesson } from '../../shared/interfaces'
import { CharacterPreviews } from './CharacterPreviews'
import { LearnButton } from './LearnButton'

export function LessonStartDesktop({ lesson }: { lesson: AssembledLesson }) {
  const { characters } = lesson
  const { spacing, palette } = useTheme()

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      margin={2}
      marginRight={4}
      width={`calc(100% - ${spacing(2)})`} // marginRight - margin
    >
      <Stack
        borderRadius={2}
        boxSizing='border-box'
        gap={1}
        padding={2}
        sx={{
          backgroundColor: palette.background.paper,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        }}
      >
        <LearnButton />

        <Accordion elevation={0} sx={{ '.MuiAccordionSummary-root': { padding: 0 } }}>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            <Typography variant='button' color={palette.grey[700]}>
              {LESSON_START_MORE_OPTIONS}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{/* To-Do: Add "Review" when applicable */}</AccordionDetails>
        </Accordion>
      </Stack>

      <Box display='flex' flexDirection='column'>
        <Typography marginX='auto' textAlign='center' variant='overline'>
          {characters.length} {CHARACTER_AMOUNT_LABEL}
        </Typography>

        <CharacterPreviews {...{ characters }} />
      </Box>
    </Box>
  )
}
