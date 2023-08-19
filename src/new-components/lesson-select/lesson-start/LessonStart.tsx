import { Box, Typography, useTheme } from '@mui/material'
import { AssembledLesson } from '../../shared/interfaces'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { Unless, When } from 'react-if'
import { LearnReviewButton } from './LearnReviewButton'
import { TierStatusIcons } from '../lesson-picker/TierStatusIcons'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'

export function LessonStart({ lesson }: { lesson: AssembledLesson }) {
  const isLargeScreen = useLargeScreen()
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()
  const { characters, lessonNumber, tierStatuses } = lesson
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

  return (
    <Box
      alignItems='center'
      bottom={0}
      borderTop={`1px solid ${palette.grey[200]}`}
      display='grid'
      gap={2}
      gridArea='start'
      gridTemplateColumns={`repeat(3, 1fr)`}
      height={constants.bottomToolbarHeight}
      paddingX={2}
      position='fixed'
      zIndex={1}
      sx={{
        bgcolor: 'background.paper',
        width: 1,
        // maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        // width: `calc(100% - ${drawerWidth}px)`,
      }}
    >
      {/* <TierStatusIcons {...{ tierStatuses }} /> */}

      {/* <When condition={lesson.characters.length}> */}
      <LearnReviewButton />

      {/* <Unless condition={isLargeScreen}>
          <Typography color='text.secondary' justifySelf='flex-end' variant='overline'>
            {characters.length} {CHARACTER_AMOUNT_LABEL}
          </Typography>
        </Unless> */}
      {/* </When> */}
    </Box>
  )
}
