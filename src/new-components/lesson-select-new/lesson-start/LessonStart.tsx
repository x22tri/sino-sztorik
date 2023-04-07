import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Stack,
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
import { useSmallScreen } from '../../shared/utility-functions'

export function LessonStartDesktop({ lesson }: { lesson: AssembledLesson }) {
  const { characters } = lesson
  const { palette } = useTheme()

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      marginTop={2}
      marginRight={2}
    >
      <Stack
        borderRadius={2}
        boxSizing='border-box'
        gap={1}
        padding={2}
        sx={{
          backgroundColor: palette.background.paper,
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        }}
      >
        <LearnButton isLargeScreen />

        <Accordion
          elevation={0}
          sx={{ '.MuiAccordionSummary-root': { padding: 0 } }}
        >
          <AccordionSummary
            expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
          >
            <Typography variant='button' color={palette.grey[700]}>
              {LESSON_START_MORE_OPTIONS}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* To-Do: Add "Review" when applicable */}
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Typography marginX='auto' textAlign='center' variant='overline'>
        {characters.length} {CHARACTER_AMOUNT_LABEL}
      </Typography>

      <CharacterPreviews {...{ characters }} />
    </Box>
  )
}

export function LessonStartMobile() {
  const { constants, palette } = useTheme()

  const isSmallScreen = useSmallScreen()

  return (
    <Box
      bottom={0}
      display='grid'
      gap={2}
      gridTemplateColumns='1fr 1fr 1fr'
      height={constants.lessonStartBottomHeight}
      marginX={isSmallScreen ? 0 : 2}
      paddingY={1}
      paddingX={2}
      position='fixed'
      width={
        isSmallScreen
          ? '100%'
          : `calc(100% - ${constants.drawerWidth}px - 32px)`
      }
      zIndex={9000}
      sx={{
        backgroundColor: palette.common.white,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      }}
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
      text={LEARN_BUTTON}
      secondaryText={isLargeScreen ? undefined : `11 ${CHARACTER_AMOUNT_LABEL}`}
      sx={{ width: '100%' }}
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
          component='span'
          sx={{
            borderWidth: '2px',
            p: 1,
            typography: 'chineseNormal',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          {char}
        </Card>
      ))}
    </Box>
  )
}
