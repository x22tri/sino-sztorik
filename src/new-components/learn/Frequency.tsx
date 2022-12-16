import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { forwardRef } from 'react'
import {
  FREQUENCY_UNKNOWN,
  FREQUENCY_VERY_COMMON,
  FREQUENCY_QUITE_COMMON,
  FREQUENCY_COMMON,
  FREQUENCY_UNCOMMON,
  FREQUENCY_VERY_RARE,
} from '../shared/strings'

export default function Frequency({ frequency }: { frequency?: number }) {
  const { color, tooltip } = useFrequency(frequency)

  return (
    <Box
      display='flex'
      height='100%'
      position='absolute'
      alignItems='center'
      sx={{ ml: 1 }}
    >
      <Tooltip title={tooltip}>
        <FrequencyIcon {...{ color }} />
      </Tooltip>
    </Box>
  )
}

function useFrequency(frequency?: number): {
  color: string
  tooltip: string
} {
  const { palette } = useTheme()

  const { unknown, veryCommon, quiteCommon, common, uncommon, rare, veryRare } =
    palette.frequency

  if (typeof frequency !== 'number') {
    return { color: unknown, tooltip: FREQUENCY_UNKNOWN }
  }

  const frequencyMap = new Map([
    [500, { color: veryCommon, tooltip: FREQUENCY_VERY_COMMON }],
    [1000, { color: quiteCommon, tooltip: FREQUENCY_QUITE_COMMON }],
    [1500, { color: common, tooltip: FREQUENCY_COMMON }],
    [2000, { color: uncommon, tooltip: FREQUENCY_UNCOMMON }],
    [3000, { color: rare, tooltip: FREQUENCY_VERY_RARE }],
  ])

  for (const [key, value] of frequencyMap) {
    if (frequency < key) {
      return value
    }
  }

  return { color: veryRare, tooltip: FREQUENCY_VERY_RARE }
}

const FrequencyIcon = forwardRef((props: { color: string }, ref) => (
  <FontAwesomeIcon
    {...props}
    forwardedRef={ref}
    icon={faChartColumn}
    transform='grow-10'
  />
))
