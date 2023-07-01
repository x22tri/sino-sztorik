import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isFullOccurrence, isWithheldKeywordOccurrence, isWithheldPrimitiveOccurrence } from '../utils/occurrence-utils'
import { AdminStepLabel } from './AdminStepLabel'
import { Case, Default, Switch } from 'react-if'

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number) {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export enum TimelineError {
  MissingStory = 'MissingStory',
  KeywordNotIntroduced = 'KeywordNotIntroduced',
  PrimitiveNotIntroduced = 'PrimitiveNotIntroduced',
  CourseLocationNotSet = 'CourseLocationNotSet',
}

export default function AdminContent({
  activeStep,
  character,
  occurrences,
  setOccurrences,
  timelineErrors,
  toolbarHeight,
}: {
  activeStep: number
  character: SortedCharacterEntry
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
      <Stepper {...{ activeStep }}>
        <Step>
          <StepLabel>Karakter</StepLabel>
        </Step>

        <Step>
          <AdminStepLabel errorsArray={timelineErrors} errorMessages={timelineErrorStrings} title='Idővonal' />
        </Step>

        <Step>
          <StepLabel>Ellenőrzés</StepLabel>
        </Step>
      </Stepper>

      <Switch>
        <Case condition={activeStep === 0}>Űrlap</Case>
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
