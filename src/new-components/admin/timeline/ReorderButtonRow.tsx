import { Divider, Stack } from '@mui/material'
import { SortedCharacterEntry, SortedOccurrences, isReminder, isUnset } from '../../shared/logic/loadAdminChar'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faArrowRightArrowLeft, faCodeFork, faCodeMerge } from '@fortawesome/free-solid-svg-icons'
import { getReminderContentType, isValidTierForReminder } from './getReminderContentType'

export function ReorderButtonRow({
  character,
  index,
  occurrences,
  switchEntries,
  mergeEntries,
  splitEntries,
}: {
  character: SortedCharacterEntry
  index: number
  occurrences: SortedOccurrences
  switchEntries: (topIndex: number) => void
  mergeEntries: (topIndex: number) => void
  splitEntries: (topIndex: number) => void
}) {
  const top = occurrences[index]
  const bottom = occurrences[index + 1]

  // const canSwitch = !(
  //   (top.type === 'unset' && bottom.type === 'unset') ||
  //   (bottom.type === 'reminder' && !getReminderContentType(occurrences, index))
  // )

  // const canMerge =
  //   (top.type === 'keyword' && bottom.type === 'primitive') || (top.type === 'primitive' && bottom.type === 'keyword')

  // const canSplitDown = top.type === 'keywordAndPrimitive' && bottom.type === 'unset'

  // const canSplitUp = top.type === 'unset' && bottom.type === 'keywordAndPrimitive'

  const canSwitch =
    isUnset(top) || isUnset(bottom) || isReminder(top) || (isReminder(bottom) && isValidTierForReminder(occurrences, index))

  const canMerge = false

  const canSplitDown = false

  const canSplitUp = false

  return (
    <Stack direction='row' justifyContent='center' gap={1} minHeight='48px'>
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

      {!canMerge ? false : <ToolbarButton icon={faCodeMerge} tooltip='Egyesítés' onClick={() => mergeEntries(index)} />}

      {!canSplitUp ? (
        false
      ) : (
        <ToolbarButton icon={faCodeFork} tooltip='Szétválasztás felfelé' onClick={() => splitEntries(index)} />
      )}

      {!canSplitDown ? (
        false
      ) : (
        <ToolbarButton
          icon={faCodeFork}
          iconProps={{ rotation: 180 }}
          tooltip='Szétválasztás lefelé'
          onClick={() => splitEntries(index)}
        />
      )}
    </Stack>
  )
}
