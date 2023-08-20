import { LayoutGrid } from '../shared/components/LayoutGrid'
import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { AdminAppbar } from './admin-appbar/AdminAppbar'
import AdminContent from './admin-content/AdminContent'
import { AdminBottomNav } from './admin-bottom-nav/AdminBottomNav'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { CalculatedIndexes, TimelineData } from '../shared/logic/loadAdminChar'
import { CharFormData } from '../shared/logic/loadAdminChar'
import { CharAdminErrorContext, useCharAdminErrors } from './char-admin-error-context/CharAdminErrorContext'
import { FormProvider, useForm } from 'react-hook-form'
import { useDrawer } from '../shared/hooks/useDrawer'

export function Admin() {
  const [activeStep, setActiveStep] = useState(0)
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  const loaderData = useLoaderData() as {
    calculatedIndexes: CalculatedIndexes
    charFormData: CharFormData
    timelineData: TimelineData
  }
  const formMethods = useForm({ defaultValues: { ...loaderData.charFormData } })
  const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  const [savedTimelineData, saveTimelineData] = useState<TimelineData>({ ...loaderData.timelineData })

  const { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors } = useCharAdminErrors()

  return (
    <LayoutGrid
      sideNav={{
        title: <AdminSubmenuTitle />,
        content: <AdminCharPickerContent />,
        selected: 0,
      }}
      {...{ isDrawerOpen, toggleDrawer }}
    >
      <CharAdminErrorContext.Provider value={{ charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }}>
        <AdminAppbar {...{ setToolbarHeight, toolbarHeight, toggleDrawer }} />

        <FormProvider {...formMethods}>
          <AdminContent {...{ activeStep, saveCharForm, setTimelineData, timelineData, toolbarHeight }} />
        </FormProvider>

        <AdminBottomNav {...{ activeStep, setActiveStep }} />
      </CharAdminErrorContext.Provider>
    </LayoutGrid>
  )
}
