import { Box, Typography, useTheme } from '@mui/material'
import { AssembledLesson } from '../../shared/interfaces'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { Unless } from 'react-if'
import { LearnReviewButton } from './LearnReviewButton'

export function LessonStart({ lesson }: { lesson: AssembledLesson }) {
  const isLargeScreen = useLargeScreen()
  const { constants, palette } = useTheme()
  const { characters } = lesson

  return (
    <Box
      alignItems='center'
      bottom={0}
      borderTop={`1px solid ${palette.grey[200]}`}
      display='grid'
      gap={2}
      gridTemplateColumns={`repeat(${isLargeScreen ? 4 : 3}, 1fr)`}
      height={constants.lessonStartMobileHeight}
      paddingX={2}
      position='sticky'
      width='100%'
      zIndex={1}
      sx={{ bgcolor: 'background.paper' }}
    >
      <Box /> {/* Spacer */}
      <LearnReviewButton />
      <Unless condition={isLargeScreen}>
        <Typography justifySelf='flex-end' marginRight={1} variant='overline'>
          {characters.length} {CHARACTER_AMOUNT_LABEL}
        </Typography>
      </Unless>
    </Box>
  )
}
