import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { IconButton, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../useNavButtonStyling'
import { Character } from '../../shared/interfaces'
import { LessonInfo } from './LessonInfo'
import { AppbarWrapper } from '../../toolbar/AppbarWrapper'

export function LearnAppbar({
  activeIndex,
  charToReturnToFromFlashback,
  lessonLength,
}: {
  activeIndex: number
  charToReturnToFromFlashback: Character | null
  lessonLength: number
}) {
  const { constants } = useTheme()

  const navButtonStyling = useNavButtonStyling()

  const isLocked = !!charToReturnToFromFlashback

  const gridSideColumn = `minmax(max-content, calc((100vw -  ${constants.maxContentWidth}) / 2))`

  const lessonProgress = (activeIndex / (lessonLength - 1)) * 100

  return (
    <AppbarWrapper>
      <Box
        alignItems='center'
        display='grid'
        gap={1}
        gridTemplateColumns={`${gridSideColumn} auto ${gridSideColumn}`}
        width='100%'
      >
        <LessonInfo
          lessonNumber={99}
          lessonTitle={'Lecke címe'}
          {...{ charToReturnToFromFlashback }}
        />

        <Box display='flex'>
          <LinearProgress
            variant='determinate'
            value={lessonProgress}
            color={isLocked ? 'neutral' : 'primary'}
            sx={{
              borderRadius: '8px',
              p: 0.5,
              mx: 'auto',
              maxWidth: constants.maxContentWidth,
              width: '100%',
            }}
          />
        </Box>

        <IconButton
          size='large'
          sx={{ mx: 1, pl: 0, justifySelf: 'flex-end', ...navButtonStyling }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </Box>
    </AppbarWrapper>
  )
}
