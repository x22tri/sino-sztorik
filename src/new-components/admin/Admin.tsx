import { LayoutGrid } from '../shared/components/LayoutGrid'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { AdminAppbar } from './admin-appbar/AdminAppbar'
import AdminContent from './admin-content/AdminContent'
import { AdminBottomNav } from './admin-bottom-nav/AdminBottomNav'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { CharFormData, TimelineData } from '../shared/logic/loadAdminChar'
import { CharFormError, TimelineError } from './admin-content/AdminStepLabel'
import { useTimelineErrors } from './hooks/useTimelineErrors'
import { useCharFormErrors } from './hooks/useCharFormErrors'

export function Admin() {
  const [activeStep, setActiveStep] = useState(0)
  const [toolbarHeight, setToolbarHeight] = useState(0)

  const loaderData = useLoaderData() as { charFormData: CharFormData; timelineData: TimelineData }
  const [charFormData, setCharFormData] = useState(loaderData.charFormData)
  const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  const [savedOccurrences, saveOccurrences] = useState<TimelineData>({ ...loaderData.timelineData })

  const [charFormErrors, setCharFormErrors] = useState<CharFormError[]>([])
  const [timelineErrors, setTimelineErrors] = useState<TimelineError[]>([])

  useCharFormErrors(charFormData, setCharFormErrors)
  useTimelineErrors(charFormData, timelineData, setTimelineErrors)

  return (
    <LayoutGrid
      sideNav={{
        title: <AdminSubmenuTitle />,
        content: <AdminCharPickerContent />,
        selected: 0,
      }}
    >
      <AdminAppbar {...{ setToolbarHeight, toolbarHeight }} />

      <AdminContent
        {...{ activeStep, charFormData, charFormErrors, timelineData, setTimelineData, timelineErrors, toolbarHeight }}
      />

      <AdminBottomNav isFinalCheckDisabled={!!timelineErrors.length} {...{ activeStep, setActiveStep }} />
    </LayoutGrid>
  )
}
