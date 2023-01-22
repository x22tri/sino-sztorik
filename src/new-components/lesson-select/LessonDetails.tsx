import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  MajorActionButton,
  MinorActionButton,
} from '../shared/basic-components'
import { AssembledLesson } from '../shared/interfaces'
import {
  LEARN_BUTTON,
  REVIEW_BUTTON,
  CHARACTER_AMOUNT_LABEL,
} from '../shared/strings'
import { Display } from '../shared/utility-components'
import { useSmallScreen } from '../shared/utility-functions'
import { useTheme } from '@mui/material'

export default function LessonDetails({
  lesson,
  isCurrentLesson,
}: {
  lesson: AssembledLesson
  isCurrentLesson: boolean
}) {
  const { palette, constants } = useTheme()
  const { title, preface, characters } = lesson

  return (
    <Box
      border={`1px solid ${palette.grey[200]}`}
      borderRadius={2}
      marginBottom={1}
      minWidth={0}
      paddingX={useSmallScreen() ? 1 : 2}
      paddingY={1}
      sx={{
        backgroundColor: palette.background.paper,
        maxWidth: constants.maxContentWidth,
        mx: 'auto',
      }}
    >
      <Typography component='header' variant='h4' textAlign='center' margin={1}>
        {title}
      </Typography>

      <Typography component='p' variant='body1' marginY={3}>
        {preface}
      </Typography>

      <Typography
        display='block'
        textAlign='center'
        variant='overline'
        sx={{ mx: 'auto' }}
      >
        {characters.length} {CHARACTER_AMOUNT_LABEL}
      </Typography>

      <CharacterPreviews {...{ characters }} />

      <LearnReviewButtons {...{ isCurrentLesson }} />
    </Box>
  )
}

function LearnReviewButtons({ isCurrentLesson }: { isCurrentLesson: boolean }) {
  return (
    <Box
      display='flex'
      gap='20px'
      justifyContent='center'
      marginTop={4}
      marginBottom={1}
      sx={{ flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Display if={isCurrentLesson}>
        <MajorActionButton text={LEARN_BUTTON} />
      </Display>

      <MinorActionButton text={REVIEW_BUTTON} />
    </Box>
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
