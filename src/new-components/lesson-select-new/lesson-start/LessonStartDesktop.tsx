import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CHARACTERS_IN_LESSON_LABEL, CHARACTER_AMOUNT_LABEL, LESSON_START_MORE_OPTIONS } from '../../shared/strings'
import { AssembledLesson } from '../../shared/interfaces'
import { CharacterPreviews } from './CharacterPreviews'
import { LearnButton } from './LearnButton'

export function LessonStartDesktop({ lesson }: { lesson: AssembledLesson }) {
  const { characters } = lesson
  const { constants, spacing, palette } = useTheme()

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      width='100%'
      // borderLeft={`1px solid ${palette.grey[200]}`}
      sx={{
        backgroundColor: palette.background.paper,
        zIndex: 99,
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        sx={{
          // boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px inset`,
          border: `1px solid ${palette.grey[200]}`,
          // backgroundColor: palette.grey[50],
          borderRadius: spacing(3),
          height: '100%',
          mx: 1,
          my: 2,
        }}
      >
        <Typography marginX='auto' marginY={1} textAlign='center' variant='overline'>
          {CHARACTERS_IN_LESSON_LABEL}
        </Typography>

        <CharacterPreviews {...{ characters }} />
      </Box>

      <Stack
        boxSizing='border-box'
        gap={1}
        padding={2}
        sx={
          {
            // borderBottomRightRadius: spacing(2),
            // backgroundColor: palette.background.paper,
            // boxShadow: constants.boxShadowLessonSelect,
            // clipPath: `inset(0px -20px -20px 0px)`, // Cut off box shadow's left side.
            // zIndex: 99,
            // border: `1px solid ${palette.grey[300]}`,
          }
        }
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
    </Box>
  )
}
