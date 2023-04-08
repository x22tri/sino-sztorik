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
import { LessonInfo } from './LessonInfo'
import { useNavButtonStyling } from '../../shared/utility-functions'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { FLASHBACK_MODE } from '../../shared/strings'
import { useFlashback } from '../logic/useFlashback'
import { useSwiper } from 'swiper/react'
import { useEffect, useState } from 'react'
import { If, Then, Else } from 'react-if'

export function LearnAppbar({ lessonLength }: { lessonLength: number }) {
  const { constants } = useTheme()

  const swiper = useSwiper()

  const isSmallScreen = useSmallScreen()

  const [lessonProgress, setLessonProgress] = useState(0)

  const { flashback } = useFlashback()

  const isLocked = !!flashback

  const gridSideColumn = `minmax(max-content, calc((100vw -  ${constants.maxContentWidth}) / 2))`

  useEffect(() => {
    swiper.on('activeIndexChange', () =>
      setLessonProgress(calculateProgress(lessonLength, swiper?.activeIndex))
    )
  }, [lessonLength, swiper])

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
          <LessonInfo lessonNumber={99} lessonTitle={'Lecke címe'} />

          <Box display='flex' justifyContent='center'>
            <If condition={!isSmallScreen || !flashback}>
              <Then>
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
              </Then>
              <Else>
                <FlashbackModeTextMobile />
              </Else>
            </If>
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

function calculateProgress(lessonLength: number, activeIndex?: number) {
  return activeIndex === undefined
    ? 0
    : (activeIndex / (lessonLength - 1)) * 100
}
