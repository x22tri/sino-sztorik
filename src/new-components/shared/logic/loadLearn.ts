import { redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { LessonStatuses } from '../interfaces'

export function loadLearn() {
  const lesson = LESSONS.find(lesson => lesson.tierStatuses.includes(LessonStatuses.UPCOMING))

  if (!lesson) {
    return redirect('/')
  }

  return lesson
}
