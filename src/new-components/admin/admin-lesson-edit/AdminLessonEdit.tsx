import { AdminSubmenuTitle } from '../shared/AdminSubmenuTitle'
import { AdminAppbar } from '../shared/AdminAppbar'
import { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { Box, useTheme } from '@mui/material'
import { SideNav } from '../../shared/components/SideNav'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'
import { LessonFormData, LessonTimelineData, LoadLessonEdit } from '../../shared/route-loaders/loadLessonEdit'
import { LessonEditSteps } from './steps/LessonEditSteps'
import { LessonEditErrorContext, useLessonEditErrors } from './error-context/LessonEditErrorContext'
import LessonEditContent from './content/LessonEditContent'
import { AdminBottomNav } from '../shared/AdminBottomNav'

export function AdminLessonEdit() {
  const { constants, palette, spacing } = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { isDrawerOpen, toggleDrawer } = useDrawer()
  const params = useParams()

  const loaderData = useLoaderData() as LoadLessonEdit
  const formMethods = useForm({ defaultValues: { ...loaderData.lessonFormData } })
  const [savedLessonForm, saveLessonForm] = useState<LessonFormData>({ ...loaderData.lessonFormData })
  const [timelineData, setTimelineData] = useState(loaderData.lessonTimelineData)
  const [savedTimelineData, saveTimelineData] = useState<LessonTimelineData>([...loaderData.lessonTimelineData])
  const { lessonFormErrors, lessonTimelineErrors, setLessonFormErrors, setLessonTimelineErrors } = useLessonEditErrors()

  const lessonNumber = Number(params.lessonNumber)

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem={`Lecke szerkesztése (${lessonNumber}. lecke)`}
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
          gridTemplate: { xs: `"main" / auto`, md: `"nav main" / ${constants.drawerWidth}px auto` },
        }}
      >
        <LessonEditErrorContext.Provider
          value={{ lessonFormErrors, lessonTimelineErrors, setLessonFormErrors, setLessonTimelineErrors }}
        >
          <Box component='nav' gridArea='nav'>
            <SideNav
              appbarHasBreadcrumbs
              content={<LessonEditSteps {...{ activeStep }} />}
              title={<AdminSubmenuTitle text='Lépések' />}
              selected={0}
              {...{ isDrawerOpen, toggleDrawer }}
            />
          </Box>

          <Box component='main' gridArea='main'>
            <FormProvider {...formMethods}>
              <LessonEditContent
                characters={loaderData.lessonFormData.characters}
                {...{ activeStep, lessonNumber, setTimelineData, timelineData }}
              />

              <AdminBottomNav {...{ activeStep, setActiveStep, savedTimelineData, setTimelineData, timelineData }} />
            </FormProvider>
          </Box>
        </LessonEditErrorContext.Provider>
      </Box>
    </>
  )
}
