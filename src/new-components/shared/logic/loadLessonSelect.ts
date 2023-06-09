import { LESSONS } from '../MOCK_LESSONS'
import { LessonStatuses } from '../interfaces'

export function loadLessonSelect() {
  const lessons = LESSONS

  if (!lessons) {
    throw new Response('Lessons cannot be found.', { status: 404 })
  }

  const upcomingIndex = lessons.findIndex(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))

  if (!upcomingIndex) {
    throw new Response('Upcoming lesson cannot be found.', { status: 404 })
  }

  return { lessons, upcomingIndex }
}
