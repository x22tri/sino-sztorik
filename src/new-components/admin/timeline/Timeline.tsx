import { Fragment, useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { CharacterEntryVariant, Occurrence as OccurrenceType } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Occurrence } from './Occurrence'
import { SortedCharacterEntry, SortedOccurrence, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { Unless, When } from 'react-if'
import { findAllIndexes } from '../../shared/utility-functions'
import { ReorderButtonRow } from './ReorderButtonRow'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'

export type BlueprintStepType = 'keyword' | 'keywordAndPrimitive' | 'keywordLite' | 'primitive' | 'reminder' | 'unset'

export type BlueprintStep = {
  id: string
  variant: CharacterEntryVariant
  type: BlueprintStepType
}

export function Timeline({ character }: { character: SortedCharacterEntry }) {
  const [occurrences, setOccurrences] = useState(character.occurrences)
  const [savedOccurrences, saveOccurrences] = useState<SortedOccurrences>([...character.occurrences])

  function deleteEntry(atIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    const [deleted] = result.splice(atIndex, 1, { tier: atIndex + 1 })

    // if (
    //   result.some(({ type }) => type === 'reminder') &&
    //   ['keyword', 'primitive', 'keywordAndPrimitive'].includes(deleted.type) &&
    //   !result.some(({ type }) => ['keyword', 'primitive', 'keywordAndPrimitive'].includes(type))
    // ) {
    //   const reminderIndexes = findAllIndexes(result, ({ type }) => type === 'reminder')

    //   reminderIndexes.map(reminderIndex => result.splice(reminderIndex, 1, { tier: reminderIndex + 1, type: 'unset' }))
    // }

    setOccurrences(result)
  }

  function mergeEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    // result[topIndex] = { ...(result[topIndex] as OccurrenceType), type: 'keywordAndPrimitive' }

    // result[topIndex + 1] = { tier: topIndex + 1, type: 'unset' }

    setOccurrences(result)
  }

  function splitEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    // const story = (result[topIndex] as OccurrenceType).story ?? (result[topIndex + 1] as OccurrenceType).story ?? undefined

    // result[topIndex] = { ...(result[topIndex] as OccurrenceType), type: 'keyword', story }

    // result[topIndex + 1] = { index: 0, tier: topIndex + 2, type: 'primitive', story }

    setOccurrences(result)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setOccurrences(result)
  }

  function addEntry(atIndex: number, type: BlueprintStepType) {
    const result = Array.from(occurrences) as SortedOccurrences

    // result[atIndex] = { tier: atIndex + 1, index: 0, type }

    setOccurrences(result)
  }

  return (
    <Box width={1}>
      <Stack marginTop={2} width={1}>
        {occurrences.map((occurrence: SortedOccurrence, index: number) => (
          <Fragment key={index}>
            <Occurrence {...{ addEntry, character, deleteEntry, index, occurrence, occurrences }} />

            <Unless condition={index === occurrences.length - 1}>
              <ReorderButtonRow {...{ character, index, occurrences, switchEntries, mergeEntries, splitEntries }} />
            </Unless>
          </Fragment>
        ))}

        <Box alignItems='center' display='flex' gap={2} justifyContent='flex-end' marginTop={10}>
          <Button onClick={() => setOccurrences(savedOccurrences)} variant='text'>
            {ADMIN_CANCEL_SAVE}
          </Button>

          <Button onClick={() => saveOccurrences(occurrences)} type='submit' variant='contained'>
            {ADMIN_SAVE_CHANGES}
          </Button>

          <Button onClick={() => {}} color='secondary' variant='contained'>
            Változatok vizualizálása
          </Button>
        </Box>
      </Stack>
      Problémák:
      {/* <When
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
      </When> */}
    </Box>
  )
}
