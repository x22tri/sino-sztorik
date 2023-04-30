import Box from '@mui/material/Box'
import { LessonInfoMobile } from './LessonInfoMobile'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { ReturnFromFlashbackDesktop } from './ReturnFromFlashbackDesktop'
import { ReturnFromFlashbackMobile } from './ReturnFromFlashbackMobile'
import { LessonInfoDesktop } from './LessonInfoDesktop'
import { If, Then, Else } from 'react-if'
import { useStore } from '../../shared/logic/useStore'

export function LessonInfo({ lessonNumber, lessonTitle }: { lessonNumber: number; lessonTitle: string }) {
  const isSmallScreen = useSmallScreen()
  const { flashbackChar } = useStore(({ flashback }) => flashback)

  if (flashbackChar && isSmallScreen) {
    return <ReturnFromFlashbackMobile />
  }

  if (isSmallScreen) {
    return <LessonInfoMobile {...{ lessonNumber }} />
  }

  return (
    <Box display='flex' flexDirection='row' marginX={1} gap={1}>
      <If condition={!flashbackChar}>
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
