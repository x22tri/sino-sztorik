import { Stack } from '@mui/material'
import { TimelineData } from '../../../shared/logic/loadAdminChar'
import { isReminder } from '../utils/occurrence-utils'
import { isUnset } from '../utils/occurrence-utils'
import ToolbarButton from '../../../shared/components/ToolbarButton'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { isValidTierForReminder } from './getReminderContentType'

export function ReorderButtonRow({
  index,
  timelineData,
  switchEntries,
}: {
  index: number
  timelineData: TimelineData
  switchEntries: (topIndex: number) => void
}) {
  const top = timelineData[index]
  const bottom = timelineData[index + 1]

  const canSwitch =
    !(isUnset(top) && isUnset(bottom)) &&
    !(isReminder(top) && isReminder(bottom)) &&
    (isUnset(top) || isUnset(bottom) || isReminder(top) || (isReminder(bottom) && isValidTierForReminder(timelineData, index)))

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
