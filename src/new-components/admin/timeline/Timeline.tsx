import { Fragment, useState } from 'react'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryV2, CharacterEntryVariant, Occurrence } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { Step } from './Step'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { Unless, When } from 'react-if'
import { findAllIndexes } from '../../shared/utility-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReorderButtonRow } from './ReorderButtonRow'

export type BlueprintStepType = 'keyword' | 'primitive' | 'unset' | 'reminder' | 'keywordUnexpounded' | 'keywordAndPrimitive'

export type BlueprintStep = {
  id: string
  variant: CharacterEntryVariant
  type: BlueprintStepType
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
  const [occurrences, setOccurrences] = useState(character.occurrences)

  function deleteEntry(atIndex: number) {
    const result = Array.from(occurrences)

    const [deleted] = result.splice(atIndex, 1, { tier: atIndex + 1, type: 'unset' })

    if (
      result.some(occurrence => occurrence.type === 'reminder') &&
      ['keyword', 'primitive', 'keywordAndPrimitive'].includes(deleted.type) &&
      !result.some(occurrence => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(occurrence.type))
    ) {
      const reminderIndexes = findAllIndexes(result, x => x.type === 'reminder')
      reminderIndexes.map(reminderIndex => result.splice(reminderIndex, 1, { tier: reminderIndex + 1, type: 'unset' }))
    }

    setOccurrences(result as SortedOccurrences)
  }

  function mergeEntries(topIndex: number) {
    const result = Array.from(occurrences)

    result[topIndex] = { ...(result[topIndex] as Occurrence), type: 'keywordAndPrimitive' }

    result[topIndex + 1] = { tier: topIndex + 1, type: 'unset' }

    setOccurrences(result as SortedOccurrences)
  }

  function splitEntries(topIndex: number, direction: 'up' | 'down') {
    const result = Array.from(occurrences)

    result[topIndex] = { ...(result[topIndex] as Occurrence), type: 'keyword' }

    result[topIndex + 1] = { index: 0, tier: direction === 'down' ? topIndex + 2 : topIndex, type: 'primitive' }

    setOccurrences(result as SortedOccurrences)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(occurrences)

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setOccurrences(result as SortedOccurrences)
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
        condition={
          !occurrences.some(step => step.type === 'keyword' || step.type === 'keywordAndPrimitive') && 'keyword' in character
        }
      >
        Kulcsszó nincs elhelyezve
      </When>
      <When
        condition={
          !occurrences.some(step => step.type === 'primitive' || step.type === 'keywordAndPrimitive') && 'primitive' in character
        }
      >
        Alapelem nincs elhelyezve
      </When>
      <When
        condition={
          occurrences.some(step => step.type === 'primitive' || step.type === 'keywordAndPrimitive' || step.type === 'keyword') &&
          !('story' in character)
        }
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
