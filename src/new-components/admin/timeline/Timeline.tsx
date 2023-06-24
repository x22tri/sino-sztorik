import { Fragment, useState } from 'react'
import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material'
import { Subheading } from '../../learn/headings/Subheading'
import { CharacterEntry, CharacterEntryV2, CharacterEntryVariant } from '../../shared/MOCK_DATABASE_ENTRIES'
import { X, mergePreviousTiers } from '../admin-content/AdminContent'
import { Step } from './Step'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { When } from 'react-if'
import { findAllIndexes } from '../../shared/utility-functions'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faArrowRightArrowLeft, faCodeFork, faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getReminderContentType } from './getReminderContentType'

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

// function switchElements() {

// }

export function Timeline({ character }: { character: SortedCharacterEntry }) {
  const [steps, setSteps] = useState(character.occurrences)

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

  function mergeKeywordAndPrimitive(atIndex: number) {}

  function switchEntries(topIndex: number) {
    const result = Array.from(steps)

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setSteps(result as SortedOccurrences)
  }

  return (
    <Box width={1}>
      <Stack marginTop={2} width={1}>
        {steps.map((step: PotentialOccurrence, index: number) => (
          <Fragment key={index}>
            <Step {...{ character, deleteEntry, index, step, steps, moveUp, moveDown }} />
            <When condition={index !== steps.length - 1}>
              <ReorderButtonRow {...{ index, steps, switchEntries }} />
            </When>
          </Fragment>
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

function ReorderButtonRow({
  index,
  steps,
  switchEntries,
}: {
  index: number
  steps: SortedOccurrences
  switchEntries: (topIndex: number) => void
}) {
  const top = steps[index]
  const bottom = steps[index + 1]

  const canSwitch = !(bottom?.type === 'reminder' && !getReminderContentType(steps, index))

  const canMerge =
    (top.type === 'keyword' && bottom?.type === 'primitive') || (top.type === 'primitive' && bottom?.type === 'keyword')

  const canSplit =
    (top.type === 'keywordAndPrimitive' && bottom?.type === 'unset') ||
    (top.type === 'unset' && bottom?.type === 'keywordAndPrimitive')

  return (
    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} justifyContent='center' gap={1} minHeight='40px'>
      {!canSwitch ? (
        false
      ) : (
        <ToolbarButton
          icon={faArrowRightArrowLeft}
          iconProps={{ rotation: 90 }}
          tooltip='Csere'
          onClick={() => switchEntries(index)}
        />
      )}

      {!canMerge ? false : <ToolbarButton icon={faCodeMerge} tooltip='Ötvözés' onClick={() => {}} />}

      {!canSplit ? (
        false
      ) : (
        <ToolbarButton icon={faCodeFork} iconProps={{ rotation: 180 }} tooltip='Szétválasztás' onClick={() => {}} />
      )}
    </Stack>
  )
}
