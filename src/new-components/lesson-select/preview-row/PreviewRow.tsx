import { AssembledLesson } from '../../shared/interfaces'
import { TierStatusCircle } from '../tier-status-circle/TierStatusCircle'

export function PreviewRow({ lessons }: { lessons: AssembledLesson[] }) {
  return (
    <>
      {lessons.map(({ lessonNumber, tierStatuses }) => (
        <TierStatusCircle
          key={lessonNumber}
          {...{ lessonNumber, tierStatuses }}
        />
      ))}
    </>
  )
}
