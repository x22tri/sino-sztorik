import Box from '@mui/material/Box'
import { LessonInfoMobile } from './LessonInfoMobile'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { ReturnFromFlashbackDesktop } from './ReturnFromFlashbackDesktop'
import { useFlashback } from '../logic/useFlashback'
import { ReturnFromFlashbackMobile } from './ReturnFromFlashbackMobile'
import { LessonInfoDesktop } from './LessonInfoDesktop'
import { If, Then, Else } from 'react-if'

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
      <If condition={!flashback}>
        <Then>
          <LessonInfoDesktop {...{ lessonNumber, lessonTitle }} />
        </Then>
        <Else>
          <ReturnFromFlashbackDesktop />
        </Else>
      </If>
    </Box>
  )
}
