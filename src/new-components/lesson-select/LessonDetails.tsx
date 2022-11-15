import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { AssembledLesson } from '../shared/interfaces'
import {
  LEARN_BUTTON,
  REVIEW_BUTTON,
  CHARACTER_AMOUNT_LABEL,
} from '../shared/strings'

function LessonDetails({
  lesson,
  isCurrentLesson,
}: {
  lesson: AssembledLesson
  isCurrentLesson: boolean
}) {
  const { palette } = useTheme()

  const lessonDetailsWidth = '300px'

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
      <Box
        component='h5'
        textAlign='center'
        fontSize='large'
        fontWeight='bold'
        sx={{ m: 1 }}
      >
        {lesson.title}
      </Box>
      <Box component='p' sx={{ my: 3 }}>
        {lesson.preface}
      </Box>
      <Box
        display='flex'
        gap='20px'
        justifyContent='center'
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {isCurrentLesson && (
          <Button variant='contained' color='secondary'>
            {LEARN_BUTTON}
          </Button>
        )}
        <Button variant='outlined' color='primary'>
          {REVIEW_BUTTON}
        </Button>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box>
        {lesson.characters.length} {CHARACTER_AMOUNT_LABEL}
      </Box>
      <Box display='flex' gap='4px' justifyContent='center'>
        {lesson.characters.map(char => (
          <Box component='span' key={char}>
            {char}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default LessonDetails
