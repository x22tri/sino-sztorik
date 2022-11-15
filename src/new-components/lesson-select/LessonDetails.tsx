import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
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

export default function LessonDetails({
  lesson,
  isCurrentLesson,
}: {
  lesson: AssembledLesson
  isCurrentLesson: boolean
}) {
  const { palette } = useTheme()

  const { title, preface, characters } = lesson

  const lessonDetailsWidth = '30em'

  return (
    <Box
      component='aside'
      sx={{
        display: { xs: 'none', sm: 'block' },
        backgroundColor: palette.background.paper,
        p: 2,
      }}
      width={lessonDetailsWidth}
      height='fit-content'
      borderRadius='16px'
      // To-Do: On xs, drawer appears on click
    >
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

      <LearnReviewButtons {...{ isCurrentLesson }} />

      <Divider sx={{ my: 3 }} />

      <Typography>
        {characters.length} {CHARACTER_AMOUNT_LABEL}
      </Typography>

      <Box display='flex' gap='4px' justifyContent='center'>
        {characters.map(char => (
          <Typography component='span' key={char}>
            {char}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

function LearnReviewButtons({ isCurrentLesson }: { isCurrentLesson: boolean }) {
  return (
    <Box
      display='flex'
      gap='20px'
      justifyContent='center'
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {isCurrentLesson && <MajorActionButton text={LEARN_BUTTON} />}
      <MinorActionButton text={REVIEW_BUTTON} />
    </Box>
  )
}
