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
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { AssembledLesson } from '../../shared/interfaces'

export function LessonStartDesktop({ lesson }: { lesson: AssembledLesson }) {
  const { title, preface, characters } = lesson

  return (
    <Box
      flexDirection='column'
      gap={2}
      sx={{ display: { xs: 'none', lg: 'flex' } }}
    >
      <LearnButton isLargeScreen />

      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
          <Typography variant='button'>További lehetőségek</Typography>
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
  const { constants } = useTheme()

  return (
    <Box
      bottom={0}
      borderTop='1px solid'
      display='grid'
      gap={2}
      gridTemplateColumns='1fr 1fr 1fr'
      height={constants.lessonStartBottomHeight}
      paddingY={1}
      paddingX={2}
      position='sticky'
      width={`calc(100%) `}
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
  const text = isLargeScreen ? (
    'TANULÁS'
  ) : (
    <>
      <Typography lineHeight={1} variant='button'>
        TANULÁS
      </Typography>
      <Typography fontSize='75%' lineHeight={1} variant='caption'>
        11 karakter
      </Typography>
    </>
  )

  return (
    <MajorActionButton
      {...{ text }}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    />
  )
}

function CharacterPreviews({ characters }: { characters: string[] }) {
  return (
    <Box display='flex' gap={2} justifyContent='center' flexWrap='wrap'>
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
