import { Dispatch, Fragment, SetStateAction } from 'react'
import { Stack } from '@mui/material'
import { OccurrenceType } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Occurrence } from './Occurrence'
import { SortedCharacterEntry, SortedOccurrence, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { Unless } from 'react-if'
import { ReorderButtonRow } from './ReorderButtonRow'

export function Timeline({
  character,
  occurrences,
  setOccurrences,
}: {
  character: SortedCharacterEntry
  occurrences: SortedOccurrences
  setOccurrences: Dispatch<SetStateAction<SortedOccurrences>>
}) {
  function deleteEntry(atIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result.splice(atIndex, 1, { tier: atIndex + 1 })

    setOccurrences(result)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setOccurrences(result)
  }

  function addEntry(atIndex: number, type: OccurrenceType) {
    const result = Array.from(occurrences) as SortedOccurrences
    const tier = atIndex + 1

    switch (type) {
      case 'full':
        result[atIndex] = { index: 0, story: [], tier }
        break
      case 'reminder':
        result[atIndex] = { index: 0, tier }
        break
      case 'withheldKeyword':
        result[atIndex] = { index: 0, story: [], tier, withhold: 'keyword' }
        break
      case 'withheldPrimitive':
        result[atIndex] = { index: 0, story: [], tier, withhold: 'primitive' }
        break
      case 'withheldConstituents':
        result[atIndex] = { index: 0, story: [], tier, withhold: 'constituents' }
        break
      default:
        return
    }

    setOccurrences(result)
  }

  return (
    <Stack marginTop={2}>
      {occurrences.map((occurrence: SortedOccurrence, index: number) => (
        <Fragment key={index}>
          <Occurrence {...{ addEntry, character, deleteEntry, index, occurrence, occurrences }} />

          <Unless condition={index === occurrences.length - 1}>
            <ReorderButtonRow {...{ index, occurrences, switchEntries }} />
          </Unless>
        </Fragment>
      ))}
    </Stack>
  )
}
