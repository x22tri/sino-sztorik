import { Step, Stepper, useTheme } from '@mui/material'
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
    </Stepper>
  )
}
