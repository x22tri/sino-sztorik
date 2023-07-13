import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { CharFormError, TimelineError } from '../admin-content/AdminStepLabel'

type CharAdminErrorContextType = {
  charFormErrors: { [key in CharFormError]: boolean }
  timelineErrors: TimelineError[]
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
  setTimelineErrors: Dispatch<SetStateAction<TimelineError[]>>
}

export const CharAdminErrorContext = createContext<CharAdminErrorContextType>({
  charFormErrors: {
    [CharFormError.FrequencyNotANumber]: false,
    [CharFormError.FrequencyNotPresentWithKeyword]: false,
    [CharFormError.NoKeywordOrPrimitive]: false,
  },
  timelineErrors: [],
  setCharFormErrors: () => {},
  setTimelineErrors: () => {},
})

export function useCharAdminErrors() {
  const [charFormErrors, setCharFormErrors] = useState<{ [key in CharFormError]: boolean }>({
    [CharFormError.FrequencyNotANumber]: false,
    [CharFormError.FrequencyNotPresentWithKeyword]: false,
    [CharFormError.NoKeywordOrPrimitive]: false,
  })

  const [timelineErrors, setTimelineErrors] = useState<TimelineError[]>([])

  return { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }
}
