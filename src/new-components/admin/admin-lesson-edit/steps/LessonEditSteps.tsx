import { Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { ADMIN_EDIT_STEPS_STEP_THREE } from '../../../shared/strings'
import { LessonFormAdminStepLabel, LessonTimelineAdminStepLabel } from '../../shared/AdminStepLabel'

export function LessonEditSteps({ activeStep }: { activeStep: number }) {
  const { spacing } = useTheme()

  return (
    <Stepper orientation='vertical' sx={{ minHeight: spacing(6), mb: 2, p: 2 }} {...{ activeStep }}>
      <Step>
        <LessonFormAdminStepLabel />
      </Step>

      <Step>
        <LessonTimelineAdminStepLabel />
      </Step>

      <Step>
        <StepLabel>{ADMIN_EDIT_STEPS_STEP_THREE}</StepLabel>
      </Step>
    </Stepper>
  )
}
