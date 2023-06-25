import { Fragment, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { CharacterEntryVariant, Occurrence } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Step } from './Step'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { Unless, When } from 'react-if'
import { findAllIndexes } from '../../shared/utility-functions'
import { ReorderButtonRow } from './ReorderButtonRow'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  variant: CharacterEntryVariant
  type: BlueprintStepType
}

export function Timeline({ character }: { character: SortedCharacterEntry }) {
  const [occurrences, setOccurrences] = useState(character.occurrences)

  function deleteEntry(atIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    const [deleted] = result.splice(atIndex, 1, { tier: atIndex + 1, type: 'unset' })

    if (
      result.some(occurrence => occurrence.type === 'reminder') &&
      ['keyword', 'primitive', 'keywordAndPrimitive'].includes(deleted.type) &&
      !result.some(occurrence => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(occurrence.type))
    ) {
      const reminderIndexes = findAllIndexes(result, occurrence => occurrence.type === 'reminder')

      reminderIndexes.map(reminderIndex => result.splice(reminderIndex, 1, { tier: reminderIndex + 1, type: 'unset' }))
    }

    setOccurrences(result)
  }

  function mergeEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result[topIndex] = { ...(result[topIndex] as Occurrence), type: 'keywordAndPrimitive' }

    result[topIndex + 1] = { tier: topIndex + 1, type: 'unset' }

    setOccurrences(result)
  }

  function splitEntries(topIndex: number, direction: 'up' | 'down') {
    const result = Array.from(occurrences) as SortedOccurrences

    result[topIndex] = { ...(result[topIndex] as Occurrence), type: 'keyword' }

    result[topIndex + 1] = { index: 0, tier: topIndex + 2, type: 'primitive' }

    setOccurrences(result)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setOccurrences(result)
  }

  return (
    <Box width={1}>
      <Stack marginTop={2} width={1}>
        {occurrences.map((step: PotentialOccurrence, index: number) => (
          <Fragment key={index}>
            <Step steps={occurrences} {...{ character, deleteEntry, index, step }} />

            <Unless condition={index === occurrences.length - 1}>
              <ReorderButtonRow {...{ index, occurrences, switchEntries, mergeEntries, splitEntries }} />
            </Unless>
          </Fragment>
        ))}
      </Stack>
      Problémák:
      <When
        condition={!occurrences.some(step => ['keyword', 'keywordAndPrimitive'].includes(step.type)) && 'keyword' in character}
      >
        Kulcsszó nincs elhelyezve
      </When>
      <When
        condition={
          !occurrences.some(step => ['primitive', 'keywordAndPrimitive'].includes(step.type)) && 'primitive' in character
        }
      >
        Alapelem nincs elhelyezve
      </When>
      <When
        condition={occurrences.some(
          step => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(step.type) && !('story' in step)
        )}
      >
        Egy vagy több előfordulásnál nincs történet
      </When>
      <When condition={occurrences.some(step => step.type !== 'unset' && step.index === 0)}>
        Egy vagy több előfordulás nincs elhelyezve a leckében (Teendő: mozgatásnál, szétválasztásnál stb. a szerver lekéri, hogy
        az adott körben hanyadik a karakter az adott körbe tartozó karakterek szűrésével, így ennek nem kellene előfordulnia)
      </When>
    </Box>
  )
}
