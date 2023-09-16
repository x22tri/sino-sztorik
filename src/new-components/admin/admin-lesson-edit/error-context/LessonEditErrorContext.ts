import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { LessonFormError, LessonTimelineError } from '../../shared/AdminStepLabel'
import { LessonFormData } from '../../../shared/route-loaders/loadLessonEdit'

type LessonEditErrorContextType = {
  lessonFormErrors: { [key in LessonFormError]: { value: boolean; dependencies: keyof LessonFormData[] } }
  lessonTimelineErrors: { [key in LessonTimelineError]: { value: boolean } }
  setLessonFormErrors: Dispatch<
    SetStateAction<{ [key in LessonFormError]: { value: boolean; dependencies: keyof LessonFormData[] } }>
  >
  setLessonTimelineErrors: Dispatch<SetStateAction<{ [key in LessonTimelineError]: { value: boolean } }>>
}

export const LessonEditErrorContext = createContext<LessonEditErrorContextType>({
  lessonFormErrors: {} as { [key in LessonFormError]: { value: boolean; dependencies: keyof LessonFormData[] } },
  lessonTimelineErrors: {} as { [key in LessonTimelineError]: { value: boolean } },
  setLessonFormErrors: () => {},
  setLessonTimelineErrors: () => {},
})

export function useLessonEditErrors() {
  const [lessonFormErrors, setLessonFormErrors] = useState<{
    [key in LessonFormError]: { value: boolean; dependencies: keyof LessonFormData[] }
  }>({
    [LessonFormError.NoTitle]: { value: false, dependencies: [] as unknown as keyof LessonFormData[] },
  })

  const [lessonTimelineErrors, setLessonTimelineErrors] = useState<{
    [key in LessonTimelineError]: { value: boolean }
  }>({
    [LessonTimelineError.MissingPreface]: { value: false },
  })

  return { lessonFormErrors, lessonTimelineErrors, setLessonFormErrors, setLessonTimelineErrors }
}
