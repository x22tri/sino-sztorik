import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
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
import { ExitFlashbackButton } from './ExitFlashbackButton'
import { FlashbackModeTitle } from './FlashbackModeTitle'
import { useVerySmallScreen } from '../../shared/hooks/useVerySmallScreen'
import { LoadLearn } from '../../shared/logic/loadLearn'

export function LearnAppbar({
  lessonLength,
  setToolbarHeight,
  toolbarHeight,
}: {
  lessonLength: number
  setToolbarHeight: Dispatch<SetStateAction<number>>
  toolbarHeight: number
}) {
  const isVerySmallScreen = useVerySmallScreen()
  const isSmallScreen = useSmallScreen()
  const { lesson } = useLoaderData() as LoadLearn
  const ref = useRef<HTMLDivElement | null>(null)
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const [lessonProgress, setLessonProgress] = useState(0)
  const { flashbackChar } = useStore('flashback')
  const { selectedCharIndex } = useStore('learn')
  const { toggleDrawer } = useStore('mobileDrawer')
  const { constants, spacing } = useTheme()
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

  useEffect(() => {
    setLessonProgress(calculateProgress(lessonLength, selectedCharIndex))
  }, [lessonLength, selectedCharIndex])

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
        backgroundColor: flashbackChar ? 'primary.700' : 'background.paper',
        backgroundImage: flashbackChar ? constants.synapsesBackground : undefined,
        maxWidth: `calc(${constants.maxContentWidth} - ${drawerWidth}px)`,
        top: 0,
        transition: `background-color ${constants.animationDuration}`,
        width: `calc(100% - ${drawerWidth}px)`,
        zIndex: 1,
      }}
    >
      <Toolbar disableGutters {...{ ref }} sx={{ px: { xs: 1, sm: 2 } }}>
        <If condition={!flashbackChar}>
          <Then>
            <Box alignItems='center' display='flex' gap={3} width='100%'>
              <If condition={!isSmallScreen}>
                <Then>
                  <LogoTitle noTitle />
                </Then>

                <Else>
                  <Tooltip title={LEARN_LESSON_INFO_BUTTON}>
                    <IconButton
                      className='fa-layers fa-fw'
                      onClick={toggleDrawer}
                      size='large'
                      style={{ marginLeft: spacing(0.5) }}
                    >
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
                  sx={{ borderRadius: 6, bgcolor: 'grey.100', mx: 'auto', p: 0.4, width: 1 }}
                />
              </Box>

              <CloseLearnButton />
            </Box>
          </Then>

          <Else>
            <Box display='grid' width='100%' sx={{ gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' } }}>
              <ExitFlashbackButton charChinese={lesson.characters[selectedCharIndex].charChinese} />

              <When condition={!isVerySmallScreen}>
                <FlashbackModeTitle />
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
