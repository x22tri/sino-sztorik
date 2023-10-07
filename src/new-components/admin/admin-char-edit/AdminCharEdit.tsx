import { AdminSubmenuTitle } from '../shared/AdminSubmenuTitle'
import { AdminAppbar } from '../shared/AdminAppbar'
import AdminCharEditContent from './admin-content/AdminCharEditContent'
import { AdminBottomNav } from '../shared/AdminBottomNav'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { LoadCharEdit, CharTimelineData } from '../../shared/route-loaders/loadCharEdit'
import { CharFormData } from '../../shared/route-loaders/loadCharEdit'
import { CharAdminErrorContext, useCharAdminErrors } from './error-context/CharAdminErrorContext'
import { FormProvider, useForm } from 'react-hook-form'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { Box, useTheme } from '@mui/material'
import { SideNav } from '../../shared/components/SideNav'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'

export function AdminCharEdit() {
  const { constants, palette, spacing } = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  const loaderData = useLoaderData() as LoadCharEdit
  const formMethods = useForm({ defaultValues: { ...loaderData.charFormData } })
  const [savedCharForm, saveCharForm] = useState<CharFormData>({ ...loaderData.charFormData })
  const [timelineData, setTimelineData] = useState(loaderData.timelineData)
  const [savedTimelineData, saveTimelineData] = useState<CharTimelineData>([...loaderData.timelineData])
  const { charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors } = useCharAdminErrors()

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Karakter szerkesztése (${formMethods.getValues().glyph})`}
        hierarchy={[
          { href: '/admin', text: 'Kezelőközpont' },
          { href: '/admin/characters', text: 'Karakterek' },
        ]}
      />

      <Box
        display='grid'
        margin='auto'
        sx={{
          maxWidth: constants.maxContentWidth,
          gridTemplate: { xs: `"main" / 1fr`, md: `"nav main" / ${constants.drawerWidth}px auto` },
        }}
      >
        <CharAdminErrorContext.Provider value={{ charFormErrors, timelineErrors, setCharFormErrors, setTimelineErrors }}>
          <Box component='nav' gridArea='nav'>
            <SideNav
              appbarHasBreadcrumbs
              content={<></>}
              title={<AdminSubmenuTitle text='Lépések' />}
              selected={0}
              {...{ isDrawerOpen, toggleDrawer }}
            />
          </Box>

          <Box component='main' gridArea='main'>
            <FormProvider {...formMethods}>
              <AdminCharEditContent
                calculatedIndexes={loaderData.calculatedIndexes}
                {...{ activeStep, saveCharForm, setTimelineData, timelineData }}
              />

              <AdminBottomNav {...{ activeStep, setActiveStep, savedTimelineData, setTimelineData, timelineData }} />
            </FormProvider>
          </Box>
        </CharAdminErrorContext.Provider>
      </Box>
    </>
  )
}
