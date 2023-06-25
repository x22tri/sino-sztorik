import { Stack } from '@mui/material'
import { SortedOccurrences, isReminder, isUnset } from '../../shared/logic/loadAdminChar'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { isValidTierForReminder } from './getReminderContentType'

export function ReorderButtonRow({
  index,
  occurrences,
  switchEntries,
}: {
  index: number
  occurrences: SortedOccurrences
  switchEntries: (topIndex: number) => void
}) {
  const top = occurrences[index]
  const bottom = occurrences[index + 1]

  const canSwitch =
    !(isUnset(top) && isUnset(bottom)) &&
    !(isReminder(top) && isReminder(bottom)) &&
    (isUnset(top) || isUnset(bottom) || isReminder(top) || (isReminder(bottom) && isValidTierForReminder(occurrences, index)))

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
    </Stack>
  )
}
