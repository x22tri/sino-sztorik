import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isFullOccurrence, isWithheldKeywordOccurrence, isWithheldPrimitiveOccurrence } from '../utils/occurrence-utils'
import { AdminStepLabel } from './AdminStepLabel'

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number) {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export enum TimelineError {
  MissingStory = 'MissingStory',
  KeywordNotIntroduced = 'KeywordNotIntroduced',
  PrimitiveNotIntroduced = 'PrimitiveNotIntroduced',
  CourseLocationNotSet = 'CourseLocationNotSet',
}

export default function AdminContent() {
  const { constants, palette, spacing } = useTheme()
  const { character } = useLoaderData() as { character: SortedCharacterEntry }
  const [occurrences, setOccurrences] = useState(character.occurrences)
  const [activeStep, setActiveStep] = useState(1)
  const [timelineErrors, setTimelineErrors] = useState<TimelineError[]>([])

  useTimelineErrors(character, occurrences, setTimelineErrors)

  return (
    <Box
      bgcolor='background.paper'
      component='main'
      minHeight={`calc(100vh - ${constants.bottomToolbarHeight})`}
      paddingX={2}
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

      <Timeline {...{ character, occurrences, setOccurrences }} />
    </Box>

    // <StepContent>
    //       <Timeline {...{ character, occurrences, setOccurrences }} />
    //     </StepContent>

    // {activeStep === 0 ? 'Űrlap' : false}

    // {activeStep === 1 ? <Timeline {...{ character, occurrences, setOccurrences }} /> : false}
  )
}

function useTimelineErrors(
  character: SortedCharacterEntry,
  occurrences: SortedOccurrences,
  setTimelineErrors: Dispatch<SetStateAction<TimelineError[]>>
) {
  useEffect(() => {
    const errors: TimelineError[] = []

    if (occurrences.some(occurrence => 'story' in occurrence && occurrence.story.length === 0)) {
      errors.push(TimelineError.MissingStory)
    }

    if (
      'keyword' in character &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence))
    ) {
      errors.push(TimelineError.KeywordNotIntroduced)
    }

    if (
      'primitive' in character &&
      !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence))
    ) {
      errors.push(TimelineError.PrimitiveNotIntroduced)
    }

    if (occurrences.some(occurrence => 'index' in occurrence && occurrence.index === 0)) {
      errors.push(TimelineError.CourseLocationNotSet)
    }

    setTimelineErrors(errors)
  }, [character, occurrences])
}

const timelineErrorStrings: Record<TimelineError, string> = {
  MissingStory: 'Nincs történet legalább egy előfordulásnál',
  KeywordNotIntroduced: 'A kulcsszó nincs bevezetve',
  PrimitiveNotIntroduced: 'Az alapelem nincs bevezetve',
  CourseLocationNotSet: 'Legalább egy előfordulás nincs elhelyezve a leckében',
}
