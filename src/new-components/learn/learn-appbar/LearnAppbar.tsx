import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { FLASHBACK_MODE, LEARN_LESSON_INFO_BUTTON } from '../../shared/strings'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { If, Then, Else } from 'react-if'
import { CloseLearnButton } from './CloseLearnButton'
import LogoTitle from '../../shared/components/LogoTitle'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '../../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { AssembledLesson } from '../../shared/interfaces'
import { ExitFlashbackButton } from './ExitFlashbackButton'

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
  const lesson = useLoaderData() as AssembledLesson
  const ref = useRef<HTMLDivElement | null>(null)
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const [lessonProgress, setLessonProgress] = useState(0)
  const { flashbackChar } = useStore('flashback')
  const { selectedCharIndex } = useStore('learn')
  const { toggleDrawer } = useStore('mobileDrawer')
  const { swiperInstance } = useStore('swiper')

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
          <If condition={!flashbackChar}>
            <Then>
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
            </Then>

            <Else>
              <ExitFlashbackButton charChinese={lesson.characters[selectedCharIndex].charChinese} />
            </Else>
          </If>

          <Box display='flex' justifyContent='center' width='100%'>
            <If condition={!flashbackChar}>
              <Then>
                <LinearProgress
                  color='secondary'
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
