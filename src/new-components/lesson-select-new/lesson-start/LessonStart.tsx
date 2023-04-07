import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { MajorActionButton } from '../../shared/basic-components'
import {
  CHARACTER_AMOUNT_LABEL,
  LEARN_BUTTON,
  LESSON_START_MORE_OPTIONS,
} from '../../shared/strings'
import { AssembledLesson } from '../../shared/interfaces'

export function LessonStartDesktop({ lesson }: { lesson: AssembledLesson }) {
  const { characters } = lesson
  const { palette } = useTheme()

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <LearnButton isLargeScreen />

      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
          <Typography variant='button' color={palette.grey[700]}>
            {LESSON_START_MORE_OPTIONS}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* To-Do: Add "Review" when applicable */}
        </AccordionDetails>
      </Accordion>

      <Divider />

      <Typography marginX='auto' textAlign='center' variant='overline'>
        {characters.length} {CHARACTER_AMOUNT_LABEL}
      </Typography>

      <CharacterPreviews {...{ characters }} />
    </Box>
  )
}

export function LessonStartMobile() {
  const { constants, palette } = useTheme()

  return (
    <Box
      bottom={0}
      display='grid'
      gap={2}
      gridTemplateColumns='1fr 1fr 1fr'
      height={constants.lessonStartBottomHeight}
      marginLeft={1}
      paddingY={1}
      paddingX={2}
      position='fixed'
      width='100%'
      sx={{ backgroundColor: palette.common.white }}
    >
      <Box />
      <Box margin='auto 0'>
        <LearnButton isLargeScreen={false} />
      </Box>
      <Box marginLeft='auto'>
        <IconButton style={{ width: '48px' }}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </IconButton>
      </Box>
    </Box>
  )
}

function LearnButton({ isLargeScreen }: { isLargeScreen: boolean }) {
  return (
    <MajorActionButton
      text={
        isLargeScreen ? (
          LEARN_BUTTON
        ) : (
          <>
            <Typography lineHeight={1} variant='button'>
              {LEARN_BUTTON}
            </Typography>
            <Typography fontSize='75%' lineHeight={1} variant='caption'>
              11 {CHARACTER_AMOUNT_LABEL}
            </Typography>
          </>
        )
      }
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    />
  )
}

function CharacterPreviews({ characters }: { characters: string[] }) {
  return (
    <Box
      display='flex'
      flexDirection='row'
      gap={2}
      justifyContent='center'
      flexWrap='wrap'
    >
      {characters.map(char => (
        <Card
          key={char}
          variant='outlined'
          component='span'
          sx={{
            borderWidth: '2px',
            p: 1,
            typography: 'chineseNormal',
          }}
        >
          {char}
        </Card>
      ))}
    </Box>
  )
}
