import { LayoutGrid } from '../shared/components/LayoutGrid'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { AdminAppbar } from './admin-appbar/AdminAppbar'
import AdminContent from './admin-content/AdminContent'
import { AdminBottomNav } from './admin-bottom-nav/AdminBottomNav'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { TimelineData } from '../shared/logic/loadAdminChar'
import { CharFormData } from '../shared/logic/loadAdminChar'
import { CharAdminErrorContext, useCharAdminErrors } from './char-admin-error-context/CharAdminErrorContext'
import { FormProvider, useForm } from 'react-hook-form'
import { useCharFormErrors } from './hooks/useCharFormErrors'

export function Admin() {
  const [activeStep, setActiveStep] = useState(0)
  const [toolbarHeight, setToolbarHeight] = useState(0)

  const loaderData = useLoaderData() as { charFormData: CharFormData; timelineData: TimelineData }
  const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  const [savedOccurrences, saveOccurrences] = useState<TimelineData>({ ...loaderData.timelineData })

  const formMethods = useForm({ defaultValues: { ...loaderData.charFormData } })

  const { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors } = useCharAdminErrors()

  return (
    <LayoutGrid
      sideNav={{
        title: <AdminSubmenuTitle />,
        content: <AdminCharPickerContent />,
        selected: 0,
      }}
    >
      <CharAdminErrorContext.Provider value={{ charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }}>
        <AdminAppbar {...{ setToolbarHeight, toolbarHeight }} />

        <FormProvider {...formMethods}>
          <AdminContent {...{ activeStep, saveCharForm, setTimelineData, timelineData, toolbarHeight }} />
        </FormProvider>

        <AdminBottomNav {...{ activeStep, setActiveStep }} />
      </CharAdminErrorContext.Provider>
    </LayoutGrid>
  )
}
