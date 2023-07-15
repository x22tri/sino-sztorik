import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { CharFormError, TimelineError } from '../admin-content/AdminStepLabel'
import { CharFormData, TimelineData } from '../../shared/logic/loadAdminChar'
import { valueof } from '../../shared/interfaces'

type CharAdminErrorContextType = {
  charFormErrors: { [key in CharFormError]: { value: boolean; dependencies: keyof CharFormData[] } }
  timelineErrors: { [key in TimelineError]: { value: boolean } }
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: { value: boolean; dependencies: keyof CharFormData[] } }>>
  setTimelineErrors: Dispatch<SetStateAction<{ [key in TimelineError]: { value: boolean } }>>
}

export const CharAdminErrorContext = createContext<CharAdminErrorContextType>({
  charFormErrors: {} as { [key in CharFormError]: { value: boolean; dependencies: keyof CharFormData[] } },
  timelineErrors: {} as { [key in TimelineError]: { value: boolean } },
  setCharFormErrors: () => {},
  setTimelineErrors: () => {},
})

export function useCharAdminErrors() {
  const [charFormErrors, setCharFormErrors] = useState<{
    [key in CharFormError]: { value: boolean; dependencies: keyof CharFormData[] }
  }>({
    [CharFormError.FrequencyNotANumber]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
    [CharFormError.KeywordAndFrequencyGoHandInHand]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
    [CharFormError.NoKeywordOrPrimitive]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
    [CharFormError.KeywordAndPinyinGoHandInHand]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
    [CharFormError.NoProductivePhoneticWithoutPronunciation]: {
      value: false,
      dependencies: [] as unknown as keyof CharFormData[],
    },
  })

  const [timelineErrors, setTimelineErrors] = useState<{
    [key in TimelineError]: { value: boolean }
  }>({
    [TimelineError.MissingStory]: { value: false },
    [TimelineError.KeywordNotIntroduced]: { value: false },
    [TimelineError.PrimitiveNotIntroduced]: { value: false },
    [TimelineError.CourseLocationNotSet]: { value: false },
  })

  return { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }
}

export function getCharAdminErrors<T extends string>(errors: {
  [key in T]: { value: boolean }
}) {
  return Object.entries(errors).flatMap(([key, val]) => ((val as { value: boolean }).value ? (key as T) : []))
}
