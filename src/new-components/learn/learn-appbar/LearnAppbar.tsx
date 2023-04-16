import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AppBar, Toolbar, Typography, useTheme } from '@mui/material'
import { LessonInfo } from './LessonInfo'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { FLASHBACK_MODE } from '../../shared/strings'
import { useFlashback } from '../logic/useFlashback'
import { useSwiper } from 'swiper/react'
import { useEffect, useState } from 'react'
import { If, Then, Else } from 'react-if'
import { CloseButton } from './CloseButton'

export function LearnAppbar({ lessonLength }: { lessonLength: number }) {
  const isSmallScreen = useSmallScreen()
  const swiper = useSwiper()
  const [lessonProgress, setLessonProgress] = useState(0)
  const { flashback } = useFlashback()
  const { constants } = useTheme()

  const isLocked = !!flashback
  const gridSideColumn = `minmax(max-content, calc((100vw -  ${constants.maxContentWidth}) / 2))`

  useEffect(() => {
    swiper.on('activeIndexChange', () => setLessonProgress(calculateProgress(lessonLength, swiper?.activeIndex)))
  }, [lessonLength, swiper])

  return (
    <AppBar position='static' elevation={0} sx={{ backgroundColor: 'background.default' }}>
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
                  color={isLocked ? 'neutral' : 'primary'}
                  value={lessonProgress}
                  variant='determinate'
                  sx={{ borderRadius: '8px', p: 0.5, mx: 'auto', maxWidth: constants.maxContentWidth, width: '100%' }}
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

function calculateProgress(lessonLength: number, activeIndex?: number) {
  return activeIndex === undefined ? 0 : (activeIndex / (lessonLength - 1)) * 100
}
