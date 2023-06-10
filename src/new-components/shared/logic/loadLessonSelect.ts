import { Params, redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { AssembledLesson, LessonStatuses, TierStatuses } from '../interfaces'
import { LEARN_PATH, LESSON_SELECT_PATH, REVIEW_PATH } from '../paths'
import { isDisabledLesson } from '../utility-functions'
import { LEARN_BUTTON, LEARN_BUTTON_EXPLANATION, REVIEW_BUTTON, REVIEW_BUTTON_EXPLANATION } from '../strings'

const { COMPLETED, UPCOMING } = LessonStatuses

export enum LearnReviewOption {
  Learn,
  Review,
}

export interface ButtonOption {
  button: string
  explanation: string
  link: string
}

export interface LoadLessonSelect {
  learnReviewOptions: ButtonOption[]
  lessons: AssembledLesson[]
  nextLesson: AssembledLesson | null
  prevLesson: AssembledLesson | null
  selectedLesson: AssembledLesson
  upcomingIndex: number
}

export function loadLessonSelect({ params }: { params: Params }): Response | LoadLessonSelect {
  const lessons = LESSONS

  if (!lessons) {
    throw new Response('Lessons cannot be found.', { status: 404 })
  }

  const upcomingIndex = lessons.findIndex(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))

  if (!upcomingIndex) {
    throw new Response('Upcoming lesson cannot be found.', { status: 404 })
  }

  if (!params.lessonNumber) {
    return redirect(`${LESSON_SELECT_PATH}/${upcomingIndex + 1}`)
  }

  const selectedLessonNumber = Number(params.lessonNumber)
  const selectedLesson = lessons[selectedLessonNumber - 1]

  if (!selectedLesson) {
    return redirect(`${LESSON_SELECT_PATH}/${upcomingIndex + 1}`)
  }

  const nextLesson = getLessonIfActive(lessons[selectedLessonNumber])
  const prevLesson = getLessonIfActive(lessons[selectedLessonNumber - 2])
  const learnReviewOptions = getLearnReviewOptions(selectedLesson)

  return { learnReviewOptions, lessons, nextLesson, prevLesson, selectedLesson, upcomingIndex }
}

function getLessonIfActive(lesson: AssembledLesson | null) {
  return lesson && !isDisabledLesson(lesson.tierStatuses) ? lesson : null
}

function getLearnReviewOptions({ lessonNumber, tierStatuses }: AssembledLesson) {
  let learnReviewOptions: ButtonOption[] = []

  if (tierStatuses.includes(UPCOMING)) {
    learnReviewOptions.push({
      button: LEARN_BUTTON,
      explanation: LEARN_BUTTON_EXPLANATION,
      link: LEARN_PATH,
    })
  }

  if (tierStatuses.includes(COMPLETED)) {
    learnReviewOptions.push({
      button: REVIEW_BUTTON,
      explanation: REVIEW_BUTTON_EXPLANATION,
      link: `${REVIEW_PATH}/${lessonNumber}`,
    })
  }

  return learnReviewOptions
}
