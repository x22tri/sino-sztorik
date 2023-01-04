import Box from '@mui/material/Box'
import { LessonInfoMobile } from './LessonInfoMobile'
import { useSmallScreen } from '../../shared/utility-functions'
import { Display } from '../../shared/utility-components'
import { ReturnFromFlashbackDesktop } from './ReturnFromFlashbackDesktop'
import { useFlashback } from '../logic/useFlashback'
import { ReturnFromFlashbackMobile } from './ReturnFromFlashbackMobile'
import { LessonInfoDesktop } from './LessonInfoDesktop'

export function LessonInfo({
  lessonNumber,
  lessonTitle,
}: {
  lessonNumber: number
  lessonTitle: string
}) {
  const isSmallScreen = useSmallScreen()

  const { flashback } = useFlashback()

  if (flashback && isSmallScreen) {
    return <ReturnFromFlashbackMobile />
  }

  if (isSmallScreen) {
    return <LessonInfoMobile {...{ lessonNumber }} />
  }

  return (
    <Box display='flex' flexDirection='row' marginX={1} gap={1}>
      <Display if={!flashback} else={<ReturnFromFlashbackDesktop />}>
        <LessonInfoDesktop {...{ lessonNumber, lessonTitle }} />
      </Display>
    </Box>
  )
}
