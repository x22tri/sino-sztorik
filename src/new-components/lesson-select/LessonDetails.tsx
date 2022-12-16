import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  MajorActionButton,
  MinorActionButton,
  RoundedCard,
} from '../shared/basic-components'
import { AssembledLesson } from '../shared/interfaces'
import {
  LEARN_BUTTON,
  REVIEW_BUTTON,
  CHARACTER_AMOUNT_LABEL,
} from '../shared/strings'

export default function LessonDetails({
  lesson,
  isCurrentLesson,
}: {
  lesson: AssembledLesson
  isCurrentLesson: boolean
}) {
  const { title, preface, characters } = lesson

  return (
    <RoundedCard className='disable-select'>
      <Typography
        component='header'
        variant='h5'
        textAlign='center'
        sx={{ m: 1 }}
      >
        {title}
      </Typography>

      <Typography component='p' variant='body1' sx={{ my: 3 }}>
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
    </RoundedCard>
  )
}

function LearnReviewButtons({ isCurrentLesson }: { isCurrentLesson: boolean }) {
  return (
    <Box
      display='flex'
      gap='20px'
      justifyContent='center'
      sx={{ flexDirection: { xs: 'column', md: 'row' }, mt: 4, mb: 1 }}
    >
      {isCurrentLesson && <MajorActionButton text={LEARN_BUTTON} />}

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
