import { AdminCharPickerContent } from './char-picker/AdminCharPickerContent'
import { AdminSubmenuTitle } from './AdminSubmenuTitle'
import { AdminCharEditAppbar } from './admin-appbar/AdminCharEditAppbar'
import AdminCharEditContent, { BreadcrumbLink } from './admin-content/AdminCharEditContent'
import { AdminBottomNav } from './admin-bottom-nav/AdminBottomNav'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { CalculatedIndexes, LoadAdminChar, TimelineData } from '../../shared/route-loaders/loadAdminChar'
import { CharFormData } from '../../shared/route-loaders/loadAdminChar'
import { CharAdminErrorContext, useCharAdminErrors } from './char-admin-error-context/CharAdminErrorContext'
import { FormProvider, useForm } from 'react-hook-form'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { Box, Breadcrumbs, Toolbar, Typography, useTheme } from '@mui/material'
import { SideNav } from '../../shared/components/SideNav'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminCharEditBreadcrumbs } from './admin-appbar/AdminCharEditBreadcrumbs'

export function AdminCharEdit() {
  const { constants, palette, spacing } = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  const loaderData = useLoaderData() as LoadAdminChar
  const formMethods = useForm({ defaultValues: { ...loaderData.charFormData } })
  const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  const [savedTimelineData, saveTimelineData] = useState<TimelineData>([...loaderData.timelineData])
  const { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors } = useCharAdminErrors()

  return (
    <>
      <AdminCharEditAppbar {...{ toggleDrawer }} />

      <AdminCharEditBreadcrumbs glyph={formMethods.getValues().glyph} />

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
              appbarHasBreadcrumbs
              content={<AdminCharPickerContent {...{ activeStep }} />}
              title={<AdminSubmenuTitle />}
              selected={0}
              {...{ isDrawerOpen, toggleDrawer }}
            />
          </Box>

          <Box component='main' gridArea='main'>
            <FormProvider {...formMethods}>
              <AdminCharEditContent {...{ activeStep, saveCharForm, setTimelineData, timelineData }} />

              <AdminBottomNav {...{ activeStep, setActiveStep, savedTimelineData, setTimelineData, timelineData }} />
            </FormProvider>
          </Box>
        </CharAdminErrorContext.Provider>
      </Box>
    </>
  )
}
