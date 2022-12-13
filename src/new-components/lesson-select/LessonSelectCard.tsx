import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'
import { RoundedCard } from '../shared/basic-components'
import { LessonStatuses, TierStatuses } from '../shared/interfaces'
import { UPCOMING_LESSON_LABEL } from '../shared/strings'
import TierStatusBlips from './TierStatusBlips'
import { useLessonSelectCardStyling } from './useLessonSelectCardStyling'

const { UPCOMING, COMPLETED } = LessonStatuses

export default function LessonSelectCard({
  lessonNumber,
  setIsLessonDetailsVisible,
  setSelectedLessonNumber,
  tierStatuses,
  title,
  upcomingLessonNumber,
}: {
  lessonNumber: number
  setIsLessonDetailsVisible: Dispatch<SetStateAction<boolean>>
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
  tierStatuses: TierStatuses
  title: string
  upcomingLessonNumber: number
}) {
  const isCurrentLesson = lessonNumber === upcomingLessonNumber

  const isLessonLocked =
    !tierStatuses.includes(UPCOMING) && !tierStatuses.includes(COMPLETED)

  const { borderColor, borderWidth, backgroundColor, boxShadow } =
    useLessonSelectCardStyling(tierStatuses)!

  function openLessonDetails() {
    if (isLessonLocked) {
      return
    }

    setSelectedLessonNumber(lessonNumber)
    setIsLessonDetailsVisible(true)
  }

  return (
    <Grid
      item
      xs={12 / 1} // The number on the right hand side is the desired number of cards in a row.
      sm={12 / 2}
      md={12 / 3}
      position='relative'
      sx={{
        p: 2,
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: isLessonLocked ? 'none' : 'translate(0%, -8%)',
          cursor: isLessonLocked ? 'inherit' : 'pointer',
        },
      }}
      onClick={openLessonDetails}
    >
      {isCurrentLesson && <UpcomingLessonLabel />}

      <RoundedCard
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '8em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 1,
          backgroundColor,
          ...(boxShadow ? { boxShadow } : {}),
          ...(borderColor ? { borderColor } : {}),
          ...(borderWidth ? { borderWidth } : {}),
          // ...(isCurrentLesson ? { borderRadius: '0 16px' } : {}),
        }}
      >
        <TierStatusBlips {...{ tierStatuses }} />

        <LessonSelectCardTitle {...{ title }} />

        <LessonNumberFooter {...{ lessonNumber }} />
      </RoundedCard>
    </Grid>
  )
}

function UpcomingLessonLabel() {
  const { palette } = useTheme()

  return (
    <Typography
      component='label'
      variant='overline'
      alignSelf='flex-start'
      position='absolute'
      top='-8px'
      left='15px'
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

function LessonSelectCardTitle({ title }: { title: string }) {
  return (
    <Typography
      variant='body1'
      display='flex'
      height='100%'
      alignItems='center'
      textAlign='center'
      sx={{ my: 1, lineHeight: 'initial' }}
    >
      {title}
    </Typography>
  )
}