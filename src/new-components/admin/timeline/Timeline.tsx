import { Dispatch, Fragment, SetStateAction } from 'react'
import { Stack } from '@mui/material'
import { OccurrenceType } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Occurrence } from './Occurrence'
import { SortedOccurrence } from '../../shared/MOCK_DATABASE_ENTRIES'
import { TimelineData } from '../../shared/logic/loadAdminChar'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { Unless } from 'react-if'
import { ReorderButtonRow } from './ReorderButtonRow'
import { useTimelineErrors } from '../hooks/useTimelineErrors'

export function Timeline({
  charFormData,
  timelineData,
  setTimelineData,
}: {
  charFormData: CharFormData
  timelineData: TimelineData
  setTimelineData: Dispatch<SetStateAction<TimelineData>>
}) {
  function deleteEntry(atIndex: number) {
    const result = Array.from(timelineData) as TimelineData

    result.splice(atIndex, 1, { tier: atIndex + 1 })

    setTimelineData(result)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(timelineData) as TimelineData

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setTimelineData(result)
  }

  function addEntry(atIndex: number, type: OccurrenceType) {
    const result = Array.from(timelineData) as TimelineData
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
        throw new Error('Tried to add unknown entry type.')
    }

    setTimelineData(result)
  }

  useTimelineErrors(charFormData, timelineData)

  return (
    <Stack marginTop={2}>
      {timelineData.map((occurrence: SortedOccurrence, index: number) => (
        <Fragment key={index}>
          <Occurrence {...{ addEntry, charFormData, deleteEntry, index, occurrence, timelineData }} />

          <Unless condition={index === timelineData.length - 1}>
            <ReorderButtonRow {...{ index, timelineData, switchEntries }} />
          </Unless>
        </Fragment>
      ))}
    </Stack>
  )
}
