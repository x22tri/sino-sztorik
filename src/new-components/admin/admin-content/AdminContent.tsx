import { Box, Divider, Stack, Step, StepButton, StepContent, Stepper, Typography, useTheme } from '@mui/material'
import { useLoaderData } from 'react-router-dom'
import { Heading } from '../../learn/headings/Heading'
import { SortedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Timeline } from '../timeline/Timeline'
import { useEffect, useState } from 'react'
import { When } from 'react-if'
import { isFullOccurrence, isWithheldKeywordOccurrence, isWithheldPrimitiveOccurrence } from '../utils/occurrence-utils'
import { TimelineErrors } from './TimelineErrors'

export function mergePreviousTiers(variants: CharacterEntryVariant[], tierToStopAt: number) {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export default function AdminContent() {
  const { constants } = useTheme()
  const { character } = useLoaderData() as { character: SortedCharacterEntry }
  const [occurrences, setOccurrences] = useState(character.occurrences)
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Stack
      boxSizing='border-box'
      bgcolor='background.paper'
      component='main'
      display='flex'
      flexDirection='column'
      minHeight={`calc(100vh - ${constants.bottomToolbarHeight})`}
      paddingX={2}
    >
      <Stepper orientation='vertical' {...{ activeStep }}>
        <Step>
          <StepButton sx={{ '.MuiStepLabel-root': { width: 1 } }}>
            <Stack alignItems='center' direction='row' gap={1} justifyContent='space-between'>
              <Typography variant='h6'>Idővonal</Typography>
              <TimelineErrors {...{ character, occurrences }} />
            </Stack>
          </StepButton>

          <StepContent>
            <Timeline {...{ character, occurrences, setOccurrences }} />
          </StepContent>
        </Step>
      </Stepper>
    </Stack>
  )
}
