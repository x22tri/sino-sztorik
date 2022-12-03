import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
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
  const { palette } = useTheme()
  const { title, preface, characters } = lesson

  return (
    <RoundedCard>
      <Typography
        component='header'
        variant='h5'
        textAlign='center'
        sx={{ m: 1 }}
      >
        {title}
      </Typography>

      <Typography component='p' variant='body1' sx={{ my: 4 }}>
        {preface}
      </Typography>

      <Typography
        display='block'
        textAlign='center'
        variant='overline'
        fontWeight='bold'
        sx={{ mx: 'auto' }}
      >
        {characters.length} {CHARACTER_AMOUNT_LABEL}
      </Typography>

      <Box display='flex' gap={2} justifyContent='center'>
        {characters.map(char => (
          <Card
            key={char}
            variant='outlined'
            sx={{ borderWidth: '2px', px: 0.5 }}
          >
            <Typography component='span' fontSize='1.5em'>
              {char}
            </Typography>
          </Card>
        ))}
      </Box>

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
