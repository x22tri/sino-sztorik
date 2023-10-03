import { Step, Stepper, useTheme } from '@mui/material'
import { CharFormAdminStepLabel, TimelineAdminStepLabel } from '../../shared/AdminStepLabel'

export function CharEditSteps({ activeStep }: { activeStep: number }) {
  const { spacing } = useTheme()

  return (
    <Stepper orientation='vertical' sx={{ minHeight: spacing(6), mb: 2, p: 2 }} {...{ activeStep }}>
      <Step>
        <CharFormAdminStepLabel />
      </Step>

      <Step>
        <TimelineAdminStepLabel />
      </Step>
    </Stepper>
  )
}
