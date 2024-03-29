import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AppBar, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { LEARN_LESSON_INFO_BUTTON } from '../../shared/strings'
import { useEffect, useState } from 'react'
import { If, Then, Else, When } from 'react-if'
import { CloseLearnButton } from './CloseLearnButton'
import LogoTitle from '../../shared/components/LogoTitle'
import { faChalkboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLoaderData } from 'react-router-dom'
import { ExitFlashbackButton } from './ExitFlashbackButton'
import { FlashbackModeTitle } from './FlashbackModeTitle'
import { useVerySmallScreen } from '../../shared/hooks/useVerySmallScreen'
import { LoadLearn } from '../../shared/route-loaders/loadLearn'
import { useFlashback } from '../store/useFlashback'

export function LearnAppbar({
  lessonLength,
  selectedCharIndex,
  toggleDrawer,
}: {
  lessonLength: number
  selectedCharIndex: number
  toggleDrawer: () => void
}) {
  const isVerySmallScreen = useVerySmallScreen()
  const isSmallScreen = useSmallScreen()
  const [lessonProgress, setLessonProgress] = useState(0)
  const { lesson } = useLoaderData() as LoadLearn
  const { flashbackChar } = useFlashback()
  const { constants, palette, spacing } = useTheme()

  useEffect(() => setLessonProgress(calculateProgress(lessonLength, selectedCharIndex)), [lessonLength, selectedCharIndex])

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: flashbackChar ? 'primary.700' : 'background.default',
          backgroundImage: flashbackChar ? constants.synapsesBackground : undefined,
          borderBottom: `1px solid ${palette.grey[300]}`,
          transition: `background-color ${constants.animationDuration}`,
        }}
        position='fixed'
      >
        <Toolbar disableGutters sx={{ m: 'auto', width: 1, maxWidth: constants.maxContentWidth, px: { xs: 1, sm: 2 } }}>
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
                <ExitFlashbackButton glyph={lesson.characters[selectedCharIndex].glyph} />

                <When condition={!isVerySmallScreen}>
                  <FlashbackModeTitle />
                </When>

                <CloseLearnButton />
              </Box>
            </Else>
          </If>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

function calculateProgress(lessonLength: number, activeIndex?: number) {
  return activeIndex === undefined ? 0 : (activeIndex / (lessonLength - 1)) * 100
}
