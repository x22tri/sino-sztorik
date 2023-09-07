import { create } from 'zustand'
import { CharFormData } from '../../../shared/route-loaders/loadAdminChar'
import { CharFormError, TimelineError } from '../admin-content/AdminStepLabel'

export const useCharEditErrors = create<CharEditErrorsStore>(set => ({
  charFormErrors: defaultCharFormErrors,
  timelineErrors: defaultTimelineErrors,
  setCharFormErrors: () => {
    // set(state => ({ state })),
  },
  setTimelineErrors: () => {
    // set((state) => state.timelineErrors)
  },
}))

interface CharEditErrorsStore {
  //   flashbackChar: Character | undefined
  //   startFlashback: (destination: string) => void
  //   quitFlashback: () => void
  charFormErrors: null | { [key in CharFormError]: { value: boolean; dependencies: keyof CharFormData[] } }
  timelineErrors: null | { [key in TimelineError]: { value: boolean } }
  setCharFormErrors: () => void
  //   Dispatch<SetStateAction<{ [key in CharFormError]: { value: boolean; dependencies: keyof CharFormData[] } }>>
  setTimelineErrors: () => void
  //   Dispatch<SetStateAction<{ [key in TimelineError]: { value: boolean } }>>
  //registerErrors()?
}

const defaultCharFormErrors = {
  [CharFormError.FrequencyNotANumber]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.KeywordAndFrequencyGoHandInHand]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.NoKeywordOrPrimitive]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.KeywordAndPinyinGoHandInHand]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.NoProductivePhoneticWithoutPinyin]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.WithheldConstituentsButNoConstituents]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.WithheldMeaningButNoKeywordOrPrimitive]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.OtherUseCannotBeEmpty]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
  [CharFormError.PrimitiveCannotHaveOtherUses]: { value: false, dependencies: [] as unknown as keyof CharFormData[] },
}

const defaultTimelineErrors = {
  [TimelineError.MissingStory]: { value: false },
  [TimelineError.KeywordNotIntroduced]: { value: false },
  [TimelineError.PrimitiveNotIntroduced]: { value: false },
  [TimelineError.CourseLocationNotSet]: { value: false },
}
