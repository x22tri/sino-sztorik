import { useState } from 'react'
import { Box, Stack } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { Step } from './Step'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  variant: CharacterEntryVariant
  type: BlueprintStepType
  isReminder?: boolean
}

function reorder(list: BlueprintStep[], startIndex: number, endIndex: number) {
  const result = Array.from(list)

  if (!(result[endIndex].type === 'unset')) {
    result[endIndex] = {
      ...result[endIndex],
      variant: { ...result[endIndex].variant, tier: startIndex + 1 },
    }
  }

  const [moved] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, { ...moved, variant: { ...moved.variant, tier: endIndex + 1 } })

  return result
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

  function moveUp(startIndex: number) {
    const reorderedSteps = reorder(steps, startIndex, startIndex - 1)
    setSteps(reorderedSteps)
  }

  function moveDown(startIndex: number) {
    const reorderedSteps = reorder(steps, startIndex, startIndex + 1)
    setSteps(reorderedSteps)
  }

  return (
    <Box width={1}>
      <Subheading title='Sorrend' />

      <Stack gap={1} marginTop={2} width={1}>
        {steps.map((step: BlueprintStep, index: number) => (
          <Step key={step.id} {...{ character, index, step, steps, mergedChar, moveUp, moveDown }} />
        ))}
      </Stack>
    </Box>
  )
}
