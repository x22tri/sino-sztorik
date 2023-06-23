import { useState } from 'react'
import { Box, Stack } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { StepContent } from './StepContent'
import { getReminderContentType } from './getReminderContentType'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  type: BlueprintStepType
  isReminder?: boolean
}

function reorder(list: BlueprintStep[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

function Step({ index, step, steps, mergedChar }: { index: number; step: BlueprintStep; steps: BlueprintStep[]; mergedChar: X }) {
  const isReminder = step.type === 'reminder'

  const contentType = isReminder ? getReminderContentType(steps, index) : step.type

  return <StepContent type={contentType} {...{ isReminder, mergedChar }} />
}

export function Timeline({
  blueprintSteps,
  character,
}: {
  blueprintSteps: BlueprintStep[]
  getBlueprintSteps({ variants }: CharacterEntry): BlueprintStep[]
  character: CharacterEntry
}) {
  const [steps, setSteps] = useState(blueprintSteps)
  const mergedChar = mergePreviousTiers(character.variants, 4)

  function onDragEnd(result: any) {
    const reorderedSteps = reorder(steps, result.source.index, result.destination.index)
    setSteps(reorderedSteps)
  }

  return (
    <Box width={1}>
      <Subheading title='Sorrend' />

      <Stack gap={1} marginTop={2} width={1}>
        {steps.map((step: BlueprintStep, index: number) => (
          <Step key={step.id} {...{ index, step, steps, mergedChar }} />
        ))}
      </Stack>
    </Box>
  )
}
