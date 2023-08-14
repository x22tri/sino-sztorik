import { DependencyList, useContext } from 'react'
import { CharFormData, TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormError, TimelineError } from '../admin-content/AdminStepLabel'
import { useDebouncedEffect } from '../../shared/hooks/useDebouncedEffect'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'
import { isPresent } from '../utils/char-form-utils'
import {
  isFullOccurrence,
  isWithheldConstituentsOccurrence,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
} from '../utils/occurrence-utils'

type CharAdminCategory = CharFormData | TimelineData

type CharAdminError<T extends CharAdminCategory> = T extends CharFormData
  ? CharFormError
  : T extends TimelineData
  ? TimelineError
  : never

export function useRegisterCharAdminErrors(charFormData: CharFormData, timelineData: TimelineData) {
  useRegisterError({
    condition: charFormData.frequency !== undefined && Number.isNaN(+charFormData.frequency),
    dependencies: [charFormData.frequency],
    error: CharFormError.FrequencyNotANumber,
  })

  useRegisterError({
    condition: isPresent(charFormData, 'keyword') !== isPresent(charFormData, 'frequency'),
    dependencies: [charFormData.keyword, charFormData.frequency],
    error: CharFormError.KeywordAndFrequencyGoHandInHand,
  })

  useRegisterError({
    condition: !isPresent(charFormData, 'keyword') && !isPresent(charFormData, 'primitive'),
    dependencies: [charFormData.keyword, charFormData.primitive],
    error: CharFormError.NoKeywordOrPrimitive,
  })

  useRegisterError({
    condition: isPresent(charFormData, 'keyword') !== isPresent(charFormData, 'pinyin'),
    dependencies: [charFormData.keyword, charFormData.pinyin],
    error: CharFormError.KeywordAndPinyinGoHandInHand,
  })

  useRegisterError({
    condition: charFormData.productivePinyin === true && !isPresent(charFormData, 'pinyin'),
    dependencies: [charFormData.productivePinyin, charFormData.pinyin],
    error: CharFormError.NoProductivePhoneticWithoutPinyin,
  })

  useRegisterError({
    condition:
      (!isPresent(charFormData, 'keyword') || !isPresent(charFormData, 'primitive')) &&
      timelineData.some(occurrence => isWithheldPrimitiveOccurrence(occurrence)),
    dependencies: [charFormData.keyword, charFormData.primitive, timelineData],
    error: CharFormError.WithheldMeaningButNoKeywordOrPrimitive,
  })

  useRegisterError({
    condition:
      !charFormData['constituents']?.length && timelineData.some(occurrence => isWithheldConstituentsOccurrence(occurrence)),
    dependencies: [charFormData.constituents, timelineData],
    error: CharFormError.WithheldConstituentsButNoConstituents,
  })

  useRegisterError({
    condition:
      !!charFormData['otherUses']?.length &&
      charFormData.otherUses.some(({ pinyin, meanings }) => pinyin === '' || meanings.some(meaning => meaning === '')),
    dependencies: [charFormData.otherUses],
    error: CharFormError.OtherUseCannotBeEmpty,
  })

  useRegisterError({
    condition: timelineData.some(occurrence => 'story' in occurrence && occurrence.story.length === 0),
    dependencies: [timelineData],
    error: TimelineError.MissingStory,
  })

  useRegisterError({
    condition:
      isPresent(charFormData, 'keyword') &&
      !timelineData.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence)),
    dependencies: [charFormData.keyword, timelineData],
    error: TimelineError.KeywordNotIntroduced,
  })

  useRegisterError({
    condition:
      isPresent(charFormData, 'primitive') &&
      !timelineData.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence)),
    dependencies: [charFormData.primitive, timelineData],
    error: TimelineError.PrimitiveNotIntroduced,
  })

  useRegisterError({
    condition: timelineData.some(occurrence => 'index' in occurrence && occurrence.index === 0),
    dependencies: [timelineData],
    error: TimelineError.CourseLocationNotSet,
  })
}

function useRegisterError<T extends CharAdminCategory>({
  condition,
  dependencies,
  error,
}: {
  condition: boolean
  dependencies: DependencyList
  error: CharAdminError<T>
}) {
  const { setCharFormErrors, setTimelineErrors } = useContext(CharAdminErrorContext)

  useDebouncedEffect(() => {
    if (error in CharFormError) {
      setCharFormErrors(prev => ({ ...prev, [error]: { value: condition, dependencies } }))
    } else {
      setTimelineErrors(prev => ({ ...prev, [error]: { value: condition } }))
    }
  }, dependencies)
}
