import { useState } from 'react'
import { Box, Stack } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryV2, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { Step } from './Step'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  variant: CharacterEntryVariant
  type: BlueprintStepType
}

// export type Sorted

function reorder(list: SortedOccurrences, startIndex: number, endIndex: number) {
  const result = Array.from(list)

  result[endIndex] = { ...result[endIndex], tier: startIndex + 1 }

  const [moved] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, { ...moved, tier: endIndex + 1 })

  return result as SortedOccurrences
}

export function Timeline({ character }: { character: SortedCharacterEntry }) {
  const [steps, setSteps] = useState(character.occurrences)
  // const mergedChar = mergePreviousTiers(character.variants, 4)

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
        {steps.map((step: PotentialOccurrence, index: number) => (
          <Step key={index} {...{ character, index, step, steps, moveUp, moveDown }} />
        ))}
      </Stack>
    </Box>
  )
}
