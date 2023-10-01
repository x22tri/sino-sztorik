import { Box, Divider, Stack, Typography } from '@mui/material'
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
    <Divider>
      <TierIndicator {...{ index }} />
    </Divider>
  ) : (
    <Divider>
      <Stack alignItems='center' direction='row' divider={<Divider flexItem orientation='vertical' variant='middle' />}>
        <TierIndicator {...{ index }} />

        <ToolbarButton
          icon={faArrowRightArrowLeft}
          iconProps={{ rotation: 90 }}
          size='small'
          tooltip='Csere'
          onClick={() => switchEntries(index)}
        />
      </Stack>
    </Divider>
  )
}

export function TierIndicator({ index }: { index: number }) {
  return (
    <Typography color='text.secondary' mx={1} variant='overline'>
      {index + 2}. kör
    </Typography>
  )
}
