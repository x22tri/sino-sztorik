import { Params, redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { AssembledLesson, LessonStatuses } from '../interfaces'

export interface LoadLearn {
  lesson: AssembledLesson
}

export function loadLearn({ params }: { params: Params }) {
  const lesson = LESSONS.find(lesson => lesson.tierStatuses.includes(LessonStatuses.UPCOMING))

  if (!lesson) {
    return redirect('/')
  }

  return { lesson }
}
