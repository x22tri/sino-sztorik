import Box from '@mui/material/Box'
import { Button, Typography, useTheme } from '@mui/material'
import { LessonInfoMobile } from './LessonInfoMobile'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Character } from '../../shared/interfaces'
import { useSmallScreen } from '../../shared/utility-functions'
import { Display } from '../../shared/utility-components'
import {
  BACK_TO_LESSON_FROM_FLASHBACK,
  FLASHBACK_MODE,
  LESSON_NUMBER_SUFFIX_APPBAR,
} from '../../shared/strings'

export function LessonInfo({
  charToReturnToFromFlashback,
  lessonNumber,
  lessonTitle,
  returnFromFlashback,
}: {
  charToReturnToFromFlashback: Character | null
  lessonNumber: number
  lessonTitle: string
  returnFromFlashback: () => void
}) {
  const { palette } = useTheme()

  const logoImage = require(`../../../assets/logo.png`)

  const isSmallScreen = useSmallScreen()

  return (
    <Display
      if={!isSmallScreen}
      else={
        <LessonInfoMobile
          {...{
            charToReturnToFromFlashback,
            lessonNumber,
            returnFromFlashback,
          }}
        />
      }
    >
      <Box display='flex' flexDirection='row' marginX={1} gap={1}>
        <Display
          if={!charToReturnToFromFlashback}
          else={
            <ReturnFromFlashback
              charToReturnToFromFlashback={charToReturnToFromFlashback!}
              {...{ returnFromFlashback }}
            />
          }
        >
          <>
            <img src={logoImage} alt='Logó' width='auto' height='28px' />
            <Box display='flex' flexDirection='column'>
              <Typography
                component='span'
                lineHeight={1}
                sx={{
                  fontWeight: 900,
                  fontSize: '80%',
                  color: palette.text.disabled,
                }}
              >
                {lessonNumber}
                {LESSON_NUMBER_SUFFIX_APPBAR}
              </Typography>
              <Typography
                component='span'
                lineHeight={1}
                sx={{ fontWeight: 'bold', color: palette.text.secondary }}
              >
                {lessonTitle}
              </Typography>
            </Box>
          </>
        </Display>
      </Box>
    </Display>
  )
}

function ReturnFromFlashback({
  charToReturnToFromFlashback,
  returnFromFlashback,
}: {
  charToReturnToFromFlashback: Character
  returnFromFlashback: () => void
}) {
  return (
    <Button
      size='small'
      variant='contained'
      onClick={returnFromFlashback}
      startIcon={<FontAwesomeIcon icon={faChevronLeft} transform='shrink-4' />}
      sx={{ ml: 1, minWidth: 0 }}
    >
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        <Typography
          component='span'
          lineHeight={1}
          sx={{ fontWeight: 900, fontSize: '80%', opacity: 0.5 }}
        >
          {FLASHBACK_MODE}
        </Typography>
        <Typography component='span' lineHeight={1} sx={{ fontWeight: 'bold' }}>
          {BACK_TO_LESSON_FROM_FLASHBACK} (
          {charToReturnToFromFlashback?.charChinese})
        </Typography>
      </Box>
    </Button>
  )
}
