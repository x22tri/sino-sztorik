import { Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { ADMIN_CHAR_EDIT_STEP_THREE } from '../../shared/strings'
import { CharFormAdminStepLabel, TimelineAdminStepLabel } from '../admin-content/AdminStepLabel'

export function AdminCharPickerContent({ activeStep }: { activeStep: number }) {
  const { spacing } = useTheme()

  return (
    <Stepper orientation='vertical' sx={{ minHeight: spacing(6), mb: 2, p: 2 }} {...{ activeStep }}>
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
  )
}
