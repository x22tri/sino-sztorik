import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'
import { RoundedCard } from '../shared/basic-components'
import { TierStatuses } from '../shared/interfaces'
import { UPCOMING_LESSON_LABEL } from '../shared/strings'
import TierStatusBlips from './TierStatusBlips'

export default function LessonCard({
  lessonNumber,
  title,
  tierStatuses,
  // selectedLessonNumber,
  setSelectedLessonNumber,
  currentLessonNumber,
  setIsLessonDetailsVisible,
}: {
  lessonNumber: number
  title: string
  tierStatuses: TierStatuses
  // selectedLessonNumber: number
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
  currentLessonNumber: number
  setIsLessonDetailsVisible: Dispatch<SetStateAction<boolean>>
}) {
  const { palette } = useTheme()

  // const isSelected = lessonNumber === selectedLessonNumber

  const isCurrentLesson = lessonNumber === currentLessonNumber

  const borderColor = isCurrentLesson
    ? palette.secondary.main
    : // : isSelected
      // ? palette.primary.main
      'transparent'

  // const borderWidth = isCurrentLesson && !isSelected ? '1px' : '2px'
  const borderWidth = isCurrentLesson ? '1px' : '2px'

  // function handleLessonCardClick(lessonNumber) {

  // }

  return (
    <Grid
      item
      display='flex'
      flexDirection='column'
      alignItems='center'
      xs={12 / 3}
      sm={12 / 4}
      lg={12 / 5}
      position='relative'
      sx={{
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: 'translate(0%, -8%)',
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        setSelectedLessonNumber(lessonNumber)
        setIsLessonDetailsVisible(true)
      }}
    >
      {/* {isCurrentLesson && <UpcomingLessonLabel {...{ isSelected }} />} */}
      {isCurrentLesson && <UpcomingLessonLabel isSelected={false} />}

      <RoundedCard
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: isCurrentLesson ? '0 16px' : '16px',
          border: `${borderWidth} solid ${borderColor}`,
          px: 1,
        }}
      >
        <TierStatusBlips {...{ tierStatuses }} />

        <Typography variant='body2' textAlign='center' sx={{ my: 1 }}>
          {title}
        </Typography>

        <LessonNumberFooter {...{ lessonNumber }} />
      </RoundedCard>
    </Grid>
  )
}

function UpcomingLessonLabel({ isSelected }: { isSelected: boolean }) {
  const { palette } = useTheme()
  const upcomingLabelWeight = isSelected ? 'bold' : 'normal'

  return (
    <Typography
      component='label'
      variant='overline'
      alignSelf='flex-start'
      position='absolute'
      top='-8px'
      left='8px'
      fontWeight={upcomingLabelWeight}
      sx={{ color: palette.secondary.main }}
    >
      {UPCOMING_LESSON_LABEL}
    </Typography>
  )
}

function LessonNumberFooter({ lessonNumber }: { lessonNumber: number }) {
  const { palette } = useTheme()

  return (
    <Box
      position='absolute'
      bottom='2px'
      color={palette.grey[400]}
      fontSize='small'
    >
      {lessonNumber}
    </Box>
  )
}
