import { redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'

export function loadLessonSelect() {
  const lessons = LESSONS

  if (!lessons) {
    return redirect('/')
  }

  return lessons
}
