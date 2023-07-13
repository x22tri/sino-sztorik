import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { CharFormError, TimelineError } from '../admin-content/AdminStepLabel'

type CharAdminErrorContextType = {
  charFormErrors: { [key in CharFormError]: boolean }
  timelineErrors: { [key in TimelineError]: boolean }
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
  setTimelineErrors: Dispatch<SetStateAction<{ [key in TimelineError]: boolean }>>
}

export const CharAdminErrorContext = createContext<CharAdminErrorContextType>({
  charFormErrors: {} as { [key in CharFormError]: boolean },
  timelineErrors: {} as { [key in TimelineError]: boolean },
  setCharFormErrors: () => {},
  setTimelineErrors: () => {},
})

export function useCharAdminErrors() {
  const [charFormErrors, setCharFormErrors] = useState<{ [key in CharFormError]: boolean }>({
    [CharFormError.FrequencyNotANumber]: false,
    [CharFormError.FrequencyNotPresentWithKeyword]: false,
    [CharFormError.NoKeywordOrPrimitive]: false,
  })

  const [timelineErrors, setTimelineErrors] = useState<{ [key in TimelineError]: boolean }>({
    [TimelineError.MissingStory]: false,
    [TimelineError.KeywordNotIntroduced]: false,
    [TimelineError.PrimitiveNotIntroduced]: false,
    [TimelineError.CourseLocationNotSet]: false,
  })

  return { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }
}

export function getCharAdminErrors<T extends string>(errors: { [key in T]: boolean }) {
  return Object.entries(errors).flatMap(([key, value]) => (value ? (key as T) : []))
}
