import SwiperInstance from 'swiper'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../../shared/interfaces'
import { LessonInfo } from './LessonInfo'
import {
  useNavButtonStyling,
  useSmallScreen,
} from '../../shared/utility-functions'
import { FLASHBACK_MODE } from '../../shared/strings'
import { Display } from '../../shared/utility-components'

export function LearnAppbar({
  charToReturnToFromFlashback,
  lessonLength,
  returnFromFlashback,
  swiperInstance,
}: {
  charToReturnToFromFlashback: Character | null
  lessonLength: number
  returnFromFlashback: () => void
  swiperInstance: SwiperInstance | null
}) {
  const { constants } = useTheme()

  const isSmallScreen = useSmallScreen()

  const isLocked = !!charToReturnToFromFlashback

  const gridSideColumn = `minmax(max-content, calc((100vw -  ${constants.maxContentWidth}) / 2))`

  const activeIndex = swiperInstance?.activeIndex

  const lessonProgress =
    activeIndex === undefined ? 0 : (activeIndex / (lessonLength - 1)) * 100

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Toolbar variant='dense' disableGutters>
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
            {...{ charToReturnToFromFlashback, returnFromFlashback }}
          />

          <Box display='flex' justifyContent='center'>
            <Display
              if={!isSmallScreen || !charToReturnToFromFlashback}
              else={<FlashbackModeTextMobile />}
            >
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
            </Display>
          </Box>

          <CloseButton />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

function FlashbackModeTextMobile() {
  return (
    <Typography variant='h6' color='text.disabled'>
      {FLASHBACK_MODE}
    </Typography>
  )
}

function CloseButton() {
  const navButtonStyling = useNavButtonStyling()

  return (
    <IconButton
      size='large'
      sx={{ mx: 1, pl: 0, justifySelf: 'flex-end', ...navButtonStyling }}
    >
      <FontAwesomeIcon icon={faClose} />
    </IconButton>
  )
}
