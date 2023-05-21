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
import { useVerySmallScreen } from '../../shared/hooks/useVerySmallScreen'

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
  const isLargeScreen = useLargeScreen()
  const lesson = useLoaderData() as AssembledLesson
  const ref = useRef<HTMLDivElement | null>(null)
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const [lessonProgress, setLessonProgress] = useState(0)
  const { flashbackChar } = useStore('flashback')
  const { selectedCharIndex } = useStore('learn')
  const { toggleDrawer } = useStore('mobileDrawer')
  const { swiperInstance } = useStore('swiper')
  const { constants, spacing } = useTheme()
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
        backgroundColor: flashbackChar ? '#23458A' : 'background.paper',
        backgroundImage: flashbackChar
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%232B57AE' stroke-width='1.7'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%232B58AF'%3E%3Ccircle cx='769' cy='229' r='7'/%3E%3Ccircle cx='539' cy='269' r='7'/%3E%3Ccircle cx='603' cy='493' r='7'/%3E%3Ccircle cx='731' cy='737' r='7'/%3E%3Ccircle cx='520' cy='660' r='7'/%3E%3Ccircle cx='309' cy='538' r='7'/%3E%3Ccircle cx='295' cy='764' r='7'/%3E%3Ccircle cx='40' cy='599' r='7'/%3E%3Ccircle cx='102' cy='382' r='7'/%3E%3Ccircle cx='127' cy='80' r='7'/%3E%3Ccircle cx='370' cy='105' r='7'/%3E%3Ccircle cx='578' cy='42' r='7'/%3E%3Ccircle cx='237' cy='261' r='7'/%3E%3Ccircle cx='390' cy='382' r='7'/%3E%3C/g%3E%3C/svg%3E")`
          : undefined,
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
                  sx={{ borderRadius: 6, mx: 'auto', p: 0.4, width: '100%' }}
                />
              </Box>

              <CloseLearnButton />
            </Box>
          </Then>

          <Else>
            <Box
              display='grid'
              width='100%'
              sx={{ gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' } }}
            >
              <ExitFlashbackButton charChinese={lesson.characters[selectedCharIndex].charChinese} />

              <When condition={!isVerySmallScreen}>
                <FlashbackModeTitle />
              </When>

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
