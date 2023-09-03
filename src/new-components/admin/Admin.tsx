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
import { Box, useTheme } from '@mui/material'
import { SideNav } from '../shared/components/SideNav'

export function Admin() {
  const { constants } = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  const loaderData = useLoaderData() as {
    calculatedIndexes: CalculatedIndexes
    charFormData: CharFormData
    timelineData: TimelineData
  }
  const formMethods = useForm({
    defaultValues: { ...loaderData.charFormData, productivePinyin: loaderData.charFormData.productivePinyin ?? false },
  })
  const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  const [savedTimelineData, saveTimelineData] = useState<TimelineData>([...loaderData.timelineData])
  const { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors } = useCharAdminErrors()

  return (
    <>
      <AdminAppbar {...{ setToolbarHeight, toolbarHeight, toggleDrawer }} />

      <Box
        display='grid'
        margin='auto'
        sx={{
          maxWidth: constants.maxContentWidth,
          gridTemplate: {
            xs: `"main" / auto`,
            md: `"nav main" / ${constants.drawerWidth}px auto`,
            lg: `"nav main ." / ${constants.drawerWidth}px 3fr 1fr`,
          },
        }}
      >
        <CharAdminErrorContext.Provider value={{ charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }}>
          <Box component='nav' gridArea='nav'>
            <SideNav
              content={<AdminCharPickerContent {...{ activeStep }} />}
              title={<AdminSubmenuTitle />}
              selected={0}
              {...{ isDrawerOpen, toggleDrawer }}
            />
          </Box>

          <Box component='main' gridArea='main' p={2}>
            <FormProvider {...formMethods}>
              <AdminContent {...{ activeStep, saveCharForm, setTimelineData, timelineData, toolbarHeight }} />

              <AdminBottomNav {...{ activeStep, setActiveStep, savedTimelineData, setTimelineData, timelineData }} />
            </FormProvider>
          </Box>
        </CharAdminErrorContext.Provider>
      </Box>
    </>
  )
}
