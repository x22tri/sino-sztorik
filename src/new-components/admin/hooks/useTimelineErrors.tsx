import { DependencyList, useContext } from 'react'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { isFullOccurrence, isWithheldPrimitiveOccurrence, isWithheldKeywordOccurrence } from '../utils/occurrence-utils'
import { TimelineError } from '../admin-content/AdminStepLabel'
import { useLazyEffect } from '../../shared/hooks/useLazyEffect'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'
import { isPresent } from '../utils/char-form-utils'

export function useTimelineErrors(charFormData: CharFormData, occurrences: TimelineData) {
  useRegisterError({
    condition: occurrences.some(occurrence => 'story' in occurrence && occurrence.story.length === 0),
    dependencies: [occurrences],
    error: TimelineError.MissingStory,
  })

  useRegisterError({
    condition:
      isPresent(charFormData, 'keyword') &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence)),
    dependencies: [charFormData.keyword, occurrences],
    error: TimelineError.KeywordNotIntroduced,
  })

  useRegisterError({
    condition:
      isPresent(charFormData, 'primitive') &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence)),
    dependencies: [charFormData.primitive, occurrences],
    error: TimelineError.PrimitiveNotIntroduced,
  })

  useRegisterError({
    condition: occurrences.some(occurrence => 'index' in occurrence && occurrence.index === 0),
    dependencies: [occurrences],
    error: TimelineError.CourseLocationNotSet,
  })
}

function useRegisterError({
  condition,
  dependencies,
  error,
}: {
  condition: boolean
  dependencies: DependencyList
  error: TimelineError
}) {
  const { setTimelineErrors } = useContext(CharAdminErrorContext)

  useLazyEffect(() => {
    setTimelineErrors(prev => ({ ...prev, [error]: { value: condition } }))
  }, dependencies)
}
