import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction } from 'react'
import { CharFormAdminStepLabel, TimelineAdminStepLabel } from './AdminStepLabel'
import { Case, Default, Switch } from 'react-if'
import { CharForm } from '../char-form/CharForm'
import { ADMIN_CHAR_EDIT_STEP_THREE } from '../../shared/strings'

export default function AdminContent({
  activeStep,
  timelineData,
  saveCharForm,
  setTimelineData,
  toolbarHeight,
}: {
  activeStep: number
  timelineData: TimelineData
  saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
  toolbarHeight: number
}) {
  const { constants, spacing } = useTheme()

  return (
    <Box
      bgcolor='background.paper'
      component='main'
      minHeight={`calc(100vh - ${toolbarHeight}px - ${constants.bottomToolbarHeight})`}
      marginBottom={constants.bottomToolbarHeight}
      padding={2}
    >
      <Stepper {...{ activeStep }} sx={{ minHeight: spacing(6), mb: 2 }}>
        <Step>
          <CharFormAdminStepLabel />
        </Step>

        <Step>
          <TimelineAdminStepLabel />
        </Step>

        <Step>
          <StepLabel>{ADMIN_CHAR_EDIT_STEP_THREE}</StepLabel>
        </Step>
      </Stepper>

      <Switch>
        <Case condition={activeStep === 0}>
          <CharForm {...{ saveCharForm }} />
        </Case>

        <Case condition={activeStep === 1}>
          <Timeline {...{ timelineData, setTimelineData }} />
        </Case>

        <Case condition={activeStep === 2}></Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}
