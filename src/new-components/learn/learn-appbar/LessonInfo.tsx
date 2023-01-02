import Box from '@mui/material/Box'
import { Typography, useTheme } from '@mui/material'
import { LessonInfoMobile } from './LessonInfoMobile'
import { Character } from '../../shared/interfaces'
import { useSmallScreen } from '../../shared/utility-functions'
import { Display } from '../../shared/utility-components'
import { LESSON_NUMBER_SUFFIX_APPBAR } from '../../shared/strings'
import { ReturnFromFlashback } from './ReturnFromFlashback'

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
            <TitleSubtitle
              title={lessonNumber + LESSON_NUMBER_SUFFIX_APPBAR}
              subtitle={lessonTitle}
            />
          </>
        </Display>
      </Box>
    </Display>
  )
}

function TitleSubtitle({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  const { palette } = useTheme()

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        component='span'
        typography='titleSubtitle.title'
        sx={{ color: palette.text.disabled }}
      >
        {title}
      </Box>
      <Box
        component='span'
        typography='titleSubtitle.subtitle'
        sx={{ color: palette.text.secondary }}
      >
        {subtitle}
      </Box>
    </Box>
  )
}
