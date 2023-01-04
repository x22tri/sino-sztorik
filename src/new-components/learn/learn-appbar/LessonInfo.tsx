import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { LessonInfoMobile } from './LessonInfoMobile'
import { useSmallScreen } from '../../shared/utility-functions'
import { Display } from '../../shared/utility-components'
import { LESSON_NUMBER_SUFFIX_APPBAR } from '../../shared/strings'
import { ReturnFromFlashback } from './ReturnFromFlashback'
import { useFlashback } from '../logic/useFlashback'

export function LessonInfo({
  lessonNumber,
  lessonTitle,
}: {
  lessonNumber: number
  lessonTitle: string
}) {
  const logoImage = require(`../../../assets/logo.png`)

  const isSmallScreen = useSmallScreen()

  const { flashback } = useFlashback()

  return (
    <Display
      if={!isSmallScreen}
      else={
        <LessonInfoMobile
          {...{
            lessonNumber,
          }}
        />
      }
    >
      <Box display='flex' flexDirection='row' marginX={1} gap={1}>
        <Display if={!flashback} else={<ReturnFromFlashback />}>
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
