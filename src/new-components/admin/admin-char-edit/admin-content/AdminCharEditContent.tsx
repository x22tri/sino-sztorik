import { Box, Link, Typography, useTheme } from '@mui/material'
import { TimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { CharFormData } from '../../../shared/route-loaders/loadCharEdit'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction } from 'react'
import { Case, Default, Switch } from 'react-if'
import { CharForm } from '../char-form/CharForm'
import { ADMIN_EDIT_STEPS_STEP_ONE, ADMIN_EDIT_STEPS_STEP_THREE, ADMIN_EDIT_STEPS_STEP_TWO } from '../../../shared/strings'
import { useWatch } from 'react-hook-form'
import { useRegisterCharAdminErrors } from '../hooks/useRegisterCharAdminErrors'
import { FinalCheck } from './final-check/FinalCheck'
import { Heading } from '../../../learn/headings/Heading'
import { Link as RouterLink } from 'react-router-dom'

export default function AdminCharEditContent({
  activeStep,
  timelineData,
  saveCharForm,
  setTimelineData,
}: {
  activeStep: number
  timelineData: TimelineData
  saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
}) {
  const { constants } = useTheme()

  const charFormData = useWatch() as CharFormData

  useRegisterCharAdminErrors(charFormData, timelineData)

  return (
    <Box mb={constants.bottomToolbarHeight} p={2} mt={4}>
      <Typography variant='h4' mt={2}>
        Karakter szerkesztése ({charFormData.glyph})
      </Typography>

      <Switch>
        <Case condition={activeStep === 0}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_ONE} />
          <CharForm />
        </Case>

        <Case condition={activeStep === 1}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_TWO} />
          <Timeline {...{ charFormData, timelineData, setTimelineData }} />
        </Case>

        <Case condition={activeStep === 2}>
          <Heading title={ADMIN_EDIT_STEPS_STEP_THREE} />
          <FinalCheck {...{ charFormData, timelineData }} />
        </Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}
