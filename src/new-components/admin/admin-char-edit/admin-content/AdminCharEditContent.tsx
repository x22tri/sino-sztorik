import { Box, Typography, useTheme } from '@mui/material'
import { CalculatedIndexes, CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { CharFormData } from '../../../shared/route-loaders/loadCharEdit'
import { Dispatch, SetStateAction } from 'react'
import { Case, Default, Switch } from 'react-if'
import { CharForm } from '../char-form/CharForm'
import { ADMIN_EDIT_STEPS_STEP_ONE, ADMIN_EDIT_STEPS_STEP_TWO } from '../../../shared/strings'
import { useWatch } from 'react-hook-form'
import { useRegisterCharAdminErrors } from '../error-context/useRegisterCharAdminErrors'
import { Heading } from '../../../learn/headings/Heading'
import { Timeline } from './timeline/Timeline'

export default function AdminCharEditContent({
  activeStep,
  calculatedIndexes,
  timelineData,
  saveCharForm,
  setTimelineData,
}: {
  activeStep: number
  calculatedIndexes: CalculatedIndexes
  timelineData: CharTimelineData
  saveCharForm: Dispatch<SetStateAction<CharFormData>>
  setTimelineData: Dispatch<SetStateAction<CharTimelineData>>
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
          <Timeline {...{ calculatedIndexes, charFormData, timelineData, setTimelineData }} />
        </Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}
