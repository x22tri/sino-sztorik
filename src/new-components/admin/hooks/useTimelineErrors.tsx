import { DependencyList, useContext } from 'react'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { isFullOccurrence, isWithheldPrimitiveOccurrence, isWithheldKeywordOccurrence } from '../utils/occurrence-utils'
import { TimelineError } from '../admin-content/AdminStepLabel'
import { useLazyEffect } from '../../shared/hooks/useLazyEffect'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'
import { hasNoKeyword, hasNoPrimitive } from '../utils/char-form-utils'

export function useTimelineErrors(charFormData: CharFormData, occurrences: TimelineData) {
  useRegisterError({
    condition: occurrences.some(o => 'story' in o && o.story.length === 0),
    dependencies: [occurrences],
    error: TimelineError.MissingStory,
  })

  useRegisterError({
    condition: !hasNoKeyword(charFormData) && !occurrences.some(o => isFullOccurrence(o) || isWithheldPrimitiveOccurrence(o)),
    dependencies: [charFormData.keyword, occurrences],
    error: TimelineError.KeywordNotIntroduced,
  })

  useRegisterError({
    condition: !hasNoPrimitive(charFormData) && !occurrences.some(o => isFullOccurrence(o) || isWithheldKeywordOccurrence(o)),
    dependencies: [charFormData.primitive, occurrences],
    error: TimelineError.PrimitiveNotIntroduced,
  })

  useRegisterError({
    condition: occurrences.some(o => 'index' in o && o.index === 0),
    dependencies: [occurrences],
    error: TimelineError.CourseLocationNotSet,
  })
}

function useRegisterError(errorConfig: { condition: boolean; dependencies: DependencyList; error: TimelineError }) {
  const { setTimelineErrors } = useContext(CharAdminErrorContext)

  useLazyEffect(() => {
    setTimelineErrors(prev => ({ ...prev, [errorConfig.error]: errorConfig.condition }))
  }, errorConfig.dependencies)
}
