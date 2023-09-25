import { Box, Divider, Stack } from '@mui/material'
import { CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
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
  timelineData: CharTimelineData
  switchEntries: (topIndex: number) => void
}) {
  const top = timelineData[index]
  const bottom = timelineData[index + 1]

  const canSwitch =
    !(isUnset(top) && isUnset(bottom)) &&
    !(isReminder(top) && isReminder(bottom)) &&
    (isUnset(top) || isUnset(bottom) || isReminder(top) || (isReminder(bottom) && isValidTierForReminder(timelineData, index)))

  return !canSwitch ? (
    <Divider sx={{ my: 2 }} />
  ) : (
    <Divider>
      <ToolbarButton
        icon={faArrowRightArrowLeft}
        iconProps={{ rotation: 90 }}
        tooltip='Csere'
        onClick={() => switchEntries(index)}
      />
    </Divider>
  )
}
