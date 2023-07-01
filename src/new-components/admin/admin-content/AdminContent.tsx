import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isFullOccurrence, isWithheldKeywordOccurrence, isWithheldPrimitiveOccurrence } from '../utils/occurrence-utils'
import { AdminStepLabel, CharFormError, TimelineError } from './AdminStepLabel'
import { Case, Default, Switch } from 'react-if'
import { CharacterSection } from './sections/CharacterSection'
import { CharEditForm } from '../char-edit-form/CharEditForm'
import { ADMIN_CHAR_EDIT_STEP_ONE, ADMIN_CHAR_EDIT_STEP_THREE, ADMIN_CHAR_EDIT_STEP_TWO } from '../../shared/strings'

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number) {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export default function AdminContent({
  activeStep,
  character,
  charFormErrors,
  occurrences,
  setOccurrences,
  timelineErrors,
  toolbarHeight,
}: {
  activeStep: number
  character: SortedCharacterEntry
  charFormErrors: CharFormError[]
  occurrences: SortedOccurrences
  setOccurrences: Dispatch<SetStateAction<SortedOccurrences>>
  timelineErrors: TimelineError[]
  toolbarHeight: number
}) {
  const { constants, palette, spacing } = useTheme()

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
          <CharEditForm />
        </Case>

        <Case condition={activeStep === 1}>
          <Timeline {...{ character, occurrences, setOccurrences }} />
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
