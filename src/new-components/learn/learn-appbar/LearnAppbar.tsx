import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AppBar, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { LessonInfo } from './LessonInfo'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { FLASHBACK_MODE } from '../../shared/strings'
import { useSwiper } from 'swiper/react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { If, Then, Else } from 'react-if'
import { CloseLearnButton } from './CloseLearnButton'
import { useSwiperInstance } from '../../shared/state'
import LogoTitle from '../../shared/components/LogoTitle'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '../../shared/logic/useStore'

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
  const [lessonProgress, setLessonProgress] = useState(0)
  const { swiperInstance } = useSwiperInstance()
  const { flashbackChar } = useStore('flashback')

  const isLocked = !!flashbackChar

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
    <AppBar position='relative' elevation={0} sx={{ bgcolor: 'background.paper', gridArea: 'nav' }}>
      <Toolbar disableGutters {...{ ref }} sx={{ px: 2 }}>
        <Box alignItems='center' display='flex' gap={3} width='100%'>
          <If condition={!isSmallScreen}>
            <Then>
              <LogoTitle noTitle />
            </Then>
            <Else>
              <Tooltip title='Leckeinformáció'>
                <IconButton size='large' className='fa-layers fa-fw'>
                  <FontAwesomeIcon icon={faChalkboard} />
                  <Typography component='span' fontWeight='bold' fontSize='45%' marginBottom='2px'>
                    99
                  </Typography>
                </IconButton>
              </Tooltip>
            </Else>
          </If>

          <Box display='flex' justifyContent='center' width='100%'>
            <If condition={!isSmallScreen || !flashbackChar}>
              <Then>
                <LinearProgress
                  color={isLocked ? 'neutral' : 'primary'}
                  value={lessonProgress}
                  variant='determinate'
                  sx={{ borderRadius: 6, mx: 'auto', p: 0.6, width: '100%' }}
                />
              </Then>
              <Else>
                <FlashbackModeTextMobile />
              </Else>
            </If>
          </Box>

          <CloseLearnButton />
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
