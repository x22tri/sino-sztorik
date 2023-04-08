import { AssembledLesson } from '../../shared/interfaces'
import { LessonStartDesktop } from './LessonStartDesktop'
import { LessonStartMobile } from './LessonStartMobile'

export function LessonStart({ isLargeScreen, lesson }: { isLargeScreen: boolean; lesson: AssembledLesson }) {
  return isLargeScreen ? <LessonStartDesktop {...{ lesson }} /> : <LessonStartMobile {...{ lesson }} />
}
