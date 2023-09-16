import { AdminSubmenuTitle } from '../shared/AdminSubmenuTitle'
import { AdminAppbar } from '../shared/AdminAppbar'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { Box, useTheme } from '@mui/material'
import { SideNav } from '../../shared/components/SideNav'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'
import { LoadLessonEdit } from '../../shared/route-loaders/loadLessonEdit'

export function AdminLessonEdit() {
  const { constants, palette, spacing } = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  const loaderData = useLoaderData() as LoadLessonEdit
  const formMethods = useForm({ defaultValues: { ...loaderData.lessonFormData } })
  // const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  // const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  // const [savedTimelineData, saveTimelineData] = useState<TimelineData>([...loaderData.timelineData])
  // const { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors } = useCharAdminErrors()

  console.log(loaderData)

  return (
    <>
      <AdminAppbar {...{ toggleDrawer }} />

      <AdminBreadcrumbs
        currentMenuItem={`Lecke szerkesztése (${loaderData.lessonFormData.title})`}
        hierarchy={[
          { href: '/admin', text: 'Kezelőközpont' },
          { href: '/admin/lessons', text: 'Leckék' },
        ]}
      />

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
        {/* <CharAdminErrorContext.Provider value={{ charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }}> */}
        <Box component='nav' gridArea='nav'>
          <SideNav
            appbarHasBreadcrumbs
            // content={<AdminCharPickerContent {...{ activeStep }} />}
            content={<div>teszt</div>}
            title={<AdminSubmenuTitle text='Lépések' />}
            selected={0}
            {...{ isDrawerOpen, toggleDrawer }}
          />
        </Box>

        <Box component='main' gridArea='main'>
          <FormProvider {...formMethods}>
            {/* <AdminCharEditContent {...{ activeStep, saveCharForm, setTimelineData, timelineData }} />

            <AdminBottomNav {...{ activeStep, setActiveStep, savedTimelineData, setTimelineData, timelineData }} /> */}
          </FormProvider>
        </Box>
        {/* </CharAdminErrorContext.Provider> */}
      </Box>
    </>
  )
}
