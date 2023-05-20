import { Box, useTheme } from '@mui/material'
import {
  FREQUENCY_VERY_COMMON,
  FREQUENCY_QUITE_COMMON,
  FREQUENCY_COMMON,
  FREQUENCY_UNCOMMON,
  FREQUENCY_VERY_RARE,
  FREQUENCY_RARE,
} from '../../shared/strings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'

export function Frequency({ frequency }: { frequency: number }) {
  const { color, text } = useFrequency(frequency)

  return (
    <Box alignItems='center' color='text.secondary' display='flex' gap={0.5} typography='body2'>
      <FontAwesomeIcon icon={faChartColumn} {...{ color }} />
      {`${text} (${frequency}.)`}
    </Box>
  )
}

function useFrequency(frequency: number): { color: string; text: string } {
  const { palette } = useTheme()
  const { veryCommon, quiteCommon, common, uncommon, rare, veryRare } = palette.frequency

  const frequencyTooltipMap = new Map([
    [500, { color: veryCommon, text: FREQUENCY_VERY_COMMON }],
    [1000, { color: quiteCommon, text: FREQUENCY_QUITE_COMMON }],
    [1500, { color: common, text: FREQUENCY_COMMON }],
    [2000, { color: uncommon, text: FREQUENCY_UNCOMMON }],
    [3000, { color: rare, text: FREQUENCY_RARE }],
  ])

  for (const [key, value] of frequencyTooltipMap) {
    if (frequency < key) {
      return value
    }
  }

  return { color: veryRare, text: FREQUENCY_VERY_RARE }
}
