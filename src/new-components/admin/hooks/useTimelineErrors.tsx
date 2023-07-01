import { Dispatch, SetStateAction, useEffect } from 'react'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { isFullOccurrence, isWithheldPrimitiveOccurrence, isWithheldKeywordOccurrence } from '../utils/occurrence-utils'
import { TimelineError } from '../admin-content/AdminStepLabel'

export function useTimelineErrors(
  character: CharFormData,
  occurrences: TimelineData,
  setTimelineErrors: Dispatch<SetStateAction<TimelineError[]>>
) {
  useEffect(() => {
    const detectedTimelineErrors = checkForTimelineErrors(character, occurrences)

    setTimelineErrors(detectedTimelineErrors)
  }, [character, occurrences])
}

function checkForTimelineErrors(character: CharFormData, occurrences: TimelineData) {
  const detectedTimelineErrors: TimelineError[] = []

  if (occurrences.some(occurrence => 'story' in occurrence && occurrence.story.length === 0)) {
    detectedTimelineErrors.push(TimelineError.MissingStory)
  }

  if (
    'keyword' in character &&
    !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence))
  ) {
    detectedTimelineErrors.push(TimelineError.KeywordNotIntroduced)
  }

  if (
    'primitive' in character &&
    !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence))
  ) {
    detectedTimelineErrors.push(TimelineError.PrimitiveNotIntroduced)
  }

  if (occurrences.some(occurrence => 'index' in occurrence && occurrence.index === 0)) {
    detectedTimelineErrors.push(TimelineError.CourseLocationNotSet)
  }

  return detectedTimelineErrors
}
