import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { CharFormData, TimelineData } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction } from 'react'
import { AdminStepLabel, CharFormError, TimelineError } from './AdminStepLabel'
import { Case, Default, Switch } from 'react-if'
import { CharEditForm } from '../char-edit-form/CharEditForm'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_THREE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../shared/strings'

export default function AdminContent({
  activeStep,
  charFormData,
  charFormErrors,
  timelineData,
  setTimelineData,
  timelineErrors,
  toolbarHeight,
}: {
  activeStep: number
  charFormData: CharFormData
  charFormErrors: CharFormError[]
  timelineData: TimelineData
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
  timelineErrors: TimelineError[]
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
      width={1}
    >
      <Stepper {...{ activeStep }} sx={{ minHeight: spacing(6), mb: 2 }}>
        <Step>
          <AdminStepLabel errors={charFormErrors} errorMessages={charFormErrorStrings} title={ADMIN_CHAR_EDIT_STEP_ONE} />
        </Step>

        <Step>
          <AdminStepLabel errors={timelineErrors} errorMessages={timelineErrorStrings} title={ADMIN_CHAR_EDIT_STEP_TWO} />
        </Step>

        <Step>
          <StepLabel>{ADMIN_CHAR_EDIT_STEP_THREE}</StepLabel>
        </Step>
      </Stepper>

      <Switch>
        <Case condition={activeStep === 0}>
          <CharEditForm {...{ charFormData }} />
        </Case>

        <Case condition={activeStep === 1}>
          <Timeline {...{ charFormData, timelineData, setTimelineData }} />
        </Case>

        <Case condition={activeStep === 2}></Case>

        <Default>Hiba</Default>
      </Switch>
    </Box>
  )
}

const timelineErrorStrings: Record<TimelineError, string> = {
  MissingStory: 'Nincs történet legalább egy előfordulásnál',
  KeywordNotIntroduced: 'A kulcsszó nincs bevezetve',
  PrimitiveNotIntroduced: 'Az alapelem nincs bevezetve',
  CourseLocationNotSet: 'Legalább egy előfordulás nincs elhelyezve a leckében',
}

const charFormErrorStrings: Record<CharFormError, string> = {
  NoKeywordOrPrimitive: 'Kötelező megadni kulcsszót és/vagy alapelemet',
}
