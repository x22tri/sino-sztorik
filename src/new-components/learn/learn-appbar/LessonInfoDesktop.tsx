import { LESSON_NUMBER_SUFFIX_APPBAR } from '../../shared/strings'
import { TitleSubtitle } from './TitleSubtitle'

export function LessonInfoDesktop({ lessonNumber, lessonTitle }: { lessonNumber: number; lessonTitle: string }) {
  const logoImage = require(`../../../assets/logo-green.svgz`)

  return (
    <>
      <img src={logoImage} alt='Logó' width='auto' height='28px' />
      <TitleSubtitle title={lessonNumber + LESSON_NUMBER_SUFFIX_APPBAR} subtitle={lessonTitle} />
    </>
  )
}
