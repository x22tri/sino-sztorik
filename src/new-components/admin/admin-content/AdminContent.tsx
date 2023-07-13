import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction, useContext } from 'react'
import {
  AdminStepLabel,
  AdminStepLabel2,
  CharFormAdminStepLabel,
  CharFormError,
  TimelineAdminStepLabel,
  TimelineError,
} from './AdminStepLabel'
import { Case, Default, Switch } from 'react-if'
import { CharForm } from '../char-form/CharForm'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_THREE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../shared/strings'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'

export default function AdminContent({
  activeStep,
  charFormData,
  // charFormErrors,
  timelineData,
  setCharFormData,
  setCharFormErrors,
  setTimelineData,
  setTimelineErrors,
  // timelineErrors,
  toolbarHeight,
}: {
  activeStep: number
  charFormData: CharFormData
  // charFormErrors: { [key in CharFormError]: boolean }
  timelineData: TimelineData
  setCharFormData: Dispatch<SetStateAction<CharFormData>>
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
  setTimelineErrors: Dispatch<SetStateAction<TimelineError[]>>
  // timelineErrors: TimelineError[]
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
          <CharForm {...{ charFormData, setCharFormData, setCharFormErrors }} />
        </Case>

        <Case condition={activeStep === 1}>
          <Timeline {...{ charFormData, timelineData, setTimelineData, setTimelineErrors }} />
        </Case>

        <Case condition={activeStep === 2}></Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}
