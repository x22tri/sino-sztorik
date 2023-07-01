import { LayoutGrid } from '../shared/components/LayoutGrid'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { AdminAppbar } from './admin-appbar/AdminAppbar'
import AdminContent from './admin-content/AdminContent'
import { AdminBottomNav } from './admin-bottom-nav/AdminBottomNav'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { SortedCharacterEntry, SortedOccurrences } from '../shared/logic/loadAdminChar'
import { CharFormError, TimelineError } from './admin-content/AdminStepLabel'
import { useTimelineErrors } from './hooks/useTimelineErrors'
import { useCharFormErrors } from './hooks/useCharFormErrors'

export function Admin() {
  const [activeStep, setActiveStep] = useState(0)
  const [toolbarHeight, setToolbarHeight] = useState(0)

  const char = useLoaderData() as { character: SortedCharacterEntry }
  const [character, setCharacter] = useState(char.character)
  const [occurrences, setOccurrences] = useState(character.occurrences)
  const [savedOccurrences, saveOccurrences] = useState<SortedOccurrences>([...character.occurrences])

  const [charFormErrors, setCharFormErrors] = useState<CharFormError[]>([])
  const [timelineErrors, setTimelineErrors] = useState<TimelineError[]>([])

  useCharFormErrors(character, setCharFormErrors)
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

      <AdminContent {...{ activeStep, character, charFormErrors, occurrences, setOccurrences, timelineErrors, toolbarHeight }} />

      <AdminBottomNav isFinalCheckDisabled={!!timelineErrors.length} {...{ activeStep, setActiveStep }} />
    </LayoutGrid>
  )
}
