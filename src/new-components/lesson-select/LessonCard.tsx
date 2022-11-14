import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { deepOrange, blue } from '@mui/material/colors'
import { TierStatuses } from '../shared/interfaces'
import { UPCOMING_LESSON_LABEL } from '../shared/strings'
import TierStatusBlips from './TierStatusBlips'
import TEMP_PALETTE from '../shared/TEMP_PALETTE'

const { LOW_OPACITY_BLACK } = TEMP_PALETTE

function LessonCard({
  lessonNumber,
  title,
  tierStatuses,
  selectedLessonNumber,
  setSelectedLessonNumber,
  currentLessonNumber,
}: {
  lessonNumber: number
  title: string
  tierStatuses: TierStatuses
  selectedLessonNumber: number
  setSelectedLessonNumber: React.Dispatch<React.SetStateAction<number>>
  currentLessonNumber: number
}) {
  const selected = lessonNumber === selectedLessonNumber
  const isCurrentLesson = lessonNumber === currentLessonNumber
  const borderColor = isCurrentLesson
    ? deepOrange[500]
    : selected
    ? blue[800]
    : 'transparent'
  const borderWidth = isCurrentLesson && !selected ? '1px' : '2px'
  const upcomingLabelWeight = isCurrentLesson && selected ? 'bold' : 'normal'

  return (
    <Grid
      item
      display='flex'
      flexDirection='column'
      alignItems='center'
      xs={4}
      sm={12 / 5}
      position='relative'
      sx={{
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: 'translate(0%, -8%)',
          cursor: 'pointer',
        },
      }}
      onClick={() => setSelectedLessonNumber(lessonNumber)}
    >
      {isCurrentLesson && (
        <Box
          component='span'
          fontSize='70%'
          fontWeight={upcomingLabelWeight}
          color={deepOrange[500]}
          alignSelf='flex-start'
          position='absolute'
          top='1px'
          left='10px'
        >
          {UPCOMING_LESSON_LABEL}
        </Box>
      )}
      <Box
        position='relative'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: isCurrentLesson ? '0 16px' : '16px',
          border: `${borderWidth} solid ${borderColor}`,
          py: 2,
        }}
      >
        <TierStatusBlips {...{ tierStatuses }} />
        <Box textAlign='center' sx={{ my: 1, fontSize: '90%' }}>
          {title}
        </Box>
        <Box
          position='absolute'
          bottom='2px'
          color={LOW_OPACITY_BLACK}
          fontSize='small'
        >
          {lessonNumber}
        </Box>
      </Box>
    </Grid>
  )
}

export default LessonCard
