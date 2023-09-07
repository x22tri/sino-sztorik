import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'

export function loadReview({ params }: LoaderFunctionArgs) {
  const lesson = LESSONS.find(({ lessonNumber }) => String(lessonNumber) === params.lessonNumber)

  if (!lesson) {
    return redirect('/')
  }

  return { lesson }
}
