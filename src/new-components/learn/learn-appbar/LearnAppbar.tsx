import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AppBar, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { LEARN_LESSON_INFO_BUTTON } from '../../shared/strings'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { If, Then, Else, When } from 'react-if'
import { CloseLearnButton } from './CloseLearnButton'
import LogoTitle from '../../shared/components/LogoTitle'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '../../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { AssembledLesson } from '../../shared/interfaces'
import { ExitFlashbackButton } from './ExitFlashbackButton'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { FlashbackModeTitle } from './FlashbackModeTitle'

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
  const isLargeScreen = useLargeScreen()
  const lesson = useLoaderData() as AssembledLesson
  const ref = useRef<HTMLDivElement | null>(null)
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const [lessonProgress, setLessonProgress] = useState(0)
  const { flashbackChar } = useStore('flashback')
  const { selectedCharIndex } = useStore('learn')
  const { toggleDrawer } = useStore('mobileDrawer')
  const { swiperInstance } = useStore('swiper')
  const { constants } = useTheme()
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

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
    <Box
      component='header'
      position='fixed'
      sx={{
        bgcolor: 'background.paper',
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        width: `calc(100% - ${drawerWidth}px)`,
        zIndex: 1,
        top: 0,
      }}
    >
      <Toolbar disableGutters {...{ ref }} sx={{ px: 2 }}>
        <If condition={!flashbackChar}>
          <Then>
            <Box alignItems='center' display='flex' gap={3} width='100%'>
              <If condition={!isSmallScreen}>
                <Then>
                  <LogoTitle noTitle />
                </Then>

                <Else>
                  <Tooltip title={LEARN_LESSON_INFO_BUTTON}>
                    <IconButton className='fa-layers fa-fw' onClick={toggleDrawer} size='large'>
                      <FontAwesomeIcon icon={faChalkboard} />
                      <Typography component='span' fontWeight='bold' fontSize='45%' marginBottom='2px'>
                        {lesson.lessonNumber}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                </Else>
              </If>

              <Box display='flex' justifyContent='center' width='100%'>
                <LinearProgress
                  color='primary'
                  value={lessonProgress}
                  variant='determinate'
                  sx={{ borderRadius: 6, mx: 'auto', p: 0.4, width: '100%' }}
                />
              </Box>

              <CloseLearnButton />
            </Box>
          </Then>
          <Else>
            <Box display='grid' width='100%' sx={{ gridTemplateColumns: `repeat(${isLargeScreen ? 4 : 3}, 1fr)` }}>
              <ExitFlashbackButton charChinese={lesson.characters[selectedCharIndex].charChinese} />

              <FlashbackModeTitle />

              <When condition={isLargeScreen}>
                <Box />
              </When>

              <CloseLearnButton />
            </Box>
          </Else>
        </If>
      </Toolbar>
    </Box>
  )
}

function calculateProgress(lessonLength: number, activeIndex?: number) {
  return activeIndex === undefined ? 0 : (activeIndex / (lessonLength - 1)) * 100
}
