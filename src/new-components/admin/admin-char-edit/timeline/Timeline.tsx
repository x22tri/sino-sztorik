import { Dispatch, Fragment, SetStateAction } from 'react'
import { Divider, Stack } from '@mui/material'
import { OccurrenceType } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { Occurrence } from './occurrence/Occurrence'
import { SortedOccurrence } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { CalculatedIndexes, CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { CharFormData } from '../../../shared/route-loaders/loadCharEdit'
import { Unless } from 'react-if'
import { ReorderButtonRow, TierIndicator } from './ReorderButtonRow'
import { useLoaderData } from 'react-router-dom'

export function Timeline({
  charFormData,
  timelineData,
  setTimelineData,
}: {
  charFormData: CharFormData
  timelineData: CharTimelineData
  setTimelineData: Dispatch<SetStateAction<CharTimelineData>>
}) {
  const { calculatedIndexes } = useLoaderData() as { calculatedIndexes: CalculatedIndexes }

  function deleteEntry(atIndex: number) {
    const result = Array.from(timelineData) as CharTimelineData

    result.splice(atIndex, 1, { tier: atIndex + 1 })

    setTimelineData(result)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(timelineData) as CharTimelineData

    result[topIndex + 1] = {
      ...result[topIndex + 1],
      ...('index' in result[topIndex + 1] && { index: calculatedIndexes[topIndex] }),
      tier: topIndex + 1,
    }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, {
      ...moved,
      ...('index' in moved && { index: calculatedIndexes[topIndex + 1] }),
      tier: topIndex + 2,
    })

    setTimelineData(result)
  }

  function addEntry(atIndex: number, type: OccurrenceType) {
    const result = Array.from(timelineData) as CharTimelineData
    const tier = atIndex + 1
    const calculatedIndex = calculatedIndexes[atIndex]

    switch (type) {
      case 'full':
        result[atIndex] = { index: calculatedIndex, story: [], tier }
        break
      case 'reminder':
        result[atIndex] = { index: calculatedIndex, tier }
        break
      case 'withheldKeyword':
        result[atIndex] = { index: calculatedIndex, story: [], tier, withhold: 'keyword' }
        break
      case 'withheldPrimitive':
        result[atIndex] = { index: calculatedIndex, story: [], tier, withhold: 'primitive' }
        break
      case 'withheldConstituents':
        result[atIndex] = { index: calculatedIndex, story: [], tier, withhold: 'constituents' }
        break
      default:
        throw new Error('Tried to add unknown entry type.')
    }

    setTimelineData(result)
  }

  // console.log(timelineData)

  return (
    <>
      <Divider>
        <TierIndicator index={-1} />
      </Divider>

      <Stack>
        {timelineData.map((occurrence: SortedOccurrence, index: number) => (
          <Fragment key={index}>
            <Occurrence
              calculatedIndex={calculatedIndexes[index]}
              {...{ addEntry, charFormData, deleteEntry, index, occurrence, timelineData }}
            />

            <Unless condition={index === timelineData.length - 1}>
              <ReorderButtonRow {...{ index, timelineData, switchEntries }} />
            </Unless>
          </Fragment>
        ))}
      </Stack>
    </>
  )
}
