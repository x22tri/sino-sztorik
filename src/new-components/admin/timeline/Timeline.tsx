import { useState } from 'react'
import { Box, Stack } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryV2, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { Step } from './Step'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { When } from 'react-if'
import { findAllIndexes } from '../../shared/utility-functions'

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

function deleteFromTimeline(list: SortedOccurrences, atIndex: number) {
  const result = Array.from(list)

  const [deleted] = result.splice(atIndex, 1, { tier: atIndex + 1, type: 'unset' })

  if (
    result.some(occurrence => occurrence.type === 'reminder') &&
    ['keyword', 'primitive', 'keywordAndPrimitive'].includes(deleted.type) &&
    !result.some(occurrence => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(occurrence.type))
  ) {
    const reminderIndexes = findAllIndexes(result, x => x.type === 'reminder')
    reminderIndexes.map(reminderIndex => result.splice(reminderIndex, 1, { tier: reminderIndex + 1, type: 'unset' }))
  }

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

  function deleteEntry(atIndex: number) {
    const newSteps = deleteFromTimeline(steps, atIndex)

    setSteps(newSteps)
  }

  return (
    <Box width={1}>
      <Subheading title='Sorrend' />
      <Stack gap={1} marginTop={2} width={1}>
        {steps.map((step: PotentialOccurrence, index: number) => (
          <Step key={index} {...{ character, deleteEntry, index, step, steps, moveUp, moveDown }} />
        ))}
      </Stack>
      Problémák:
      <When
        condition={!steps.some(step => step.type === 'keyword' || step.type === 'keywordAndPrimitive') && 'keyword' in character}
      >
        Kulcsszó nincs elhelyezve
      </When>
      <When
        condition={
          !steps.some(step => step.type === 'primitive' || step.type === 'keywordAndPrimitive') && 'primitive' in character
        }
      >
        Alapelem nincs elhelyezve
      </When>
    </Box>
  )
}
