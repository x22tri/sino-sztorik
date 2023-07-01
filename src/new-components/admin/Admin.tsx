import { LayoutGrid } from '../shared/components/LayoutGrid'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { AdminAppbar } from './admin-appbar/AdminAppbar'
import AdminContent, { TimelineError } from './admin-content/AdminContent'
import { AdminBottomNav } from './admin-bottom-nav/AdminBottomNav'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { SortedCharacterEntry, SortedOccurrences } from '../shared/logic/loadAdminChar'
import { isFullOccurrence, isWithheldPrimitiveOccurrence, isWithheldKeywordOccurrence } from './utils/occurrence-utils'

export function Admin() {
  const [activeStep, setActiveStep] = useState(1)
  const [toolbarHeight, setToolbarHeight] = useState(0)

  const { character } = useLoaderData() as { character: SortedCharacterEntry }
  const [occurrences, setOccurrences] = useState(character.occurrences)
  const [savedOccurrences, saveOccurrences] = useState<SortedOccurrences>([...character.occurrences])

  const [timelineErrors, setTimelineErrors] = useState<TimelineError[]>([])

  useTimelineErrors(character, occurrences, setTimelineErrors)

  return (
    <LayoutGrid
      sideNav={{
        title: <AdminSubmenuTitle />,
        content: <AdminCharPickerContent />,
        selected: 0,
      }}
    >
      <AdminAppbar {...{ setToolbarHeight, toolbarHeight }} />

      <AdminContent {...{ activeStep, character, occurrences, setOccurrences, timelineErrors, toolbarHeight }} />

      <AdminBottomNav isFinalCheckDisabled={!!timelineErrors.length} {...{ activeStep, setActiveStep }} />
    </LayoutGrid>
  )
}

function useTimelineErrors(
  character: SortedCharacterEntry,
  occurrences: SortedOccurrences,
  setTimelineErrors: Dispatch<SetStateAction<TimelineError[]>>
) {
  useEffect(() => {
    const errors: TimelineError[] = []

    if (occurrences.some(occurrence => 'story' in occurrence && occurrence.story.length === 0)) {
      errors.push(TimelineError.MissingStory)
    }

    if (
      'keyword' in character &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence))
    ) {
      errors.push(TimelineError.KeywordNotIntroduced)
    }

    if (
      'primitive' in character &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence))
    ) {
      errors.push(TimelineError.PrimitiveNotIntroduced)
    }

    if (occurrences.some(occurrence => 'index' in occurrence && occurrence.index === 0)) {
      errors.push(TimelineError.CourseLocationNotSet)
    }

    setTimelineErrors(errors)
  }, [character, occurrences])
}
