import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AppBar, Toolbar, Typography, useTheme } from '@mui/material'
import { LessonInfo } from './LessonInfo'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { FLASHBACK_MODE } from '../../shared/strings'
import { useFlashback } from '../logic/useFlashback'
import { useSwiper } from 'swiper/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { If, Then, Else } from 'react-if'
import { CloseButton } from './CloseButton'
import { useSwiperInstance } from '../../shared/state'

export function LearnAppbar({
  lessonLength,
  setToolbarHeight,
  toolbarHeight,
}: {
  lessonLength: number
  setToolbarHeight: Dispatch<SetStateAction<number>>
  toolbarHeight: number
}) {
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLDivElement | null>(null)
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const { swiperInstance } = useSwiperInstance()
  const [lessonProgress, setLessonProgress] = useState(0)
  const { flashback } = useFlashback()
  const { constants } = useTheme()

  const isLocked = !!flashback
  const gridSideColumn = `minmax(max-content, calc((100% -  ${constants.maxContentWidth}) / 2))`

  useEffect(() => {
    swiperInstance?.on('activeIndexChange', () => setLessonProgress(calculateProgress(lessonLength, swiperInstance?.activeIndex)))
  }, [lessonLength, swiperInstance])

  useEffect(() => {
    if (ref?.current) {
      resizeObserver.observe(ref?.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  })

  function handleToolbarResized() {
    if (ref?.current && ref?.current.offsetHeight !== toolbarHeight) {
      setToolbarHeight(ref?.current.offsetHeight)
    }
  }

  return (
    <AppBar position='relative' elevation={0} sx={{ bgcolor: 'inherit', gridArea: 'nav' }}>
      <Toolbar variant='dense' disableGutters {...{ ref }}>
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
                  sx={{
                    borderRadius: '8px',
                    mx: 'auto',
                    p: 0.5,
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

function calculateProgress(lessonLength: number, activeIndex?: number) {
  return activeIndex === undefined ? 0 : (activeIndex / (lessonLength - 1)) * 100
}
